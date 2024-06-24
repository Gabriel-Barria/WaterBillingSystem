<?php
require_once('vendor/autoload.php'); // Incluye TCPDF

// Crear una nueva instancia de TCPDF
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// Configuración del documento
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Tu Nombre');
$pdf->SetTitle('Ejemplo de PDF');
$pdf->SetSubject('TCPDF Tutorial');
$pdf->SetKeywords('TCPDF, PDF, example, test, guide');

// Eliminar la cabecera y el pie de página predeterminados
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);

// Añadir una página
$pdf->AddPage();

// Contenido HTML
$html = '
<h1>Hola, esto es un PDF</h1>
<p>Generado usando <b>TCPDF</b> y <b>PHP</b>.</p>
';

// Añadir el contenido HTML
$pdf->writeHTML($html, true, false, true, false, '');

// Salida del PDF
$pdf->Output('example.pdf', 'I'); // 'I' para inline, 'D' para descargar
?>
