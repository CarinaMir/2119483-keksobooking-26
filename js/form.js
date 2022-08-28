import { pristine } from './validating.js';
import { sendData } from './api.js';
import { setMarker, initMapState, setMapView, closeMapPopup} from './map.js';
import { CENTER_LAT, CENTER_LNG} from './constants.js';
import { isEscapeKey } from './utils.js';

const advertisementFormElement = document.querySelector('.ad-form');
const advertisementFormElements = [...advertisementFormElement.childNodes];
const mapElement = document.querySelector('.map__filters');
const mapElements = [...mapElement.childNodes];
const submitButtonElement = advertisementFormElement.querySelector('.ad-form__submit');
const resetButtonElement = advertisementFormElement.querySelector('.ad-form__reset');
const coordinateElement = document.querySelector('#address');
const titleElement = advertisementFormElement.querySelector('#title');
const roomNumberElement = advertisementFormElement.querySelector('#room_number');
const typeElement = advertisementFormElement.querySelector('#type');
const priceElement = advertisementFormElement.querySelector('#price');
const capacityElement = advertisementFormElement.querySelector('#capacity');
const timeinElement = advertisementFormElement.querySelector('#timein');
const timeoutElement = advertisementFormElement.querySelector('#timeout');
const descriptionElement = advertisementFormElement.querySelector('#description');
const advertismentSliderElement = advertisementFormElement.querySelector('.ad-form__slider');
const successMessageTemplateElement = document.querySelector('#success');
const successMessageElement = successMessageTemplateElement.content.querySelector('div');
const errorMessageTemplateElement = document.querySelector('#error');
const errorMessageElement = errorMessageTemplateElement.content.querySelector('div');

submitButtonElement.addEventListener('click', submitFormHandler);
resetButtonElement.addEventListener('click', resetButtonHandler);
document.addEventListener('click', closeModalPopupHandler);
document.addEventListener('keydown', keydownHandler);

function submitFormHandler(evt) {
  evt.preventDefault();
  const formData = new FormData(advertisementFormElement);
  const isValid = pristine.validate();
  if (isValid) {
    sendData(formData).then((result) => {
      disableSubmitdButton();
      if (result){
        showSuccessMessage();
        resetFormSettings();
      } else {
        showErrorMessage();
      }
    });
    abledSubmitButton();
  }
}

function resetButtonHandler(evt) {
  evt.preventDefault();
  resetFormSettings();
}

function closeModalPopupHandler(evt) {
  const successContainerElement = document.querySelector('.success');
  const errorContainerElement = document.querySelector('.error');
  if (successContainerElement && successContainerElement.contains(evt.target)){
    document.body.removeChild(successContainerElement);
  }
  if (errorContainerElement && errorContainerElement.contains(evt.target)){
    document.body.removeChild(errorContainerElement);
  }
}

function keydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const successContainerElement = document.querySelector('.success');
    const errorContainerElement = document.querySelector('.error');
    if (successContainerElement && evt.target.contains(successContainerElement)){
      document.body.removeChild(successContainerElement);
    }
    if (errorContainerElement && evt.target.contains(errorContainerElement)){
      document.body.removeChild(errorContainerElement);
    }
  }
}

function resetFormSettings() {
  setMarker();
  closeMapPopup();
  resetFormFilters();
  clearPristineErrorMessage();
  resetMapFilters();
  initMapState();
  setMapView();
}

function resetFormFilters() {
  const formFeaturesFiltersContainerElement = document.querySelector ('.ad-form__element--wide.features');
  coordinateElement.value = `${CENTER_LAT}; ${CENTER_LNG}`;
  titleElement.value = '';
  roomNumberElement.selectedIndex = 0;
  typeElement.selectedIndex = 0;
  capacityElement.selectedIndex = 2;
  timeinElement.selectedIndex = 0;
  timeoutElement.selectedIndex = 0;
  descriptionElement.value = '';
  advertismentSliderElement.noUiSlider.set(0);
  priceElement.value = 0;
  setUnchecked(formFeaturesFiltersContainerElement);
}

function resetMapFilters() {
  const housingTypeElement = document.querySelector('#housing-type');
  const housingPriceElement = document.querySelector('#housing-price');
  const housingRoomsElement = document.querySelector('#housing-rooms');
  const housingGuestsElement = document.querySelector('#housing-guests');
  const housingFeaturesContainerElement = document.querySelector('#housing-features');
  housingTypeElement.selectedIndex = 0;
  housingPriceElement.selectedIndex = 0;
  housingRoomsElement.selectedIndex = 0;
  housingGuestsElement.selectedIndex = 0;
  setUnchecked(housingFeaturesContainerElement);
}

function setUnchecked(items) {
  [...items.childNodes].forEach((item) => {
    if (item.nodeName === 'INPUT') {
      item.checked = false;
    }
  });
}

function clearPristineErrorMessage() {
  const pristineErrorMessages = [...document.querySelectorAll('.pristine-error')];
  pristineErrorMessages.forEach((errorMessage) => {
    if (errorMessage.textContent.length > 0){
      errorMessage.textContent = '';
    }
  }
  );
}

function showErrorMessage() {
  errorMessageElement.setAttribute('style', 'z-index: 100');
  document.body.appendChild(errorMessageElement);
}

function showSuccessMessage() {
  successMessageElement.setAttribute('style', 'z-index: 100');
  document.body.appendChild(successMessageElement);
}

function disableSubmitdButton() {
  submitButtonElement.disabled = false;
  submitButtonElement.classList.remove('ad-form__submit__disabled');
}

function abledSubmitButton() {
  submitButtonElement.disabled = true;
  submitButtonElement.classList.add('ad-form__submit__disabled');
}

function setStatusToChildNode({parentItem, tagName, status, className}) {
  [...parentItem.childNodes].forEach((item) => {
    if (item.tagName === tagName) {
      return status === 'remove' ? item.classList.remove(className) : item.classList.add(className);
    }
  });
}

export function setActiveAdvertisementForm() {
  advertisementFormElement.classList.remove('ad-form--disabled');
  advertisementFormElements.forEach((item) => {
    item.disabled = false;
  });
}

export function setActiveMapFilters() {
  mapElements.forEach((mapItem) => {
    if (mapItem.tagName === 'SELECT') {
      mapItem.disabled = false;
    }
    if (mapItem.tagName === 'FIELDSET') {
      setStatusToChildNode({parentItem: mapItem, tagName: 'LABEL', status: 'remove', className: 'map__feature_inactive'});
    }
  });
  mapElement.disabled = false;
}
