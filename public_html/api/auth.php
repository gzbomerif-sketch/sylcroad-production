<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

// Verify OAuth Token and Login
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $provider = $input['provider'] ?? '';
    $token = $input['token'] ?? '';
    
    if (!$provider || !$token) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing provider or token']);
        exit;
    }
    
    // Verify OAuth token based on provider
    $userData = null;
    
    if ($provider === 'google') {
        // Verify Google token
        $url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' . $token;
        $response = file_get_contents($url);
        $data = json_decode($response, true);
        
        if (!isset($data['email'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid Google token']);
            exit;
        }
        
        $userData = [
            'email' => $data['email'],
            'name' => $data['name'] ?? '',
            'oauth_id' => $data['sub'],
            'avatar_url' => $data['picture'] ?? null
        ];
        
    } elseif ($provider === 'github') {
        // Verify GitHub token
        $ch = curl_init('https://api.github.com/user');
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $token]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_USERAGENT, 'SylcRoad');
        $response = curl_exec($ch);
        curl_close($ch);
        
        $data = json_decode($response, true);
        
        if (!isset($data['email']) && !isset($data['login'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid GitHub token']);
            exit;
        }
        
        // Fetch email if not public
        if (!isset($data['email'])) {
            $ch = curl_init('https://api.github.com/user/emails');
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $token]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_USERAGENT, 'SylcRoad');
            $emailResponse = curl_exec($ch);
            curl_close($ch);
            
            $emails = json_decode($emailResponse, true);
            $primaryEmail = array_filter($emails, fn($e) => $e['primary'] === true);
            $data['email'] = $primaryEmail[0]['email'] ?? $data['login'] . '@github.com';
        }
        
        $userData = [
            'email' => $data['email'],
            'name' => $data['name'] ?? $data['login'],
            'oauth_id' => (string)$data['id'],
            'avatar_url' => $data['avatar_url'] ?? null
        ];
    }
    
    if (!$userData) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid provider']);
        exit;
    }
    
    // Check if user exists
    $stmt = $db->prepare('SELECT id FROM users WHERE oauth_provider = ? AND oauth_id = ?');
    $stmt->execute([$provider, $userData['oauth_id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        // Create new user
        $stmt = $db->prepare('
            INSERT INTO users (email, name, oauth_provider, oauth_id, avatar_url) 
            VALUES (?, ?, ?, ?, ?)
        ');
        $stmt->execute([
            $userData['email'],
            $userData['name'],
            $provider,
            $userData['oauth_id'],
            $userData['avatar_url']
        ]);
        $userId = $db->lastInsertId();
    } else {
        $userId = $user['id'];
        
        // Update user info
        $stmt = $db->prepare('
            UPDATE users 
            SET name = ?, email = ?, avatar_url = ?, updated_at = NOW()
            WHERE id = ?
        ');
        $stmt->execute([
            $userData['name'],
            $userData['email'],
            $userData['avatar_url'],
            $userId
        ]);
    }
    
    // Generate JWT
    $jwt = generateJWT($userId);
    
    // Store session
    $stmt = $db->prepare('
        INSERT INTO sessions (user_id, token, expires_at) 
        VALUES (?, ?, FROM_UNIXTIME(?))
    ');
    $stmt->execute([$userId, $jwt, time() + JWT_EXPIRY]);
    
    // Return JWT and user data
    echo json_encode([
        'token' => $jwt,
        'user' => [
            'id' => $userId,
            'name' => $userData['name'],
            'email' => $userData['email'],
            'avatar' => $userData['avatar_url']
        ]
    ]);
    
} elseif ($method === 'GET' && isset($_GET['verify'])) {
    // Verify current token
    $userId = requireAuth();
    
    $stmt = $db->prepare('SELECT id, email, name, avatar_url FROM users WHERE id = ?');
    $stmt->execute([$userId]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode(['user' => $user]);
    
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>

