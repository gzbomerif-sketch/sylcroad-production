<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$userId = requireAuth();
$db = getDB();

// GET - List campaigns
if ($method === 'GET') {
    $stmt = $db->prepare('
        SELECT 
            c.*,
            COUNT(DISTINCT cc.creator_id) as creator_count
        FROM campaigns c
        LEFT JOIN campaign_creators cc ON c.id = cc.campaign_id
        WHERE c.user_id = ?
        GROUP BY c.id
        ORDER BY c.created_at DESC
    ');
    $stmt->execute([$userId]);
    $campaigns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['campaigns' => $campaigns]);
    
// POST - Create campaign
} elseif ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $name = $input['name'] ?? '';
    $description = $input['description'] ?? '';
    $budget = $input['budget'] ?? null;
    $currency = $input['currency'] ?? 'USD';
    $startDate = $input['start_date'] ?? null;
    $endDate = $input['end_date'] ?? null;
    
    if (empty($name)) {
        http_response_code(400);
        echo json_encode(['error' => 'Campaign name is required']);
        exit;
    }
    
    $stmt = $db->prepare('
        INSERT INTO campaigns (user_id, name, description, budget, currency, start_date, end_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ');
    $stmt->execute([$userId, $name, $description, $budget, $currency, $startDate, $endDate]);
    
    $campaignId = $db->lastInsertId();
    
    // Fetch created campaign
    $stmt = $db->prepare('SELECT * FROM campaigns WHERE id = ?');
    $stmt->execute([$campaignId]);
    $campaign = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode(['campaign' => $campaign]);
    
// PUT - Update campaign
} elseif ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    $campaignId = $input['id'] ?? null;
    
    if (!$campaignId) {
        http_response_code(400);
        echo json_encode(['error' => 'Campaign ID required']);
        exit;
    }
    
    // Verify ownership
    $stmt = $db->prepare('SELECT id FROM campaigns WHERE id = ? AND user_id = ?');
    $stmt->execute([$campaignId, $userId]);
    if (!$stmt->fetch()) {
        http_response_code(403);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
    
    $updates = [];
    $params = [];
    
    if (isset($input['name'])) {
        $updates[] = 'name = ?';
        $params[] = $input['name'];
    }
    if (isset($input['description'])) {
        $updates[] = 'description = ?';
        $params[] = $input['description'];
    }
    if (isset($input['budget'])) {
        $updates[] = 'budget = ?';
        $params[] = $input['budget'];
    }
    if (isset($input['start_date'])) {
        $updates[] = 'start_date = ?';
        $params[] = $input['start_date'];
    }
    if (isset($input['end_date'])) {
        $updates[] = 'end_date = ?';
        $params[] = $input['end_date'];
    }
    if (isset($input['status'])) {
        $updates[] = 'status = ?';
        $params[] = $input['status'];
    }
    
    if (empty($updates)) {
        http_response_code(400);
        echo json_encode(['error' => 'No fields to update']);
        exit;
    }
    
    $params[] = $campaignId;
    
    $sql = 'UPDATE campaigns SET ' . implode(', ', $updates) . ' WHERE id = ?';
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    
    // Fetch updated campaign
    $stmt = $db->prepare('SELECT * FROM campaigns WHERE id = ?');
    $stmt->execute([$campaignId]);
    $campaign = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode(['campaign' => $campaign]);
    
// DELETE - Delete campaign
} elseif ($method === 'DELETE') {
    $campaignId = $_GET['id'] ?? null;
    
    if (!$campaignId) {
        http_response_code(400);
        echo json_encode(['error' => 'Campaign ID required']);
        exit;
    }
    
    // Verify ownership
    $stmt = $db->prepare('SELECT id FROM campaigns WHERE id = ? AND user_id = ?');
    $stmt->execute([$campaignId, $userId]);
    if (!$stmt->fetch()) {
        http_response_code(403);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
    
    $stmt = $db->prepare('DELETE FROM campaigns WHERE id = ?');
    $stmt->execute([$campaignId]);
    
    echo json_encode(['success' => true]);
    
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>

