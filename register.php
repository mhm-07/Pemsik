<?php
session_start(); // Mulai session
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Menyambung ke database
$host = "localhost";
$username = "root"; // default username XAMPP
$password = ""; // default password XAMPP
$database = "disaster_management"; // nama database

$conn = new mysqli($host, $username, $password, $database);

// Memeriksa koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Mendapatkan data JSON dari request
$data = json_decode(file_get_contents("php://input"));

// Memastikan email dan password ada dalam data yang diterima
if (!isset($data->email) || !isset($data->password)) {
    echo json_encode(["success" => false, "message" => "Email and password are required."]);
    exit;
}

$email = $data->email;
$password = $data->password;

// Menyaring input untuk mencegah SQL injection
$email = $conn->real_escape_string($email);
$password = $conn->real_escape_string($password);

// Memeriksa apakah email sudah terdaftar
$checkQuery = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($checkQuery);

if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email already registered."]);
    exit;
}

// Enkripsi password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Menyimpan data pengguna baru
$insertQuery = "INSERT INTO users (name, email, password, role) VALUES ('User', '$email', '$hashedPassword', 'user')";

if ($conn->query($insertQuery) === TRUE) {
    echo json_encode(["success" => true, "message" => "Registration successful!"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}

// Menutup koneksi
$conn->close();
?>
