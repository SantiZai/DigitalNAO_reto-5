let page = 1;
let totalItems = 0;
let isLoading = false; // Flag para controlar la carga
const $content = document.getElementById('content');
const $loading = document.getElementById('loading');

function cargarContenido() {
  if (isLoading) return; // Si ya está cargando, no hacer nada
  isLoading = true;
  $loading.style.display = 'block';

  setTimeout(() => {
    for (let i = 0; i < 15; i++) {
      const item = document.createElement('div');
      item.classList.add('item');
      item.textContent = `Elemento ${totalItems + 1}`;
      $content.appendChild(item);
      totalItems++;
    }
    page++;
    $loading.style.display = 'none';
    isLoading = false; // Permitir nueva carga al finalizar
  }, 1000);
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    cargarContenido();
  }
});

cargarContenido();
