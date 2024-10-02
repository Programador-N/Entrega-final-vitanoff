// Products JSON array from the file (loaded in app.js)
let productos = [];

// Wait for the DOM to load and set up event listeners for checkboxes
document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.category-checkbox');
    const productContainer = document.getElementById('productos');

    // Event listener for checkbox changes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    // Function to filter products based on selected categories
    function filterProducts() {
        // Get selected categories
        const selectedCategories = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        // If no category is selected, show all products
        if (selectedCategories.length === 0) {
            displayProducts(productos); // Show all products
        } else {
            // Filter products by selected categories
            const filteredProducts = productos.filter(product => selectedCategories.includes(product.categoria));
            displayProducts(filteredProducts); // Show filtered products
        }
    }

    // Function to dynamically display products (same as in app.js)
    function displayProducts(productos) {
        // Clear the product container
        productContainer.innerHTML = '';

        // Generate HTML for each product and add to the container
        productos.forEach(producto => {
            const productHTML = `
                <div class="col-md-4">
                    <div class="card product-card">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">${producto.descripcion}</p>
                            <p class="card-text">$${producto.precio}</p>
                            <button 
                                class="btn btn-primary agregar-carrito-btn" 
                                onclick="agregarAlCarrito(${producto.id})">
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            `;
            productContainer.innerHTML += productHTML;
        });
    }
});
