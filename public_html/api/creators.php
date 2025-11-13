<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$userId = requireAuth();
$db = getDB();

// POST - Add creator from Instagram/TikTok URL
if ($method === 'POST' && isset($_GET['add'])) {
    $input = json_decode(file_get_contents('php://input'), true);
    $url = $input['url'] ?? '';
    $campaignId = $input['campaign_id'] ?? null;
    
    if (empty($url)) {
        http_response_code(400);
        echo json_encode(['error' => 'URL is required']);
        exit;
    }
    
    // Parse URL to determine platform and username
    $platform = null;
    $username = null;
    
    if (preg_match('/instagram\.com\/([^\/\?]+)/', $url, $matches)) {
        $platform = 'instagram';
        $username = $matches[1];
    } elseif (preg_match('/tiktok\.com\/@?([^\/\?]+)/', $url, $matches)) {
        $platform = 'tiktok';
        $username = str_replace('@', '', $matches[1]);
    }
    
    if (!$platform || !$username) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid Instagram or TikTok URL']);
        exit;
    }
    
    // Call Ensemble Data API
    try {
        $ensembleUrl = ENSEMBLE_API_URL . '/' . $platform . '/' . $username;
        
        $ch = curl_init($ensembleUrl);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . ENSEMBLE_API_KEY,
            'Content-Type: application/json'
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            http_response_code(404);
            echo json_encode(['error' => 'Creator not found in Ensemble Data']);
            exit;
        }
        
        $creatorData = json_decode($response, true);
        
        // Extract relevant data
        $followers = $creatorData['followers'] ?? 0;
        $medianViewRate = $creatorData['median_view_rate'] ?? null;
        $meanViewRate = $creatorData['mean_view_rate'] ?? null;
        $engagementRate = $creatorData['engagement_rate'] ?? null;
        $avatarUrl = $creatorData['avatar_url'] ?? null;
        $bio = $creatorData['bio'] ?? null;
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch creator data']);
        exit;
    }
    
    // Check if creator already exists
    $stmt = $db->prepare('SELECT id FROM creators WHERE platform = ? AND username = ?');
    $stmt->execute([$platform, $username]);
    $existingCreator = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($existingCreator) {
        $creatorId = $existingCreator['id'];
        
        // Update creator data
        $stmt = $db->prepare('
            UPDATE creators 
            SET followers = ?, median_view_rate = ?, mean_view_rate = ?, 
                engagement_rate = ?, avatar_url = ?, bio = ?
            WHERE id = ?
        ');
        $stmt->execute([
            $followers, $medianViewRate, $meanViewRate, 
            $engagementRate, $avatarUrl, $bio, $creatorId
        ]);
    } else {
        // Insert new creator
        $stmt = $db->prepare('
            INSERT INTO creators (platform, username, profile_url, followers, 
                                median_view_rate, mean_view_rate, engagement_rate, 
                                avatar_url, bio)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ');
        $stmt->execute([
            $platform, $username, $url, $followers,
            $medianViewRate, $meanViewRate, $engagementRate,
            $avatarUrl, $bio
        ]);
        $creatorId = $db->lastInsertId();
    }
    
    // Add to campaign if campaign_id provided
    if ($campaignId) {
        // Verify campaign ownership
        $stmt = $db->prepare('SELECT id FROM campaigns WHERE id = ? AND user_id = ?');
        $stmt->execute([$campaignId, $userId]);
        if ($stmt->fetch()) {
            // Add creator to campaign (if not already added)
            $stmt = $db->prepare('
                INSERT IGNORE INTO campaign_creators (campaign_id, creator_id)
                VALUES (?, ?)
            ');
            $stmt->execute([$campaignId, $creatorId]);
        }
    }
    
    // Fetch and return creator data
    $stmt = $db->prepare('SELECT * FROM creators WHERE id = ?');
    $stmt->execute([$creatorId]);
    $creator = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode(['creator' => $creator]);
    
// GET - List creators for a campaign
} elseif ($method === 'GET') {
    $campaignId = $_GET['campaign_id'] ?? null;
    
    if (!$campaignId) {
        http_response_code(400);
        echo json_encode(['error' => 'Campaign ID required']);
        exit;
    }
    
    // Verify campaign ownership
    $stmt = $db->prepare('SELECT id FROM campaigns WHERE id = ? AND user_id = ?');
    $stmt->execute([$campaignId, $userId]);
    if (!$stmt->fetch()) {
        http_response_code(403);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
    
    // Fetch creators
    $stmt = $db->prepare('
        SELECT c.*, cc.status as campaign_status, cc.budget_allocated, cc.notes
        FROM creators c
        INNER JOIN campaign_creators cc ON c.id = cc.creator_id
        WHERE cc.campaign_id = ?
        ORDER BY cc.added_at DESC
    ');
    $stmt->execute([$campaignId]);
    $creators = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['creators' => $creators]);
    
// DELETE - Remove creator from campaign
} elseif ($method === 'DELETE') {
    $campaignId = $_GET['campaign_id'] ?? null;
    $creatorId = $_GET['creator_id'] ?? null;
    
    if (!$campaignId || !$creatorId) {
        http_response_code(400);
        echo json_encode(['error' => 'Campaign ID and Creator ID required']);
        exit;
    }
    
    // Verify campaign ownership
    $stmt = $db->prepare('SELECT id FROM campaigns WHERE id = ? AND user_id = ?');
    $stmt->execute([$campaignId, $userId]);
    if (!$stmt->fetch()) {
        http_response_code(403);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
    
    $stmt = $db->prepare('DELETE FROM campaign_creators WHERE campaign_id = ? AND creator_id = ?');
    $stmt->execute([$campaignId, $creatorId]);
    
    echo json_encode(['success' => true]);
    
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>

