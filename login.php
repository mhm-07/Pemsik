<?php
include 'config.php';
session_start(); // Mulai session
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    try {
        $query = "SELECT * FROM users WHERE email = :email";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":email", $data->email);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($data->password, $user['password'])) {
            // Generate token (you can implement JWT or simple tokens)
            $token = bin2hex(random_bytes(16));

            echo json_encode([
                "success" => true,
                "message" => "Login successful!",
                "token" => $token,
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Invalid email or password.",
            ]);
        }
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["message" => "Email and password are required."]);
}
?>
