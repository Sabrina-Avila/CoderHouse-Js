const stock = JSON.parse(localStorage.getItem("stock"));
function createCard(producto){
    const element = document.createElement('div');
    const btn = document.createElement('button');
    
    btn.classList.add('btn');
    btn.onclick = () => alert(`Hiciste click en ${producto.nombre}`)
    btn.innerHTML = `
        <span class="price">$${producto.precio}</span>
        <span class="shopping-cart"><i id='hidden' class="bi bi-cart3" aria-hidden="true"></i></span>
        <span class="buy">Comprar!</span>
    `;
    
    element.classList.add('col-12');
    element.classList.add('p-1');
    element.innerHTML = `
        <div id="container_tienda">
            <div class="product-details">
                <h1>${producto.nombre}</h1>
                <span class="hint-star star">
                    <i id= 'hidden' class="bi bi-star-fill" aria-hidden="true"></i>
                    <i id= 'hidden' class="bi bi-star-fill" aria-hidden="true"></i>
                    <i id= 'hidden' class="bi bi-star-fill" aria-hidden="true"></i>
                    <i id= 'hidden' class="bi bi-star-fill" aria-hidden="true"></i>
                    <i id= 'hidden' class="bi bi-star-fill" aria-hidden="true"></i>
                </span>

                <p class="information">"${producto.descripcion}"</p>
                <div class="control">
                </div>
            </div>
            <div class="product-image">
                <img id= 'img' src="${producto.imagen}" alt="imagen">
            </div>
        </div>
    `;

    const div = element.querySelector('.control');
    div.appendChild(btn);

    return element;


}

stock.forEach(producto => {
    const lista = document.getElementById('lista');
    const card = createCard(producto);
    lista.appendChild(card);
})

