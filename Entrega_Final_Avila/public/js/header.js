const LINKS = [
  {
    name: 'Home',
    href: 'index.html',
  },
  {
    name: 'Presupuesto',
    href: 'presupuesto.html',
  },
  {
    name: 'Mis Productos',
    href: 'productos.html',
  },
  {
    name: 'Cursos',
    href: 'cursos.html',
  },
  {
    name: 'Tienda',
    href: 'tienda.html',
  },
];

function parseHref(href, folder = 'view') {
  if (href === 'index.html') {
    return window.location.pathname.includes('index.html')
      ? href
      : `../${href}`;
  }

  return window.location.pathname.includes('index.html')
    ? `${folder}/${href}`
    : `../${folder}/${href}`;
}

function createNavItem(link, childEl) {
  const anchor = $(document.createElement(link.tagName || 'a'))
    .addClass('header__nav__ul__li__a--link')
    .attr('href', parseHref(link.href))
    .append(childEl || link.name);

  if (link.handler) {
    anchor.click(link.handler);
  }

  return $(document.createElement('li'))
    .addClass('header__nav__ul__li--style nav-item')
    .append(anchor);
}

function createNavItems() {
  const items = [];
  const pathname = window.location.pathname;

  for (const link of LINKS) {
    const li = createNavItem(link);

    if (pathname.includes(link.href)) {
      li.addClass('active').append('<span class="sr-only">(current)</span>');
    }

    items.push(li);
  }

  if (pathname.includes('tienda.html')) {
    items.push(
      createNavItem(
        {
          tagName: 'div',
        },
        '<i id="icon" class="bi bi-cart3"></i><span class="badge badge-primary badge-pill">0</span>'
      )
    );
  }

  return items;
}

$(function () {
  const header = $(document.createElement('header')).addClass(
    'row header--sticky'
  );
  const div = $(document.createElement('div'))
    .attr('id', 'idscroll')
    .addClass('col-12 navegador');
  const nav = $(document.createElement('nav')).addClass(
    'header__nav navbar navbar-expand-lg navbar-light'
  ).append(`
            <a class="navbar-brand" href="${parseHref('index.html')}">
                <img src="${parseHref(
                  'logo.png',
                  'imagen'
                )}" alt="logo" width="100" height="100">
                </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="header__nav__ul--justify navbar-nav">
                    
                </ul>
            </div>
        </nav>
    `);

  nav.find('ul').append(createNavItems());

  $('body').prepend(header.append(div.append(nav)));

  // SCROLL PARA NAVEGADOR
  window.onscroll = function onScrollHandler() {
    if (
      document.body.scrollTop > 640 ||
      document.documentElement.scrollTop > 640
    ) {
      $('#idscroll').addClass('fondo');
    } else {
      $('#idscroll').removeClass('fondo');
    }
  };
});
