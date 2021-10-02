// VARIABLES
const URL = '../data/productos.json';

// Devuelve el carrito del header
function getHeaderCarrito() {
  return $('#navbarNav .navbar-nav > li').last();
}

function getCart() {
  return JSON.parse(sessionStorage.getItem('cart') || '[]');
}

function getTotalPrice(cart = []) {
  return cart.reduce(
    (total, product) => total + product.price * product.selected,
    0
  );
}

function getTotalProductCount(cart = []) {
  return cart.reduce((count, product) => count + product.selected, 0);
}

function createCartItem(product) {
  const container = $(document.createElement('div')).addClass(
    'd-flex col-12 mb-2'
  ).append(`
      <span class="col-6">${product.selected}x ${product.name}</span>
      <span class="col-4">$${product.price * product.selected}</span>
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
        const product = cart[index];
        if (product.selected > 1) {
          product.selected = product.selected - 1;
          cart[index] = product;
        } else {
          cart.splice(index, 1);
        }
      }
      sessionStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
    });
  return container;
}

function updateCart() {
  const cart = getCart();
  const countEl = getHeaderCarrito().find('span');
  const total = getTotalPrice(cart);
  const popoverArticleEl = $('.popover-body article');
  const cartListEl = popoverArticleEl.find('section').first();
  const totalPriceEl = popoverArticleEl.find('section').last();
  const carrito = getHeaderCarrito();
  const totalProductCount = getTotalProductCount(cart);

  // Actualizamos el contador de productos en el header.
  countEl.text(totalProductCount);

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

// Confirma la compra del carrito.
function confirmarCompra() {
  // REALIZAMOS LA PETICION POST
  const cart = getCart();
  const total = getTotalPrice(cart);

  $.post(
    'http://jsonplaceholder.typicode.com/posts',
    { productos: JSON.stringify(cart), total },
    function (respuesta, estado) {
      console.log('hola');
      if (estado === 'success') {
        // MOSTRAMOS NOTIFICACION DE CONFIRMACIÓN
        $('#notificaciones').html(
          `<div class="container-fluid modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">Compra Confirmada! </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <h2>Comprobante Nº ${respuesta.id}.</h2>
                  <h3>El total de la compra es de : $ ${total}</h3>
                  <img class="tarjeta" src="../imagen/tarjeta_credito.png" alt="tarjeta">
                </div>
                <div class="modal-footer">
                  <button type="button" class="btnTarjeta btn-secondary m-2" data-dismiss="modal">Close</button>
                  <button type="button" class="btnTarjeta btn-primary m-2">Confirmar</button>
                </div>
              </div>
            </div>
          </div>`
        );

        $('#notificaciones .modal').modal('show');
      }
    }
  );
}
// Vacia carrito
function vaciarCart() {
  sessionStorage.setItem('cart', '[]');
  updateCart();
}
function createCartPopover() {
  const cart = getCart();
  const carrito = getHeaderCarrito();
  // Actualizamos el texto de la cantidad total de productos.
  carrito.find('span').text(getTotalProductCount(cart));

  $(carrito).popover({
    content: () => {
      const cart = getCart();
      const total = getTotalPrice(cart);
      const wrapper = $(document.createElement('article')).addClass('p-2');

      if (total > 0) {
        wrapper.append('<section class="row"></section>');
        cart.forEach((product) =>
          wrapper.find('section').append(createCartItem(product))
        );
        wrapper.append(`
          <section class="row border-top">
            <div class="d-flex col-12 mt-2">
              <span class="col-6"><strong>Total</strong></span>
              <span class="col-6">$${total}</span>
            </div>
            <div class="text-center">
            <button type="button" class="btnconfi btn btn-primary">CONFIRMAR</button>
            <button type="button" class="btnconfi btn btn-danger">VACIAR</button>
            </div>
          </section>
        `);
        wrapper.find('button').first().click(confirmarCompra);
        wrapper.find('button').last().click(vaciarCart);
      } else {
        wrapper.append('<p>El carrito está vacío</p>');
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
    // Buscamos si existe el producto en el carrito.
    const index = cart.findIndex((item) => item.id === product.id);

    event.preventDefault();
    event.stopPropagation();

    if (index === -1) {
      // Agregamos el producto al array de cart.
      product.selected = 1;
      cart.push(product);
    } else {
      // El producto existe en el carrito, agregamos uno más al `selected`.
      const current = cart[index];
      current.selected = current.selected + 1;
      cart[index] = current;
    }

    // Actualizamos la sesión
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
  $('#lista').empty();

  // Creamos el popover del carrito
  createCartPopover();

  $.get(URL, function (respuesta, estado) {
    if (estado === 'success') {
      const { data } = respuesta;
      data.forEach(createProductCard);
    }
  });
});
