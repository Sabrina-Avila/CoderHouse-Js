//SCROLL
window.onscroll = myFunction;

function myFunction() {
    if (document.body.scrollTop > 640 || document.documentElement.scrollTop > 640) {
    document.getElementById("idscroll").classList.add('fondo');
    } else {
    document.getElementById("idscroll").classList.remove('fondo');
    }
}
//FIN DEL SCROLL
//
let i = 0;
const compra = [];
const stock = JSON.parse(localStorage.getItem("stock"));
const header = document.createElement('header');
header.classList.add('row');
header.classList.add('header--sticky');
const contador = document.querySelector('.contador');
contador.appendChild(header);
const carrito = document.querySelector('.bi-cart3');

const modal = document.createElement('div');
const modalBox = document.createElement('section');
const backdrop = document.createElement('div');
modalBox.className = 'modal-dialog';
modal.className = 'modal fade show';
modal.style.display = 'block';
modal.style.zIndex = 99999;
modal.appendChild(modalBox);
backdrop.className = 'modal-backdrop show fade';

function createCard(producto){
    const element = document.createElement('div');
    const btn = document.createElement('button');
    
    btn.classList.add('btn');
    btn.onclick = () => {
        i++;
        contador.textContent=i;
        compra.push(producto);
        console.log(compra);
    };    

    btn.innerHTML = `
        <span class="price">$ ${producto.precio}</span>
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


carrito.onclick = () => {
    let innerCarrito='';
    for(const producto of compra){
        innerCarrito +=`<p>${producto.id} - ${producto.precio}</p>`
    }
    modalBox.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">Carrito</div>
            <div class="modal-body">${innerCarrito}</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary">Close</button>
            </div>
        </div>`;
    const btn = modalBox.querySelector('button');
    btn.onclick = () => {
        document.body.removeChild(modal);
        document.body.removeChild(backdrop);
    }
    document.body.appendChild(backdrop);
    document.body.appendChild(modal);
}
stock.forEach(producto => {
    const lista = document.getElementById('lista');
    const card = createCard(producto);
    lista.appendChild(card);
})



