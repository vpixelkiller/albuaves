<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$method = $_SERVER['REQUEST_METHOD'];
$db = new SQLite3('../db/albuaves.db');

switch ($method) {
    case 'GET':
        if (isset($_GET['bird_id'])) {
            // Obtener un ave por ID
            $id = $_GET['bird_id'];
            $stmt = $db->prepare("SELECT * FROM birds WHERE bird_id = :bird_id");
            $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
            $result = $stmt->execute();
            $ave = $result->fetchArray(SQLITE3_ASSOC);
            echo json_encode($ave);
        } else {
            // Obtener todas las aves
            $result = $db->query("SELECT * FROM birds");
            $aves = [];
            while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                $aves[] = $row;
            }
            echo json_encode($aves);
        }
        break;

    /*
    case 'POST':
        // Insertar un nuevo ave
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare("INSERT INTO aves (nombre, especie, ubicacion, fecha_avistamiento) VALUES (:nombre, :especie, :ubicacion, :fecha)");
        $stmt->bindValue(':nombre', $data['nombre'], SQLITE3_TEXT);
        $stmt->bindValue(':especie', $data['especie'], SQLITE3_TEXT);
        $stmt->bindValue(':ubicacion', $data['ubicacion'], SQLITE3_TEXT);
        $stmt->bindValue(':fecha', $data['fecha_avistamiento'], SQLITE3_TEXT);
        $stmt->execute();
        echo json_encode(["message" => "Ave creada correctamente"]);
        break;

    case 'PUT':
        // Actualizar un ave
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare("UPDATE aves SET nombre = :nombre, especie = :especie, ubicacion = :ubicacion, fecha_avistamiento = :fecha WHERE id = :id");
        $stmt->bindValue(':id', $data['id'], SQLITE3_INTEGER);
        $stmt->bindValue(':nombre', $data['nombre'], SQLITE3_TEXT);
        $stmt->bindValue(':especie', $data['especie'], SQLITE3_TEXT);
        $stmt->bindValue(':ubicacion', $data['ubicacion'], SQLITE3_TEXT);
        $stmt->bindValue(':fecha', $data['fecha_avistamiento'], SQLITE3_TEXT);
        $stmt->execute();
        echo json_encode(["message" => "Ave actualizada correctamente"]);
        break;

    case 'DELETE':
        // Eliminar un ave
        $id = $_GET['id'];
        $stmt = $db->prepare("DELETE FROM aves WHERE id = :id");
        $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
        $stmt->execute();
        echo json_encode(["message" => "Ave eliminada correctamente"]);
        break;
    */
    default:
        echo json_encode(["message" => "Método no soportado"]);
        break;
}

$db->close();
?>