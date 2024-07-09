async function obtenerProductos() {
    try {
        const response = await fetch('./js/data.json');
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        };
        arrayDeProductos = await response.json();
        mostrarProductos();
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    };
};

function crearCard(array, esCarrito = false) {
    container.innerHTML = "";

    array.forEach(el => {
        const card = document.createElement("div");
        card.className = "card";

        const titulo = document.createElement("h2");
        titulo.innerText = el.nombre;

        const precio = document.createElement("h3");
        precio.innerText = `$${el.precio}`;

        const imagen = document.createElement("img");
        imagen.src = el.imagen;
        imagen.alt = "NOIMG";
        imagen.className = "img";

        const boton = document.createElement("button");
        if (esCarrito) {
            boton.className = "botonQuitar";
            boton.innerText = "Quitar del carrito";
            boton.addEventListener("click", () => quitarDelCarrito(el.id));
        } else {
            boton.className = "botton1";
            boton.innerText = "Agregar al carrito";
            boton.addEventListener("click", () => agregarCarrito(el.id));
        }

        card.appendChild(titulo);
        card.appendChild(precio);
        card.appendChild(imagen);
        card.appendChild(boton);

        container.appendChild(card);
    });
};

function mostrarProductos() {
    crearCard(arrayDeProductos, false);
};

function mostrarCarrito() {
    container.innerHTML = "";

    if (arrayDeCarrito.length === 0) {
        const mensajeVacio = document.createElement("p");
        mensajeVacio.innerText = "El carrito está vacío.";
        mensajeVacio.className = "mensaje-vacio";
        container.appendChild(mensajeVacio);
    } else {
        crearCard(arrayDeCarrito, true);
    }
};

function agregarCarrito(id) {
    const productoElegido = arrayDeProductos.find(el => el.id === id);
    if (arrayDeCarrito.some(element => element.id === productoElegido.id)) {
        Toastify({
            text: "Ya agregaste este producto",
            duration: 3000,
            gravity: "bottom",
            style: {
                background: "linear-gradient(to right, #fc1303, #f2583d)",
            },
        }).showToast();
    } else if (productoElegido) {
        arrayDeCarrito.push(productoElegido);
        Toastify({
            text: `Agregaste ${productoElegido.nombre} al carrito`,
            duration: 3000,
            gravity: "bottom",
            style: {
                background: "linear-gradient(to right, #15a340, #49b19b )",
            },
        }).showToast();
        localStorage.setItem("arrayDeCarrito", JSON.stringify(arrayDeCarrito));
        actualizarBotonCarrito();
    }
};

function quitarDelCarrito(id) {
    Swal.fire({
        title: "¿Estás seguro de eliminar este producto?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No, no quiero",
        cancelButtonColor: "#fc1303",
        confirmButtonText: "Si, seguro!",
        confirmButtonColor: "#15a340",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¡Borrado!",
                text: "Borraste correctamente este producto del carrito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
            const indice = arrayDeCarrito.findIndex(el => el.id === id);
            if (indice !== -1) {
                const productoEliminado = arrayDeCarrito[indice];
                arrayDeCarrito.splice(indice, 1);
                localStorage.setItem("arrayDeCarrito", JSON.stringify(arrayDeCarrito));
                mostrarCarrito();
                actualizarBotonCarrito();
            }
        } else {
            Swal.fire({
                title: "No se borró del carrito.",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });
};

function inicio() {
    container.innerHTML = "";

    const inicio = document.createElement("div");
    inicio.className = "divInicio";

    const tituloInicio = document.createElement("h2");
    tituloInicio.innerText = "¡Bienvenidos a Cosmos Indumentaria!"
    tituloInicio.className = "tituloInicio";

    const imgPrincipal = document.createElement("img");
    imgPrincipal.src = './img/collage2.png';
    imgPrincipal.className = "img-principal";

    const btnInicio = document.createElement("button");
    btnInicio.innerText = "Ver todos los productos"
    btnInicio.className = "btnInicio";
    btnInicio.addEventListener("click", () => {
        if (arrayDeProductos.length === 0) {
            obtenerProductos();
        } else {
            mostrarProductos();
        }
    });

    inicio.appendChild(tituloInicio);
    inicio.appendChild(imgPrincipal);
    inicio.appendChild(btnInicio);

    container.appendChild(inicio);
};

/* function vaciarCarrito() {
    if (arrayDeCarrito.length === 0) {
        Toastify({
            text: "El carrito está vacío.",
            duration: 1500,
            gravity: "bottom",
            style: {
                background: "linear-gradient(to right, #15a340, #49b19b )",
            },
        }).showToast();
    } else {
        Swal.fire({
            title: "¿Estás seguro que desea vaciar el carrito?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "No, no quiero",
            cancelButtonColor: "#fc1303",
            confirmButtonText: "Si, seguro!",
            confirmButtonColor: "#15a340",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "¡Carrito vacío!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
                arrayDeCarrito.length = 0;
                localStorage.setItem("arrayDeCarrito", JSON.stringify(arrayDeCarrito));
                mostrarCarrito();
                actualizarBotonCarrito();
            } else {
                Swal.fire({
                    title: "No se vació del carrito.",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    }
}; */

function actualizarBotonCarrito() {
    carrito1.innerText = `Carrito (${arrayDeCarrito.length})`;
};

document.addEventListener("DOMContentLoaded", () => {
    inicio();
    actualizarBotonCarrito();
});
