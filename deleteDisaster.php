<?php
include 'config.php';
header("Access-Control-Allow-Origin: http://localhost:5173"); // Ganti dengan domain frontend Anda
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}


$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    try {
        $query = "DELETE FROM disasters WHERE id = :id";
        $stmt = $conn->prepare($query);

        $stmt->bindParam(":id", $data->id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Disaster deleted successfully."]);
        } else {
            echo json_encode(["message" => "Failed to delete disaster."]);
        }
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["message" => "ID is required."]);
}
?>
