<?php
include 'config.php';
session_start(); // Mulai session
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


try {
    $query = "SELECT * FROM disasters";
    $stmt = $conn->prepare($query);
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results);

} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
