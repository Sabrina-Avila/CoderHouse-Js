class stock{
    constructor (nombre,cantidad){
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

    restar_stock(){
        this.cantidad=this.cantidad-1;
    }


}
const prod_stock1 = new stock("Alfajores","10");
const prod_stock2 = new stock("Brownie","100");
const prod_stock3 = new stock("Cookies","300");
const prod_stock4 = new stock("Chesecake","30");
const prod_stock5 = new stock("Lemon Pie","3");
const prod_stock6 = new stock("Tarta de Frutilla","5");

function busca_precio(producto){
    let costo;
    switch(producto){
        case "Alfajores" :
            costo= 50;
            prod_stock1.restar_stock();
            return costo;
        case "Brownie":
            costo=100;
            prod_stock2.restar_stock();
            return costo;
        case "Chesecake" : 
            costo=500;
            prod_stock4.restar_stock();
            return costo;
        case "Lemon Pie":
            costo=2000;
            prod_stock5.restar_stock();
            return costo;
        case "Cookies":
            costo= 75;
            prod_stock3.restar_stock();
            return costo;
        case "Tarta de Frutillas":
            costo= 1500;
            prod_stock6.restar_stock();
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
console.log('Sr. administrador usted tiene stock del producto: '+ prod_stock1.nombre +' '+ prod_stock1.cantidad);
console.log('Sr. administrador usted tiene stock del producto: '+ prod_stock2.nombre +' '+ prod_stock2.cantidad);
console.log('Sr. administrador usted tiene stock del producto: '+ prod_stock3.nombre +' '+ prod_stock3.cantidad);
console.log('Sr. administrador usted tiene stock del producto: '+ prod_stock4.nombre +' '+ prod_stock4.cantidad);
console.log('Sr. administrador usted tiene stock del producto: '+ prod_stock5.nombre +' '+ prod_stock5.cantidad);
console.log('Sr. administrador usted tiene stock del producto: '+ prod_stock6.nombre +' '+ prod_stock6.cantidad);



