// Array de Carrito
let arrayDeCarrito = JSON.parse(localStorage.getItem("arrayDeCarrito"));
if (!Array.isArray(arrayDeCarrito)) {
    arrayDeCarrito = [];
}

let arrayDeProductos = []; // Array para almacenar los productos obtenidos del archivo JSON

const container = document.getElementById("container");
const inicio1 = document.getElementById("inicio");
const productos1 = document.getElementById("productos");
const carrito1 = document.getElementById("carrito");


// Ejecutar eventos
productos1.addEventListener("click", obtenerProductos); // Cambiado a obtenerProductos para cargar datos antes de mostrar
carrito1.addEventListener("click", mostrarCarrito);
inicio1.addEventListener("click", inicio);
/* carrito1.addEventListener("click", vaciarCarrito); */

document.addEventListener("DOMContentLoaded", () => {
    inicio();
    actualizarBotonCarrito();
});
