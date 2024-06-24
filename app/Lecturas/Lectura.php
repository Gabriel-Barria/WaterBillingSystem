<?php
class Lectura {
    private $pdo;

    public function __construct($conexionBd) {
       $this->pdo = $conexionBd;
    }

    public function create($idcliente, $lectura, $periodo, $fotoMedidor) {
        try {
            // Verificar si ya existe una lectura para el cliente y el periodo dado
            $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM lecturas WHERE idcliente = ? AND periodo = ?");
            $stmt->execute([$idcliente, $periodo]);
            if ($stmt->fetchColumn() > 0) {
                throw new Exception("El cliente ya tiene una lectura para el periodo especificado");
            }

            // Insertar la nueva lectura
            $stmt = $this->pdo->prepare("INSERT INTO lecturas (idcliente, lectura, periodo, fotoMedidor) VALUES (?, ?, ?, ?)");
            $stmt->execute([$idcliente, $lectura, $periodo, $fotoMedidor]);
        } catch (Exception $e) {
            // Lanzar cualquier error para que sea manejado por el código llamador
            throw new Exception($e->getMessage());
        }
    }

    public function readAll() {
        $stmt = $this->pdo->query("
            SELECT l.idlectura, CONCAT(c.nombres, ' ', c.apellidos) AS nombre_cliente, l.lectura, l.periodo, l.fechahora, l.fotoMedidor 
            FROM lecturas l
            JOIN clientes c ON l.idcliente = c.id
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($idlectura, $idcliente, $lectura, $periodo, $fotoMedidor) {
        $stmt = $this->pdo->prepare("UPDATE lecturas SET idcliente = ?, lectura = ?, periodo = ?, fotoMedidor = ? WHERE idlectura = ?");
        $stmt->execute([$idcliente, $lectura, $periodo, $fotoMedidor, $idlectura]);
    }

    public function delete($idlectura) {
        $stmt = $this->pdo->prepare("DELETE FROM lecturas WHERE idlectura = ?");
        $stmt->execute([$idlectura]);
    }
}
?>
