const urlApi = "https://dragonball-api.com/api/characters";

// Función principal
const cargarPersonajes = () => {
    fetch(urlApi)
        .then(respuesta => respuesta.json())
        .then(data => {
            const personajes = data.items;
            console.log("Datos recibidos:", personajes);
            mostrarPersonajes(personajes);
        })
        .catch(error => {
            console.error("Error al cargar personajes:", error);
            alert("Ocurrió un error, revisa la consola.");
        });
};

// Función para pintar tarjetas
const mostrarPersonajes = (personajes) => {
    const contenedor = document.getElementById("contenedor-personajes");
    contenedor.innerHTML = "";

    personajes.forEach(personaje => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("practice-card");

        tarjeta.innerHTML = `
            <img src="${personaje.image}" alt="${personaje.name}" width="100%" style="object-fit: contain; height: 300px;">
            <h3 class="practice-title">${personaje.name}</h3>
            <p>${personaje.description || "Sin descripción disponible"}</p>
            <p><strong>Ki:</strong> ${personaje.ki}</p>
            <p><strong>Raza:</strong> ${personaje.race}</p>
            <p><strong>Género:</strong> ${personaje.gender}</p>
        `;

        contenedor.appendChild(tarjeta);
    });
};
