// Array para almacenar los productos en el carrito
let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(productId) {
    fetch('productos.json')
        .then(response => response.json())
        .then(productos => {
            const producto = productos.find(p => p.id === productId);
            const productoEnCarrito = carrito.find(p => p.id === productId);
            if (productoEnCarrito) {
                productoEnCarrito.cantidad++;
            } else {
                producto.cantidad = 1;
                carrito.push(producto);
            }
            actualizarContadorCarrito();
            agregarAlCarritoAlert(producto.nombre);
            guardarCarrito();
        })
        .catch(error => console.error('Error al agregar producto al carrito:', error));
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    document.getElementById('cart-count').textContent = carrito.length;
}

// Función para mostrar los productos en el modal del carrito
function mostrarCarrito() {
    const carritoItems = document.getElementById('carritoItems');
    carritoItems.innerHTML = '';

    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach((producto, index) => {
            const item = document.createElement('div');
            item.className = 'carrito-item row mb-2';
            item.innerHTML = `
                <div class="col-4">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid">
                </div>
                <div class="col-4">
                    <p>${producto.nombre}</p>
                    <p>$${producto.precio} USD</p>
                    <p>Cantidad: 
                        <input type="number" value="${producto.cantidad}" min="1" class="cantidad-producto" data-index="${index}">
                    </p>
                </div>
                <div class="col-4 text-right">
                    <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </div>
            `;
            carritoItems.appendChild(item);
        });

        const total = calcularTotalCarrito();
        const totalDiv = document.createElement('div');
        totalDiv.className = 'total-carrito';
        totalDiv.innerHTML = `<h5>Total: $${total} USD</h5>`;
        carritoItems.appendChild(totalDiv);
    }

    // Evento para actualizar la cantidad
    document.querySelectorAll('.cantidad-producto').forEach(input => {
        input.addEventListener('change', actualizarCantidadProducto);
    });
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarContadorCarrito();
    mostrarCarrito();
    guardarCarrito();
}

// Función para actualizar la cantidad de un producto en el carrito
function actualizarCantidadProducto(event) {
    const index = event.target.dataset.index;
    const nuevaCantidad = event.target.value;
    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(index);
    } else {
        carrito[index].cantidad = nuevaCantidad;
        mostrarCarrito();
        guardarCarrito();
    }
}





// Función para calcular el total del carrito
function calcularTotalCarrito() {
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
}

// Función para aplicar un descuento
function aplicarDescuento(codigo) {
    const descuento = {
        'DESC10': 0.10,
        'DESC20': 0.20
    }[codigo] || 0;

    const total = calcularTotalCarrito();
    const totalConDescuento = total - (total * descuento);
    return totalConDescuento;
}

// Función para guardar el carrito en el Local Storage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde el Local Storage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarContadorCarrito();
    }
}

// Evento para mostrar el modal del carrito
document.getElementById('carrito').addEventListener('click', function() {
    mostrarCarrito();
    $('#carritoModal').modal('show');
});

// Cargar productos desde el archivo JSON
document.addEventListener("DOMContentLoaded", () => {
    fetch('productos.json')
        .then(response => response.json())
        .then(productos => mostrarProductos(productos))
        .catch(error => console.error('Error al cargar los productos:', error));
    cargarCarrito();
});

// Función para mostrar los productos en el catálogo
function mostrarProductos(productos) {
    const contenedorProductos = document.getElementById('productos');
    productos.forEach(producto => {
        const productoHTML = `
            <div class="col-md-4">
                <div class="card product-card">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="card-text">$${producto.precio}</p>
                        <button 
                            class="btn btn-primary agregar-carrito-btn" 
                            data-producto-nombre="${producto.nombre}" 
                            onclick="agregarAlCarrito(${producto.id})">
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
        contenedorProductos.innerHTML += productoHTML;
    });
}



// Registrar el Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/js/sw.js')
            .then(registration => {
                console.log('Service Worker registrado con éxito:', registration.scope);
            })
            .catch(error => {
                console.log('Registro de Service Worker fallido:', error);
            });
    });
}















// Load products from JSON and store in the global 'productos' array
document.addEventListener("DOMContentLoaded", () => {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data; // Store loaded products in the global variable
            mostrarProductos(productos); // Display all products initially
        })
        .catch(error => console.error('Error al cargar los productos:', error));
    cargarCarrito();
});



document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.getElementById("productos");
    const checkboxes = document.querySelectorAll(".category-checkbox");
    const todosCheckbox = document.getElementById("todos");
    const carrito = [];
    
    fetch('assets/productos.json')
        .then(response => response.json())
        .then(productos => {
            displayProducts(productos);

            checkboxes.forEach(checkbox => {
                checkbox.addEventListener("change", () => {
                    if (checkbox === todosCheckbox && todosCheckbox.checked) {
                        // Si se selecciona "Todos", desmarcar las demás categorías
                        checkboxes.forEach(cb => {
                            if (cb !== todosCheckbox) {
                                cb.checked = false;
                            }
                        });
                    } else if (checkbox !== todosCheckbox && checkbox.checked) {
                        // Si se selecciona cualquier otra categoría, desmarcar "Todos"
                        todosCheckbox.checked = false;
                    }
                    filterProducts(productos);
                });
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

    function displayProducts(productos) {
        productosContainer.innerHTML = "";
        productos.forEach(producto => {
            const productoHTML = `
                <div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">$${producto.precio}</p>
                            <button class="btn btn-primary agregar-carrito" data-id="${producto.id}">Agregar al Carrito</button>
                        </div>
                    </div>
                </div>
            `;
            productosContainer.insertAdjacentHTML('beforeend', productoHTML);
        });

        document.querySelectorAll('.agregar-carrito').forEach(button => {
            button.addEventListener('click', () => {
                const productoId = button.getAttribute('data-id');
                const producto = productos.find(p => p.id == productoId);
                agregarAlCarrito(producto);
            });
        });
    }

    function filterProducts(productos) {
        const selectedCategories = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        let filteredProducts;

        if (selectedCategories.includes("todos") || selectedCategories.length === 0) {
            filteredProducts = productos;
        } else {
            filteredProducts = productos.filter(producto =>
                selectedCategories.includes(producto.categoria)
            );
        }

        displayProducts(filteredProducts);
    }

    function agregarAlCarrito(producto) {
        carrito.push(producto);
        console.log(carrito);  // Puedes actualizar esta línea para mostrar el carrito de una mejor manera
        alert(`Producto ${producto.nombre} agregado al carrito!`);
    }
    
    document.getElementById('ver-carrito').addEventListener('click', () => {
        alert(JSON.stringify(carrito, null, 2));
    });
});
