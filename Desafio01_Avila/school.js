let anio = 0, primero, segundo, tercero, dato;
dato = prompt("Ingrese el Nombre y Apellido del Alumno: ");
primero = parseFloat(prompt("Ingrese el primer trimestre: "));

segundo = parseFloat(prompt("Ingrese el Segundo Trimestre: "));

tercero = parseFloat(prompt("Ingrese el Tercero Trimestre: "));
parseFloat(anio= primero + segundo + tercero);
alert("El alumno "+ dato + " finaliza el año con un promedio de " + parseFloat(anio/3));