<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_database_user');
define('DB_PASS', 'your_database_password');

// JWT Secret Key (generate a strong random key)
define('JWT_SECRET', 'your_super_secret_jwt_key_here_change_this_to_random_string');
define('JWT_EXPIRY', 86400); // 24 hours

// OAuth Configuration
define('GOOGLE_CLIENT_ID', 'your_google_client_id');
define('GOOGLE_CLIENT_SECRET', 'your_google_client_secret');
define('GITHUB_CLIENT_ID', 'your_github_client_id');
define('GITHUB_CLIENT_SECRET', 'your_github_client_secret');

// Ensemble Data API
define('ENSEMBLE_API_KEY', '9sGUOyzn1hynvJsT');
define('ENSEMBLE_API_URL', 'https://ensembledata.com/apis');

// CORS Headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Database Connection
function getDB() {
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME,
            DB_USER,
            DB_PASS,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed']);
        exit;
    }
}

// JWT Helper Functions
function generateJWT($userId) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode([
        'user_id' => $userId,
        'exp' => time() + JWT_EXPIRY
    ]);
    
    $base64UrlHeader = base64UrlEncode($header);
    $base64UrlPayload = base64UrlEncode($payload);
    
    $signature = hash_hmac(
        'sha256',
        $base64UrlHeader . "." . $base64UrlPayload,
        JWT_SECRET,
        true
    );
    $base64UrlSignature = base64UrlEncode($signature);
    
    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

function verifyJWT($token) {
    try {
        list($header, $payload, $signature) = explode('.', $token);
        
        $validSignature = hash_hmac(
            'sha256',
            $header . "." . $payload,
            JWT_SECRET,
            true
        );
        
        if (base64UrlEncode($validSignature) !== $signature) {
            return false;
        }
        
        $payloadData = json_decode(base64UrlDecode($payload), true);
        
        if ($payloadData['exp'] < time()) {
            return false;
        }
        
        return $payloadData['user_id'];
    } catch (Exception $e) {
        return false;
    }
}

function base64UrlEncode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64UrlDecode($data) {
    return base64_decode(strtr($data, '-_', '+/'));
}

function requireAuth() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? '';
    
    if (!preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
    
    $token = $matches[1];
    $userId = verifyJWT($token);
    
    if (!$userId) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid token']);
        exit;
    }
    
    return $userId;
}
?>

