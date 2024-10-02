


// Función que muestra una alerta cuando se agrega un producto al carrito
function agregarAlCarritoAlert(productoNombre) {
    Swal.fire({
        title: 'Producto agregado!',
        text: productoNombre + ' ha sido añadido al carrito.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
    });
}


// Función para mostrar mensaje de compra finalizada
function mostrarMensajeCompraFinalizada() {
    Swal.fire({
        title: 'Compra finalizada exitosamente',
        text: '¡Gracias por tu compra!',
        icon: 'success',
        confirmButtonText: 'Cerrar'
    });
}

// Evento de envío del formulario de pago
document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío real del formulario
    mostrarMensajeCompraFinalizada(); // Mostrar el mensaje de SweetAlert
    $('#payment-form-container').modal('hide'); // Cerrar el modal
});
