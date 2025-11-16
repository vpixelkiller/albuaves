<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$method = $_SERVER['REQUEST_METHOD'];
$dbPath = __DIR__ . '/../db/albuaves.db';
$db = new SQLite3($dbPath);

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

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare("INSERT INTO birds (common_name, scientific_name, description, img_url) VALUES (:common_name, :scientific_name, :description, :img_url)");
        $stmt->bindValue(':common_name', $data['common_name'], SQLITE3_TEXT);
        $stmt->bindValue(':scientific_name', $data['scientific_name'], SQLITE3_TEXT);
        $stmt->bindValue(':description', $data['description'], SQLITE3_TEXT);
        $stmt->bindValue(':img_url', $data['img_url'], SQLITE3_TEXT);
        $stmt->execute();
        echo json_encode(["message" => "Bird created successfully"]);
        break;

    /*
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