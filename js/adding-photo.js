import { setPhoto } from './utils.js';

const avatarChooserElement = document.querySelector('.ad-form__field input[type=file]');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const realEstateChooserElement = document.querySelector('.ad-form__upload input[type=file]');
const realEstatePhotoElement = document.querySelector('.ad-form__photo');

function changeAvatarPhotoHandler() {
  setPhoto(avatarChooserElement, avatarPreviewElement);
}

function changeRealEstatePhotoHandler() {
  const imgItem = document.createElement('img');
  imgItem.classList.add('ad-form__preview_img');
  realEstatePhotoElement.appendChild(imgItem);
  const realEstatePreviewElement = document.querySelector('.ad-form__photo img');
  setPhoto(realEstateChooserElement, realEstatePreviewElement);
}

export function setImagesToForm() {
  avatarChooserElement.addEventListener('change', changeAvatarPhotoHandler);
  realEstateChooserElement.addEventListener('change', changeRealEstatePhotoHandler);
}

export function clearPreviewImg() {
  const realEstatePreviewElement = document.querySelector('.ad-form__photo img');
  realEstateChooserElement.value = '';
  avatarChooserElement.value = '';
  avatarPreviewElement.src = 'img/muffin-grey.svg';
  if (realEstatePreviewElement){
    realEstatePhotoElement.removeChild(realEstatePreviewElement);
  }
}
