const baseDeDatosCloud = [
    { nombre: "Amazon EC2", tipo: "IaaS", estado: "Activo", costo: 35.00 },
    { nombre: "Google Drive Enterprise", tipo: "SaaS", estado: "Activo", costo: 12.50 },
    { nombre: "Heroku App Server", tipo: "PaaS", estado: "Inactivo", costo: 0.00 },
    { nombre: "Azure Virtual Machines", tipo: "IaaS", estado: "Activo", costo: 40.00 }
];

const cargarServicios = () => {

    const contenedor = document.getElementById("contenedor-servicios");

    contenedor.innerHTML = "";

    baseDeDatosCloud.forEach(servicio => {

        let claseEstado;w
        if (servicio.estado == "Activo") {
            claseEstado = "activo";
        } else {
            claseEstado = "inactivo";
        }

        const tarjeta = `
            <div class="card">
                <h3>${servicio.nombre}</h3>
                <p class="tipo">Tipo: ${servicio.tipo}</p>
                <p>Estado: <span class="${claseEstado}">${servicio.estado}</span></p>
                <p>Costo mensual: $${servicio.costo}</p>
            </div>
        `;

        contenedor.innerHTML += tarjeta;
    });
};
