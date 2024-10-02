// Mostramos el loader y luego cargamos la página después de 10 segundos
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';  // Ocultamos el loader
        document.getElementById('content').style.display = 'block'; // Mostramos el contenido
        document.body.style.overflow = 'auto'; // Volvemos a habilitar el scroll
    }, 10000); // 10 segundos de carga
});
