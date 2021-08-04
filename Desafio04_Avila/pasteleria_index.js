
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
