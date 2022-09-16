import { setPhoto } from './utils.js';

const avatarChooserElement = document.querySelector('.ad-form__field input[type=file]');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const realEstateChooserElement = document.querySelector('.ad-form__upload input[type=file]');
const realEstatePhotoElement = document.querySelector('.ad-form__photo');

const changeAvatarPhotoHandler = () => {
  setPhoto(avatarChooserElement, avatarPreviewElement);
};

const changeRealEstatePhotoHandler = () => {
  const imgItem = document.createElement('img');
  imgItem.classList.add('ad-form__preview_img');
  realEstatePhotoElement.appendChild(imgItem);
  const realEstatePreviewElements = document.querySelectorAll('.ad-form__photo img');
  const realEstatePreviewLastElement = realEstatePreviewElements.length - 1;
  setPhoto(realEstateChooserElement, realEstatePreviewElements[realEstatePreviewLastElement]);
};

export const setImagesToForm = () => {
  avatarChooserElement.addEventListener('change', changeAvatarPhotoHandler);
  realEstateChooserElement.addEventListener('change', changeRealEstatePhotoHandler);
};

export const clearPreviewImg = () => {
  const realEstatePreviewElements = document.querySelectorAll('.ad-form__photo img');
  realEstateChooserElement.value = '';
  avatarChooserElement.value = '';
  avatarPreviewElement.src = 'img/muffin-grey.svg';
  if (realEstatePreviewElements){
    realEstatePreviewElements.forEach((previewItem) => {realEstatePhotoElement.removeChild(previewItem);});
  }
};
