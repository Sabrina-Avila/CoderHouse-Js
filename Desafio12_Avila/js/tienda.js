//VARIABLES
const compra = [];

// Devuelve el carrito del header
function getHeaderCarrito() {
    return $('#navbarNav .navbar-nav > li').last();
}

function createProductList() {
    const carrito = getHeaderCarrito()
    $(carrito).popover({
        content: () => {
            const wrapper = $(document.createElement('section'));
            compra.forEach(product => wrapper.append(`
                <div class="col-12">
                    <span class="col-6">${product.nombre}</span>
                    <span class="col-6">$${product.precio}</span>
                </div>`
                )
            );
            return wrapper;
        },
        delay: 500,
        html: true,
        placement: 'bottom'
    })
}

//FUNCION PARA AGREGAR UN PRODUCTO AL CARRITO
function createOnButtonClick(product) {
    return (event) => {
        const countEl = getHeaderCarrito().find('span');
        event.preventDefault();
        event.stopPropagation();
        countEl.text(String(parseInt(countEl.text(), 10) + 1))
        compra.push(product);
        const popoverSectionEl = $('.popover-body section');
        if (popoverSectionEl) {
            popoverSectionEl.append(`
                <div class="col-12">
                    <span class="col-6">${product.nombre}</span>
                    <span class="col-6">$${product.precio}</span>
                </div>`
            );
        }
    }
}

//FUNCION GENERADORA DE CARD DE PRODUCTOS
function createProductCard(producto) {
    const element = $(document.createElement('div'));
    const btn = $(document.createElement('button'));
    
    btn.append(`
        <span class="price">$ ${producto.precio}</span>
        <span class="shopping-cart"><i id='hidden' class="bi bi-cart3" aria-hidden="true"></i></span>
        <span class="buy">Comprar!</span>
    `);
    btn.addClass('btn');
    btn.click(createOnButtonClick(producto));
    
    element.addClass('col-12 p-1');
    element.append(`
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
    `);    
    
    $(element).find('.control').append(btn);
    $('#lista').append(element);
    return element;
}

// Init JQuery when DOM is ready
$(document).ready(function init() {
    //SCROLL PARA NAVEGADOR
    window.onscroll = function myFunction() {
        if (document.body.scrollTop > 640 || document.documentElement.scrollTop > 640) {
            $("#idscroll").addClass('fondo');
        } else {
            $("#idscroll").removeClass('fondo');
        }
    }

    //Creamos el popover del carrito
    createProductList()

    if ('stock' in localStorage) {
        const stock = JSON.parse(localStorage.getItem("stock"));
        // Borramos el contenido de la lista
        $('#lista').empty();
        const countEl = getHeaderCarrito().find('span').text('0');
        // Creamos cada producto y lo guardamos en la lista.
        stock.forEach(createProductCard)
    }
})
