<?php
include 'config.php';
header("Access-Control-Allow-Origin: http://localhost:5173"); // Ganti dengan domain frontend Anda
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name) && !empty($data->description) && !empty($data->location) && !empty($data->date) && !empty($data->status)) {
    try {
        $query = "INSERT INTO disasters (name, description, location, date, status) VALUES (:name, :description, :location, :date, :status)";
        $stmt = $conn->prepare($query);

        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":description", $data->description);
        $stmt->bindParam(":location", $data->location);
        $stmt->bindParam(":date", $data->date);
        $stmt->bindParam(":status", $data->status);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Disaster created successfully."]);
        } else {
            echo json_encode(["message" => "Failed to create disaster."]);
        }
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["message" => "Incomplete data."]);
}
?>
