const $countdownElement = document.getElementById('countdown');

function actualizarCuentaRegresiva() {
  const ahora = new Date();
  const proximoAño = ahora.getFullYear() + 1;
  const fechaAñoNuevo = new Date(`January 1, ${proximoAño} 00:00:00`);

  const diferenciaTiempo = fechaAñoNuevo - ahora;

  const días = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
  const horas = Math.floor(
    (diferenciaTiempo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutos = Math.floor(
    (diferenciaTiempo % (1000 * 60 * 60)) / (1000 * 60)
  );
  const segundos = Math.floor((diferenciaTiempo % (1000 * 60)) / 1000);

  $countdownElement.textContent = `${días}d ${horas}h ${minutos}m ${segundos}s`;

  if (diferenciaTiempo < 0) {
    $countdownElement.textContent = '¡Feliz Año Nuevo!';
    clearInterval(intervalo);
  }
}

const intervalo = setInterval(actualizarCuentaRegresiva, 1000);
