<?php
// Get the data from the POST request
$data = json_decode(file_get_contents('php://input'), true);

// Decode the base64-encoded PDF
$pdfContent = base64_decode(str_replace('data:application/pdf;base64,', '', $data['pdf']));

// Set up the email
$to = 'kingij632@gmail.com';
$subject = 'Check out this transport service';
$body = "Name: " . $data['firstName'] . " " . $data['lastName'] . "\nPhone: " . $data['phone'] . "\nVehicle: " . $data['vehicle'] . "\nFrom: " . $data['fromCounty'] . "\nTo: " . $data['toCounty'] . "\nCost: " . $data['cost'];

// Create a boundary
$boundary = md5(time());

// Set the headers for email
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
$headers .= "From: no-reply@yourdomain.com\r\n";

// Email body
$emailBody = "--$boundary\r\n";
$emailBody .= "Content-Type: text/plain; charset=ISO-8859-1\r\n";
$emailBody .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$emailBody .= $body . "\r\n\r\n";

// Attach the PDF
$emailBody .= "--$boundary\r\n";
$emailBody .= "Content-Type: application/pdf; name=\"Transport_Service_Details.pdf\"\r\n";
$emailBody .= "Content-Transfer-Encoding: base64\r\n";
$emailBody .= "Content-Disposition: attachment; filename=\"Transport_Service_Details.pdf\"\r\n\r\n";
$emailBody .= chunk_split(base64_encode($pdfContent)) . "\r\n\r\n";
$emailBody .= "--$boundary--";

// Send the email
if (mail($to, $subject, $emailBody, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}
?>
