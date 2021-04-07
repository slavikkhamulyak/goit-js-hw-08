import images from "./gallery-items.js";

const galleryEl = document.querySelector('ul.js-gallery');
const lightBoxEl = document.querySelector('.js-lightbox');
const lightBoxImageEl = document.querySelector('.lightbox__image');
const lightBoxOverlayEl = document.querySelector('.lightbox__overlay');
const btnCloseEl = document.querySelector('button[data-action="close-lightbox"]');

const galleryMarcup = createImageMarcup (images);

galleryEl.insertAdjacentHTML('afterbegin', galleryMarcup);

galleryEl.addEventListener('click', onGalleryImageClick);
btnCloseEl.addEventListener('click', onModalCloseClick);
lightBoxOverlayEl.addEventListener('click', onModalCloseClick);

function createImageMarcup (images) {
  return images.map(image => {
    return `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href="${image.original}"
      >
        <img
          class="gallery__image"
          src="${image.preview}"
          data-source="${image.original}"
          alt="${image.description}"
        />
      </a>
    </li>
    `; 
}).join('');
} 

function onGalleryImageClick (evt) {
  if (evt.target.nodeName !== 'IMG'){
    return;
  }
  evt.preventDefault();
  window.addEventListener("keydown", onEscKeyPress);
  lightBoxEl.classList.add('is-open');
  lightBoxImageEl.setAttribute('src', evt.target.dataset.source);
  
}

function onModalCloseClick () {
  window.removeEventListener("keydown", onEscKeyPress);
  lightBoxEl.classList.remove('is-open');
  lightBoxImageEl.setAttribute('src', '');
}

function onEscKeyPress (evt) {
  if (evt.code === "Escape") {
    onModalCloseClick();
  }
}