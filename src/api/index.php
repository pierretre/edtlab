<?php

require __DIR__ . '/vendor/autoload.php';

use Brevo\Client\Configuration;
use Brevo\Client\Api\TransactionalEmailsApi;
use Brevo\Client\Model\SendSmtpEmail;

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Use POST']);
    exit;
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
    ? $data['organization'] 
    : 'Not specified';

$email = new SendSmtpEmail([
    'sender' => ['name' => $data['name'], 'email' => $data['email']],
    'to' => [[ 'email' => getenv('LIST_INBOX') ]],
    'subject' => "Contact Form: {$subjectLabel}",
    'htmlContent' => "
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> {$data['name']}</p>
        <p><strong>Email:</strong> {$data['email']}</p>
        <p><strong>Organization:</strong> {$organization}</p>
        <p><strong>Subject:</strong> {$subjectLabel}</p>
        <p><strong>Message:</strong></p>
        <p>" . nl2br(htmlspecialchars($data['message'])) . "</p>
    "
]);

try {
    $apiInstance->sendTransacEmail($email);
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
