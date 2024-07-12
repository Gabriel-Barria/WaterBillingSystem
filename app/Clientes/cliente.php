<?php
class Cliente {
    private $pdo;

    public function __construct($conexion) {
        $this->pdo = $conexion;
    }

    public function create($nombres, $apellidos, $rut, $direccion, $email, $telefono) {
        $stmt = $this->pdo->prepare("INSERT INTO clientes (nombres, apellidos, rut, direccion, email, telefono) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$nombres, $apellidos, $rut, $direccion, $email, $telefono]);
    }

    public function read() {
        $stmt = $this->pdo->query("SELECT * FROM clientes ORDER BY nombres ASC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function readById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM clientes WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function update($id, $nombres, $apellidos, $rut, $direccion, $email, $telefono) {
        $stmt = $this->pdo->prepare("UPDATE clientes SET nombres = ?, apellidos = ?, rut = ?, direccion = ?, email = ?, telefono = ? WHERE id = ?");
        $stmt->execute([$nombres, $apellidos, $rut, $direccion, $email, $telefono, $id]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM clientes WHERE id = ?");
        $stmt->execute([$id]);
    }
    public function readAll() {
        $stmt = $this->pdo->query("SELECT id, CONCAT(nombres, ' ', apellidos) as nombre_completo FROM clientes ORDER BY nombres ASC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function readAllWithPeriodo($periodo){
        $sql = "SELECT id, CONCAT(nombres, ' ', apellidos) as nombre_completo FROM clientes WHERE id NOT IN (SELECT idcliente FROM lecturas WHERE periodo = :periodo) ORDER BY nombres ASC";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':periodo', $periodo, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
