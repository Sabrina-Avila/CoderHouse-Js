// //array con ubicaciones de las imagenes
// const imagUrl=['./imagenes/cobayo01.jpg','./imagenes/cobayo02.jpg','./imagenes/cobayo3.jpg','./imagenes/cobayo4.jpg'];
// //creo el elemento padre
// const section = document.createElement('section');
// document.body.appendChild(section);
// //creo el elemento hijo
// const div = document.createElement('div');
// div.id = 'imgId';
// div.classList= 'recuadroGrande';
// section.appendChild(div);
// //creo los div de imagenes pequenas
// const div2 = document.createElement('div');
// div.classList= 'recuadroPequeno';
// section.appendChild(div2);
// const imagen1 = document.createElement('img');
// imagen1.src=imagUrl[0];
// imagen1.alt='cobayos';


//array con ubicaciones de las imagenes
const images = [
    {
        title: 'Cobayo americano',
        description: 'American guinea pig',
        src: './imagenes/cobayo01.jpg'    
    },
    {
        title: 'Cobayo peruano',
        description: 'Peruvian guinea pig',
        src: './imagenes/cobayo02.jpg'    
    },
    {
        title: 'Cobayo alpaca',
        description: 'Alpaca guinea pig',
        src: './imagenes/cobayo3.jpg'    
    },
    {
        title: 'Cobayo sueco',
        description: 'Swedish guinea pig',
        src: './imagenes/cobayo4.jpg'    
    }
];

const parent = document.createElement('article');
const row = document.createElement('section');
const titulo = document.createElement('h1');
titulo.classList='titulo';

parent.style.display = 'flex';
parent.style.flexDirection = 'column';

images.forEach((imagen, index) => {
    const img = document.createElement('img');
    img.id = index;
    img.src = imagen.src;
    img.alt = imagen.description;
    img.onclick = (event) => {
        const { currentTarget } = event;
        const mainImg = document.getElementById(0);
        const src = mainImg.src;
        mainImg.src = currentTarget.src;
        currentTarget.src = src;
        console.log(imagen);
        titulo.innerHTML=imagen.title;
    };
    
    if (index === 0) {
        titulo.innerHTML = imagen.title;
        img.classList.add('recuadroGrande');
        parent.appendChild(img);
    } else {
        img.classList.add('recuadroPequeno');
        row.appendChild(img);
    }
})
parent.appendChild(titulo);
parent.appendChild(row);
document.body.appendChild(parent)
