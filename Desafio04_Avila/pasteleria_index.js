
function busca_precio(producto){
    let costo;
    switch(producto){
        case "Alfajores" :
            costo= 50;
            return costo;
        case "Brownie":
            costo=100;
            return costo;
        case "Chesecake" : 
            costo=500;
            return costo;
        case "Lemon Pie":
            costo=2000;
            return costo;
        case "Cookies":
            costo= 75;
            return costo;
        case "Tarta de Frutillas":
            costo= 1500;
            return costo;
    }
}
function calcula(num1,num2){
    
    return(num1+num2);


}
function muestra(number){
   return alert('Su costo total es de: $'+ number); 
}

let producto, precio=0, total=0;
producto=prompt('Ingrese nombre del Producto: ');
while (producto!=='fin'){
    precio= busca_precio(producto);
    total= calcula(precio,total);
    producto=prompt('Ingrese nombre del Producto: ');
}
muestra(total);




//actividad tienda



// class Tienda {
//     constructor(texto) {
//         this.nombre= texto.nombre;
//         this.direccion= texto.direccion;
//         this.propietario= texto.propietario;
//         this.rubro= texto.rubro;   
//     }
// }


// const tiendas = {};

// for(i=0;i<=2;i++){
//     const nombre=prompt('Ingrese nombre de la Tienda: ');
//     const direccion=prompt('Ingrese direccion de la Tienda: ');
//     const propietario=prompt('Ingrese propietario de la Tienda: ');
//     const rubro=prompt('Ingrese rubro de la Tienda: ');
//     tiendas[i] = new Tienda({nombre: nombre, direccion: direccion, propietario: propietario, rubro:rubro});
// }

// console.log(tiendas);