<?php
$host = "localhost"; // Server host
$db_name = "disaster_management"; // Nama database Anda
$username = "root"; // Username default XAMPP
$password = ""; // Password default XAMPP kosong

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $exception) {
    echo "Connection error: " . $exception->getMessage();
}
?>
