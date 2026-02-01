const contenedor = document.getElementById("contenedor-productos");
const buscador = document.getElementById("buscador");
const modal = document.getElementById("modal");
const detalleProducto = document.getElementById("detalle-producto");
const cerrar = document.getElementById("cerrar");

let productos = [];

fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
        productos = data.products;
        mostrarProductos(productos);
    });

function mostrarProductos(lista) {
    contenedor.innerHTML = "";

    lista.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML =
            "<h3>" + producto.title + "</h3>" +
            "<img src='" + producto.thumbnail + "'>" +
            "<span> Precio: $" + producto.price + "</span>" +
            "<span> Categoría: " + producto.category + "</span>" +
            "<span> Rating: " + producto.rating + "</span>";

        card.addEventListener("click", function () {
            mostrarDetalle(producto);
        });

        contenedor.appendChild(card);
    });
}

buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();
    const filtrados = productos.filter(p =>
        p.title.toLowerCase().includes(texto)
    );
    mostrarProductos(filtrados.slice(0, 9));
});

function mostrarDetalle(producto) {
    detalleProducto.innerHTML =
        "<h2>Detalle del producto</h2>" +
        "<h3>" + producto.title + "</h3>" +
        "<img src='" + producto.thumbnail + 
        "' style='width:100%; height:200px; object-fit:contain; margin:10px 0;'>" +
        "<p><strong>Descripción:</strong> " + producto.description + "</p>" +
        "<p><strong>Precio:</strong> $" + producto.price + "</p>" +
        "<p><strong>Marca:</strong> " + producto.brand + "</p>" +
        "<p><strong>Opciones:</strong></p>" +
        "<ul>" +
            "<li>Agregar al carrito</li>" +
            "<li>Ver más productos similares</li>" +
        "</ul>";

    modal.style.display = "flex";
}


cerrar.addEventListener("click", () => {
    modal.style.display = "none";
});
