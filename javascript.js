let imagenes = [];
const foto = document.getElementById('foto');
let img = document.querySelector('#foto img');
let fotoAbierta = false;

function cargarImages(filtro = null) {
    console.log('cargarImages');
    fetch('imagenes.json')
        .then(response => response.json())
        .then(data => {
            if (filtro) {
                imagenes = data.imagenes.filter(el => el.galeria === filtro);
            } else {
                imagenes = data.imagenes.sort((a, b) => a.galeria - b.galeria);
            }
            console.log(imagenes);
            let imagesContainer = document.getElementById('images-container');
            imagenes.forEach((imagen, index) => {
                let div = document.createElement('div');
                let imgn = document.createElement('img');
                imgn.src = imagen.filename;
                imgn.alt = imagen.title;
                imgn.dataset.index = index;
                imgn.onclick = onImgClick;
                div.appendChild(imgn);
                imagesContainer.appendChild(div);
            });
        });
}

function onImgClick(el) {
    showImage(el.target.dataset.index);
    el.stopPropagation();
}

function showImage(index) {
    let imagen = imagenes[index];
    console.log(imagenes);
    console.log(imagen);
    img.src = imagen.filename;
    img.dataset.index = index;
    foto.style.display = 'flex';
    fotoAbierta = true;
}

function closeFoto() {
    foto.style.display = 'none';
    img.src = '';
    fotoAbierta = false;
}

document.addEventListener('click', event => {
    if (fotoAbierta && !img.contains(event.target)) {
        closeFoto();
        return;
    }

    let index = parseInt(img.dataset.index);
    if (event.clientX < window.innerWidth / 2) {
        if (index > 0) {
            showImage(index - 1);
        }
    } else {
        if (index < imagenes.length) {
            showImage(index + 1);
        }
    }
})