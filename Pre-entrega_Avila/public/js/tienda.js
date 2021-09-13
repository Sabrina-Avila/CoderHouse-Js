// VARIABLES
const URL = '../data/productos.json';

// Devuelve el carrito del header
function getHeaderCarrito() {
  return $('#navbarNav .navbar-nav > li').last();
}

function getCart() {
  return JSON.parse(sessionStorage.getItem('cart') || '[]');
}

function updateCart() {
  const cart = getCart();
  const countEl = getHeaderCarrito().find('span');
  const total = cart.reduce((total, product) => total + product.price, 0);
  const popoverArticleEl = $('.popover-body article');
  const cartListEl = popoverArticleEl.find('section').first();
  const totalPriceEl = popoverArticleEl.find('section').last();
  const carrito = getHeaderCarrito();

  // Actualizamos el contador de productos en el header.
  countEl.text(cart.length);

  if (total === 0) {
    $(carrito).popover('hide');
  }

  if (cartListEl) {
    // Agrego los productos a listado.
    cartListEl.empty();
    cart.forEach((product) => $(cartListEl).append(createCartItem(product)));
  }

  if (totalPriceEl) {
    totalPriceEl.find('span').last().text(`$${total}`);
  }
  $(carrito).popover('update');
}

function createCartItem(product) {
  const container = $(document.createElement('div')).addClass(
    'd-flex col-12 mb-2'
  ).append(`
      <span class="col-6">${product.name}</span>
      <span class="col-4">$${product.price}</span>
      <span class="col-2"><i class="icon bi bi-trash-fill"></i></span>
  `);
  container
    .find('span')
    .last()
    .click((event) => {
      const cart = getCart();

      event.preventDefault();
      event.stopPropagation();

      const index = cart.findIndex((p) => p.id === product.id);
      if (index > -1) {
        cart.splice(index, 1);
      }
      sessionStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
    });
  return container;
}

function createCartPopover() {
  const carrito = getHeaderCarrito();
  $(carrito).popover({
    content: () => {
      const cart = getCart();
      const total = cart.reduce((total, product) => total + product.price, 0);
      const wrapper = $(document.createElement('article'))
        .addClass('p-2')
        .append('<section class="row"></section>');

      cart.forEach((product) =>
        wrapper.find('section').append(createCartItem(product))
      );

      if (total > 0) {
        wrapper.append(`
          <section class="row border-top">
            <div class="d-flex col-12 mt-2">
              <span class="col-6"><strong>Total</strong></span>
              <span class="col-6">$${total}</span>
            </div>
          </section>
        `);
      }
      return wrapper;
    },
    delay: 500,
    html: true,
    placement: 'bottom',
  });
}

// FUNCION PARA AGREGAR UN PRODUCTO AL CARRITO
function createOnButtonClick(product) {
  return (event) => {
    const cart = getCart();

    event.preventDefault();
    event.stopPropagation();

    // Agregamos el producto al array de cart y actualizamos la sesión
    cart.push(product);
    sessionStorage.setItem('cart', JSON.stringify(cart));

    // Volvemos a crear el listado de compras
    updateCart();
  };
}

// FUNCION GENERADORA DE CARD DE PRODUCTOS
function createProductCard(producto) {
  const element = $(document.createElement('div'));
  const btn = $(document.createElement('button'));

  btn.append(`
        <span class="price">$ ${producto.price}</span>
        <span class="shopping-cart"><i id='hidden' class="bi bi-cart3" aria-hidden="true"></i></span>
        <span class="buy">Comprar!</span>
    `);
  btn.addClass('btn');
  btn.click(createOnButtonClick(producto));

  element.addClass('col-12 p-1');
  element.append(`
        <div id="container_tienda">
            <div class="product-details">
                <h1>${producto.name}</h1>
                <span class="hint-star star">
                    <i class="bi bi-star-fill" aria-hidden="true"></i>
                    <i class="bi bi-star-fill" aria-hidden="true"></i>
                    <i class="bi bi-star-fill" aria-hidden="true"></i>
                    <i class="bi bi-star-fill" aria-hidden="true"></i>
                    <i class="bi bi-star-fill" aria-hidden="true"></i>
                </span>

                <p class="information">"${producto.description}"</p>
                <div class="control">
                </div>
            </div>
            <div class="product-image">
                <img src="../imagen/${producto.image}" alt="imagen">
            </div>
        </div>
    `);

  $(element).find('.control').append(btn);
  $('#lista').append(element);
  return element;
}

// Init JQuery when DOM is ready
$(function init() {
  const cart = getCart();
  $('#lista').empty();
  getHeaderCarrito().find('span').text(cart.length);

  // Creamos el popover del carrito
  createCartPopover();

  $.get(URL, function (respuesta, estado) {
    if (estado === 'success') {
      const { data } = respuesta;
      data.forEach(createProductCard);
    }
  });
});
