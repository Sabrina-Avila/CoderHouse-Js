const stock = JSON.parse(localStorage.getItem("stock"));
function createCard(producto){
    const maindiv=document.createElement('div');
    maindiv.classList.add('col-12');
    const container=document.createElement('div');
    container.id= "container_tienda";
    maindiv.appendChild(container);
    const details = document.createElement('div');
    details.classList.add('product-details');
    container.appendChild(details);
    const titulo = document.createElement('h1');
    details.appendChild(titulo);
    titulo.innerHTML= producto.nombre;

    return maindiv;


}

stock.forEach(producto => {
    const lista = document.getElementById('lista');
    const card = createCard(producto);
    lista.appendChild(card);
})

