const $calcular = document.querySelector('button');

$calcular.addEventListener('click', () => {
  const ingreso = parseFloat(document.getElementById('ingreso').value);
  const deduccion = parseFloat(document.getElementById('deduccion').value) || 0;

  if (isNaN(ingreso)) {
    document.getElementById('resultado').textContent =
      'Por favor, ingresa un valor válido para el ingreso.';
    return;
  }

  const ingresoNeto = ingreso - deduccion;
  document.getElementById(
    'resultado'
  ).textContent = `Tu ingreso neto es: $${ingresoNeto.toFixed(2)}`;
});
