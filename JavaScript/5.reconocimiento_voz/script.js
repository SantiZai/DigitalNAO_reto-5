const startBtn = document.getElementById('startBtn');
const output = document.getElementById('output');
const error = document.getElementById('error');

// Verifica si el navegador soporta la API de Web Speech
if (!('webkitSpeechRecognition' in window)) {
  alert(
    'Tu navegador no soporta el reconocimiento de voz. Prueba en Google Chrome.'
  );
} else {
  // Inicializa el reconocimiento de voz
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'es-ES'; // Configura el idioma a español
  recognition.continuous = false; // Reconoce una sola vez y luego para
  recognition.interimResults = false; // No muestra resultados intermedios

  let listening = false;

  // Función que se ejecuta cuando se inicia el reconocimiento
  recognition.onstart = () => {
    listening = true;
    output.textContent = 'Escuchando...';
  };

  // Función que se ejecuta cuando se obtiene un resultado
  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    output.textContent = `Texto detectado: ${speechResult}`;
  };

  // Función que se ejecuta cuando el reconocimiento termina
  recognition.onend = () => {
    listening = false;
    if (!listening) {
      error.textContent =
        "Reconocimiento finalizado. Haga clic en 'Iniciar Reconocimiento' para intentarlo de nuevo.";
    }
  };

  // Función para manejar errores en el reconocimiento de voz
  recognition.onerror = (event) => {
    error.textContent =
      'Ocurrió un error durante el reconocimiento de voz: ' + event.error;
    if (
      event.error === 'not-allowed' ||
      event.error === 'service-not-allowed'
    ) {
      alert(
        'Permiso de micrófono denegado. Activa el micrófono en la configuración del navegador.'
      );
    } else if (event.error === 'network') {
      alert('Error de red. Revisa tu conexión a Internet.');
    } else {
      error.textContent = 'Intentando nuevamente...';
      recognition.start();
    }
  };

  // Inicia el reconocimiento de voz al hacer clic en el botón
  startBtn.addEventListener('click', () => {
    if (!listening) {
      recognition.start();
    }
  });
}
