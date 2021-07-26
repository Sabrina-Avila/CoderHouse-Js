let nombre, apellido, materia,  i=0, nota=0, promedio=0;
nombre=prompt('INGRESE NOMBRE DEL ALUMNO');
apellido= prompt('INGRESE APELLIDO DEL ALUMNO');
materia=prompt('Ingrese materia');
while(materia !== 'fin'){
    nota = nota + parseFloat(prompt('Ingrese Nota de la materia '));
    i++;
    materia=prompt('Ingrese materia');
}
if(i!==0){
   promedio = nota / i;
   alert(`El promedio del alumno ${apellido} ${nombre} es ${promedio}`);
}else{
    alert('NO INGRESASTE NINGUNA MATERIA');
}