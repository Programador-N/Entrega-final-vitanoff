// Función para mostrar el formulario de pago
function mostrarFormularioPago() {
    $('#payment-form-container').modal('show');
}

// Agregar evento de click al botón "Proceder al Pago"
document.getElementById('proceed-payment-btn').addEventListener('click', mostrarFormularioPago);
