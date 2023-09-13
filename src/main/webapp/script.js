const $canvas = document.querySelector("#canvas"),
	  $btnDescargar = document.querySelector("#btnDescargar"), 
	  $btnLimpiar = document.querySelector("#btnLimpiar"),
	  $btnGenerarDocumento = document.querySelector("#btnGenerarDocumento"),
      $btnEliminarFirma = document.querySelector("#btnEliminarFirma");
	  
const contexto = $canvas.getContext("2d");
const COLOR_PINCEL = "black";
const COLOR_FONDO = "white";
const GROSOR = 2;
let xAnterior = 0, yAnterior = 0, xActual = 0, yActual = 0; 
const obtenerXReal = (clientX) => clientX - $canvas.getBoundingClientRect().left;
const obtenerYReal = (clientY) => clientY - $canvas.getBoundingClientRect().top;
let haComenzadoDibujo = false; //

const limpiarCanvas = () => {
    // Colocar color blanco en fondo de canvas
    contexto.fillStyle = COLOR_FONDO;
    contexto.fillRect(0, 0, $canvas.width, $canvas.height);
};
limpiarCanvas();
$btnLimpiar.onclick = limpiarCanvas;


$btnDescargar.onclick = () => {
    const enlace = document.createElement('a');
    enlace.download = "Firma.png";

    const inputFirma = document.querySelector("#inputFirma");
    if (inputFirma.files.length > 0) {
        const firmaCargada = inputFirma.files[0];
        enlace.href = URL.createObjectURL(firmaCargada);
    } else {
        enlace.href = $canvas.toDataURL();
    }

    enlace.click();
};

$btnEliminarFirma.onclick = () => {
    const inputFirma = document.querySelector("#inputFirma");
    inputFirma.value = "";
};

window.obtenerImagen = () => {
    return $canvas.toDataURL();
};

$btnGenerarDocumento.onclick = () => {
	const ventana = window.open("documento.html");
}
$canvas.addEventListener("mousedown", evento => {
    xAnterior = xActual;
    yAnterior = yActual;
    xActual = obtenerXReal(evento.clientX);
    yActual = obtenerYReal(evento.clientY);
    contexto.beginPath();
    contexto.fillStyle = COLOR_PINCEL;
    contexto.fillRect(xActual, yActual, GROSOR, GROSOR);
    contexto.closePath();
    haComenzadoDibujo = true;
});

$canvas.addEventListener("mousemove", (evento) => {
    if (!haComenzadoDibujo) {
        return;
    }

    xAnterior = xActual;
    yAnterior = yActual;
    xActual = obtenerXReal(evento.clientX);
    yActual = obtenerYReal(evento.clientY);
    contexto.beginPath();
    contexto.moveTo(xAnterior, yAnterior);
    contexto.lineTo(xActual, yActual);
    contexto.strokeStyle = COLOR_PINCEL;
    contexto.lineWidth = GROSOR;
    contexto.stroke();
    contexto.closePath();
});

["mouseup", "mouseout"].forEach(nombreDeEvento => {
    $canvas.addEventListener(nombreDeEvento, () => {
        haComenzadoDibujo = false;
    });
});
