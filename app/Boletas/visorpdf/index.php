<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visor de PDF</title>
    <style>
        #pdf-viewer {
            width: 100%;
            height: 600px;
            border: 1px solid #000;
        }
    </style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.min.js"></script>

</head>

<body>
    <h1>Visor de PDF</h1>
    <iframe id="pdf-viewer"></iframe>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.min.js"></script>
    <script>
        // URL del PDF a mostrar
        const url = 'ruta_al_pdf/example.pdf';

        // Configurar PDF.js
        const pdfjsLib = window['pdfjs-dist/build/pdf'];
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';

        // Cargar el PDF
        pdfjsLib.getDocument(url).promise.then(function(pdf) {
            // Obtener la primera página
            pdf.getPage(1).then(function(page) {
                const scale = 1.5;
                const viewport = page.getViewport({ scale: scale });

                // Configurar el canvas donde se mostrará el PDF
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Renderizar la página en el canvas
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext).promise.then(function() {
                    // Convertir el canvas a una imagen y mostrarlo en el iframe
                    const pdfViewer = document.getElementById('pdf-viewer');
                    pdfViewer.src = canvas.toDataURL();
                });
            });
        });
    </script>
</body>
</html>
