class Producto {
    constructor (nombre, precio, descripcion,imagen, cantidad) {
        this.nombre = nombre;
        this.precio = parseFloat(precio) || 0;
        this.descripcion = descripcion;
        this.imagen=imagen;
        this.cantidad = parseInt(cantidad, 10) || 0;
        this.id = nombre;
    }

    incrementar(cantidad) {
        this.cantidad = cantidad + this.cantidad;
    }
}

class Stock {
    constructor () {
        this.productos = [];
    }

    nuevoProducto(nombre, precio,descripcion,imagen, cantidad) {
        const producto = new Producto(nombre, precio,descripcion,imagen, cantidad);
        this.productos.push(producto);
    }
}

class Carrito {
    constructor (id) {
        this.id = id;
        this.seleccion = {};
        this.total = 0;
    }

    agregar(producto, cantidad) {
        const precio = producto.precio;
        this.seleccion[producto.id] = cantidad;
        this.total = (precio * cantidad) + this.total;
    }
}

// Armar el stock inicial
const stock = new Stock();
stock.nuevoProducto("Alfajores", 10,'Alfajores Surtidos','../imagen/alf01.jpg', 25);
stock.nuevoProducto("Brownies", 100,'Brownies Deliciosos','../imagen/Brownie02.jpg' ,50);
stock.nuevoProducto("Cookies", 300, 'Cookies Surtidas','../imagen/cookie.png', 75);
stock.nuevoProducto("Cheesecake", 30,'Torta Cheesecake','../imagen/chesk.jpg', 2500);
stock.nuevoProducto("Lemon Pie", 3, 'Tarta Lemon Pie','../imagen/Tartas.jpg', 2000);
stock.nuevoProducto("Tarta de Frutilla", 5,'Tarta de Frutilla rellena con crema Pastelera','../imagen/Tfrutillas.jpg', 1500);
localStorage.setItem("stock",JSON.stringify(stock.productos));

// Mostrar el stock armado
for (const key in stock.productos) {
    if (Object.hasOwnProperty.call(stock.productos, key)) {
        const producto = stock.productos[key];
        console.log(`Sr. Administrador, usted tiene ${producto.cantidad} artículos del producto ${producto.nombre}`);
    }
}

// // Armar "carrito" al usuario
// const carrito = new Carrito('usuario');
// let seleccion = prompt('Ingrese nombre del Producto');
// while (seleccion !== 'fin') {
//     const producto = stock.buscarProducto(seleccion);
//     if (producto) {
//         carrito.agregar(producto, 1)
//     } else {
//         console.log('El producto no existe');
//     }
//     seleccion = prompt('Ingrese nombre del Producto');
// }

// Muestro el total y la seleccion del usuario
//console.log(`Total carrito $${carrito.total}`, carrito.seleccion);