function comprarProducto(){
    //obtener el id del producto
    
    const selccionado= productos.find(producto => producto.id == this.id);
    // asociamos el seleccionado al carrito
    carrito.push(selccionado);

    //console.log(selccionado);
    let innerCarrito='';
    for(const producto of carrito){
    innerCarrito+=`<p>${producto.nombre}- ${producto.precio}</p>`
    }


    const divCarrito= document.getElementById("carrito");
    divCarrito.innerHTML=innerCarrito;
    console.log('Respuesta compra')
}
for(const boton of botones){
    boton.addEventListener("click", comprarProducto);
}