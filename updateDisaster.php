<?php
include 'config.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173"); // Ganti dengan domain frontend Anda
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    try {
        $query = "UPDATE disasters SET 
                    name = :name, 
                    description = :description, 
                    location = :location, 
                    date = :date, 
                    status = :status 
                  WHERE id = :id";

        $stmt = $conn->prepare($query);

        $stmt->bindParam(":id", $data->id);
        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":description", $data->description);
        $stmt->bindParam(":location", $data->location);
        $stmt->bindParam(":date", $data->date);
        $stmt->bindParam(":status", $data->status);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Disaster updated successfully."]);
        } else {
            echo json_encode(["message" => "Failed to update disaster."]);
        }
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["message" => "ID is required."]);
}
?>
