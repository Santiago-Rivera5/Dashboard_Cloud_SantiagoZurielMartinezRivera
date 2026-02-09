const tablaBody = document.getElementById("tabla-body");
const buscador = document.getElementById("buscador");
const categorias = document.getElementById("categorias");
const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");
const paginaInfo = document.getElementById("pagina-info");

let skip = 0;
const limit = 10;
let totalProductos = 0;
let paginaActual = 1;

// Cargar productos con paginación
function cargarProductos(urlExtra = "") {

    let url = "https://dummyjson.com/products?limit=" + limit + "&skip=" + skip;

    if (urlExtra !== "") {
        url = urlExtra;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            totalProductos = data.total || data.products.length;
            renderizarTabla(data.products);
            actualizarPaginacion();
        });
}

// Renderizar tabla
function renderizarTabla(productos) {

    tablaBody.innerHTML = "";

    productos.forEach(p => {

        const fila = document.createElement("tr");

        fila.innerHTML =
            "<td>" + p.id + "</td>" +
            "<td><img src='" + p.thumbnail + "' width='150'></td>" +
            "<td>" + p.title + "</td>" +
            "<td>$" + p.price + "</td>" +
            "<td>" + p.category + "</td>" +
            "<td>" +
                "<button onclick='editarProducto(" + p.id + ")'>Editar</button>" +
                "<button onclick='eliminarProducto(" + p.id + ", this)'>Eliminar</button>" +
            "</td>";

        tablaBody.appendChild(fila);
    });
}

// Paginación
function actualizarPaginacion() {

    paginaActual = (skip / limit) + 1;
    paginaInfo.textContent = "Página " + paginaActual;

    btnAnterior.disabled = skip === 0;
    btnSiguiente.disabled = skip + limit >= totalProductos;
}

btnSiguiente.addEventListener("click", function () {
    skip += limit;
    cargarProductos();
});

btnAnterior.addEventListener("click", function () {
    skip -= limit;
    cargarProductos();
});

// Buscador inteligente
buscador.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        const texto = buscador.value;

        if (texto === "") {
            skip = 0;
            cargarProductos();
        } else {
            const url = "https://dummyjson.com/products/search?q=" + texto;
            cargarProductos(url);
        }
    }
});

// Cargar categorías
fetch("https://dummyjson.com/products/category-list")
    .then(res => res.json())
    .then(data => {

        data.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat;
            option.textContent = cat;
            categorias.appendChild(option);
        });
    });

// Filtro por categoría
categorias.addEventListener("change", function () {

    const cat = categorias.value;

    if (cat === "") {
        skip = 0;
        cargarProductos();
    } else {
        const url = "https://dummyjson.com/products/category/" + cat;
        cargarProductos(url);
    }
});

// Editar producto (PUT simulado)
function editarProducto(id) {

    const nuevoTitulo = prompt("Nuevo título:");
    const nuevoPrecio = prompt("Nuevo precio:");

    fetch("https://dummyjson.com/products/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: nuevoTitulo,
            price: nuevoPrecio
        })
    })
    .then(res => res.json())
    .then(data => {
        alert("Producto actualizado correctamente");
        cargarProductos();
    });
}

// Eliminar producto (DELETE simulado)
function eliminarProducto(id, boton) {

    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    fetch("https://dummyjson.com/products/" + id, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        alert("Producto eliminado");
        boton.closest("tr").remove();
    });
}

// Carga inicial
cargarProductos();
