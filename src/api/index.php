<?php

require __DIR__ . '/vendor/autoload.php';

use Brevo\Client\Configuration;
use Brevo\Client\Api\TransactionalEmailsApi;
use Brevo\Client\Model\SendSmtpEmail;

// Set CORS headers
$isDevelopment = getenv('APP_ENV') === 'development' || getenv('APP_ENV') === 'dev';

if ($isDevelopment) {
    // Development: Allow all origins
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
} else {
    // Production: Strict origin whitelist
    $allowedOrigins = [
        'http://localhost:4321',
        'http://localhost:80',
    ];

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origin, $allowedOrigins)) {
        header("Access-Control-Allow-Origin: $origin");
    } else {
        // Default to edtlab.fr if origin not in list
        header("Access-Control-Allow-Origin: https://edtlab.fr");
    }
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 86400"); // 24 hours
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Use POST']);
    exit;
}

// Simple rate limiting based on IP address
$rateLimit = 60; // seconds between submissions
$rateLimitFile = sys_get_temp_dir() . '/contact_form_rate_limit.json';

// Get client IP
$clientIp = $_SERVER['HTTP_X_REAL_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'];

// Load rate limit data
$rateLimitData = [];
if (file_exists($rateLimitFile)) {
    $rateLimitData = json_decode(file_get_contents($rateLimitFile), true) ?? [];
}

// Clean up old entries (older than 2 hours)
$currentTime = time();
$rateLimitData = array_filter($rateLimitData, function($timestamp) use ($currentTime) {
    return ($currentTime - $timestamp) < 7200; // 2 hours
});

// Check if IP is rate limited
if (isset($rateLimitData[$clientIp])) {
    $timeSinceLastSubmit = $currentTime - $rateLimitData[$clientIp];
    if ($timeSinceLastSubmit < $rateLimit) {
        $remainingTime = $rateLimit - $timeSinceLastSubmit;
        http_response_code(429); // Too Many Requests
        echo json_encode([
            'error' => "Please wait {$remainingTime} seconds before submitting again.",
            'retry_after' => $remainingTime
        ]);
        exit;
    }
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['name'], $data['email'], $data['subject'], $data['message'], $data['privacy'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

if (!$data['privacy']) {
    http_response_code(400);
    echo json_encode(['error' => 'Privacy notice must be accepted']);
    exit;
}

$config = Configuration::getDefaultConfiguration()->setApiKey(
    'api-key',
    getenv('BREVO_API_KEY')
);

$apiInstance = new TransactionalEmailsApi(
    new GuzzleHttp\Client(),
    $config
);

// Map subject values to readable labels
$subjectLabels = [
    'general' => 'General Inquiry',
    'collaboration' => 'Collaboration',
    'research' => 'Research',
    'technical' => 'Technical Support',
    'media' => 'Media',
    'other' => 'Other'
];

$subjectLabel = $subjectLabels[$data['subject']] ?? $data['subject'];
$organization = isset($data['organization']) && !empty($data['organization']) 
    ? htmlspecialchars($data['organization'])
    : 'Not specified';

$senderEmail = getenv('SENDER_EMAIL') ?: 'contact@edtlab.fr';
$senderName = getenv('SENDER_NAME') ?: 'EDT Research Program';
$recipientEmail = getenv('LIST_INBOX');

// Sanitize inputs
$userName = htmlspecialchars($data['name']);
$userEmail = htmlspecialchars($data['email']);
$userMessage = htmlspecialchars($data['message']);

// Create mailto link with pre-filled response template
// Use rawurlencode and replace %20 with spaces for better email client compatibility
$mailtoSubject = rawurlencode("Re: {$subjectLabel}");
$mailtoBody = rawurlencode("Dear {$userName},

Thank you for contacting the EDT Research Program. We have received your message regarding {$subjectLabel}.

[Your response here]

Best regards,
EDT Research Team");

// Replace %20 with actual spaces and %0A with line breaks for better display
$mailtoSubject = str_replace('%20', ' ', $mailtoSubject);
$mailtoBody = str_replace(['%20', '%0A'], [' ', '%0A'], $mailtoBody);

$mailtoLink = "mailto:{$userEmail}?subject={$mailtoSubject}&body={$mailtoBody}";

// Create HTML email template
$htmlContent = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #665BA7; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
        .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #665BA7; }
        .message-box { background-color: white; padding: 15px; border-left: 4px solid #665BA7; margin-top: 10px; }
        .footer { background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 5px 5px; }
        .reply-template { background-color: #e8f4f8; padding: 15px; margin-top: 20px; border-radius: 5px; }
        .reply-template h3 { color: #665BA7; margin-top: 0; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2 style='margin: 0;'>New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='label'>From:</span> {$userName} &lt;{$userEmail}&gt;
            </div>
            <div class='field'>
                <span class='label'>Organization:</span> {$organization}
            </div>
            <div class='field'>
                <span class='label'>Subject:</span> {$subjectLabel}
            </div>
            <div class='field'>
                <span class='label'>Message:</span>
                <div class='message-box'>" . nl2br($userMessage) . "</div>
            </div>
            
            <div class='reply-template'>
                <a href='{$mailtoLink}' style='display: inline-block; background-color: #665BA7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-bottom: 15px;'>
                    Reply to {$userName}
                </a>
                <p style='font-size: 13px; color: #666;'>
                    Or click 'Reply' in your email client to respond directly to <strong>{$userEmail}</strong>
                </p>
                <hr style='border: none; border-top: 1px solid #ddd; margin: 15px 0;'>
                <p style='font-size: 13px; color: #666; margin-bottom: 5px;'><strong>Suggested reply template:</strong></p>
                <p style='font-style: italic; color: #666; font-size: 13px; background-color: white; padding: 10px; border-radius: 3px;'>
                    Dear {$userName},<br><br>
                    Thank you for contacting the EDT Research Program. We have received your message regarding {$subjectLabel}.<br><br>
                    [Your response here]<br><br>
                    Best regards,<br>
                    EDT Research Team
                </p>
            </div>
        </div>
        <div class='footer'>
            <p>This email was sent from the EDT Research Program contact form</p>
            <p>EDT Research Program | <a href='https://edtlab.fr'>edtlab.fr</a></p>
        </div>
    </div>
</body>
</html>
";

$email = new SendSmtpEmail([
    'sender' => ['name' => $senderName, 'email' => $senderEmail],
    'to' => [['email' => $recipientEmail]],
    'replyTo' => ['email' => $userEmail, 'name' => $userName],
    'subject' => "Contact Form: {$subjectLabel} - {$userName}",
    'htmlContent' => $htmlContent
]);

try {
    $apiInstance->sendTransacEmail($email);
    
    // Update rate limit data after successful send
    $rateLimitData[$clientIp] = $currentTime;
    file_put_contents($rateLimitFile, json_encode($rateLimitData));
    
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
