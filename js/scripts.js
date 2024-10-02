// Array para almacenar los productos en el carrito
let carrito = [];



// Función para cargar productos desde el archivo JSON
document.addEventListener("DOMContentLoaded", () => {
    try {
        fetch('productos.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los productos: ' + response.status);
                }
                return response.json();
            })
                .then(productos => mostrarProductos(productos)) 
            .catch(error => {
                console.error('Error al cargar los productos:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'No se pudieron cargar los productos. Por favor, inténtalo más tarde.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            });
    } catch (error) {
        console.error('Error inesperado al cargar productos:', error);
    } finally {
        console.log('Intento de carga de productos finalizado.');
    }
});
