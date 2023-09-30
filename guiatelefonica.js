document.addEventListener("DOMContentLoaded", function () {
    const nombreInput = document.getElementById("nombre");
    const telefonoInput = document.getElementById("telefono");
    const registrarButton = document.getElementById("registrar");
    const listaUl = document.querySelector("#lista ul");

    
    function cargarContactosDesdeLocalStorage() {
        const contactosGuardados = JSON.parse(localStorage.getItem("contactos")) || [];
        contactosGuardados.forEach(function (contacto) {
            agregarContactoALista(contacto.nombre, contacto.telefono);
        });
    }

    
    function agregarContactoALista(nombre, telefono) {
        const nuevoContacto = document.createElement("li");
        nuevoContacto.innerHTML = `
            <span class="contacto">${nombre} ${telefono}</span>
            <button class="delete">Borrar</button>
            <button class="edit">Editar</button>
        `;

        // Agrega la funcionalidad para borrar
        const deleteButton = nuevoContacto.querySelector(".delete");
        deleteButton.addEventListener("click", function () {
            listaUl.removeChild(nuevoContacto);
            guardarContactosEnLocalStorage();
        });

        // Agrega la funcionalidad para editar
        const editButton = nuevoContacto.querySelector(".edit");
        editButton.addEventListener("click", function () {
            const contactoSpan = nuevoContacto.querySelector(".contacto");
            const editarNombre = prompt("Editar nombre:", nombre);
            if (editarNombre !== null) {
                const editarTelefono = prompt("Editar teléfono:", telefono);
                if (editarTelefono !== null) {
                    contactoSpan.textContent = `${editarNombre} ${editarTelefono}`;
                    guardarContactosEnLocalStorage();
                }
            }
        });

        
        listaUl.appendChild(nuevoContacto);

   
        nombreInput.value = "";
        telefonoInput.value = "";

       
        guardarContactosEnLocalStorage();
    }

    
    function guardarContactosEnLocalStorage() {
        const contactos = [];
        const listaContactos = listaUl.querySelectorAll("li");
        listaContactos.forEach(function (contacto) {
            const nombreTelefono = contacto.querySelector(".contacto").textContent;
            const [nombre, telefono] = nombreTelefono.split(" ");
            contactos.push({ nombre, telefono });
        });
        localStorage.setItem("contactos", JSON.stringify(contactos));
    }

    // evento al hacer de click para que registre
    registrarButton.addEventListener("click", function (event) {
        event.preventDefault();

        const nombre = nombreInput.value.trim();
        const telefono = telefonoInput.value.trim();

        if (nombre === "" || telefono === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }

      
        agregarContactoALista(nombre, telefono);
    });

   
    cargarContactosDesdeLocalStorage();
});
