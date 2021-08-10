const producto=[];
class Pasteleria{
    constructor (producto, precio){
        this.producto= producto;
        this.precio= precio;

    }
}
let vueltas= parseInt(prompt('cuantos productos quiere cargar?'));
for(let i=0;i<vueltas;i++){
   let nombre = prompt('Ingrese nombre del producto ');
   let price = parseFloat(prompt('Ingrese el precio del Producto '));
   producto.push(new Pasteleria( nombre.toLowerCase(),price));
    
}
function ordena(next, prev){
    if(next.producto>prev.producto){
        return 1;
    }
    if(next.producto<prev.producto){
        return -1;
    }
    return 0;
}

producto.sort(ordena);
console.log(producto);

