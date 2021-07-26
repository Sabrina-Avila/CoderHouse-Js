let numero, text, num ;

numero=prompt('Ingrese un número: ');

if(parseInt(numero)>1000){
    alert('Su número es mayor a 1000');
}else{
    alert('Tu número es menor a 1000');
}

text=prompt('Ingrese texto');

if(text === 'Hola'){
    alert('Lo que ingresaste fue: '+ text);
}else{
    alert('Ingresaste algo distinto a lo que esperaba');
}

num=prompt('Ingrese un Numero');
num=parseInt(num);

if(num>10 && num<50){
    alert('Tu número esta dentro del rango de 10 a 50');
}else {
    alert('Tu número esta por fuera del rango');
}