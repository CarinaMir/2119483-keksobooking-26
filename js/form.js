import { pristine } from './validating.js';
import { sendData } from './api.js';
import { setMarker } from './map.js';
import { CENTER_LAT, CENTER_LNG} from './constants.js';

const advertisementFormElement = document.querySelector('.ad-form');
const advertisementFormNodes = [...advertisementFormElement.childNodes];
const mapElement = document.querySelector('.map__filters');
const mapNodes = [...mapElement.childNodes];
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

submitButtonElement.addEventListener('click', submitFormHandler);
resetButtonElement.addEventListener('click', resetButtonHandler);

function submitFormHandler(evt) {
  evt.preventDefault();
  const formData = new FormData(advertisementFormElement);
  const isValid = pristine.validate();
  if (isValid){
    sendData(formData);
  }
}

function resetButtonHandler(evt){
  evt.preventDefault();
  setMarker();
  closePopup();
  coordinateElement.value = `${CENTER_LAT}; ${CENTER_LNG}`;
  titleElement.value = '';
  roomNumberElement.selectedIndex = 0;
  typeElement.selectedIndex = 0;
  capacityElement.selectedIndex = 2;
  priceElement.value = 0;
  timeinElement.selectedIndex = 0;
  timeoutElement.selectedIndex = 0;
  descriptionElement.value = '';
  deletePristineErrorMessage();
}

function closePopup() {
  const popupPaneElement = document.querySelector('.leaflet-pane .leaflet-popup-pane').querySelector('.leaflet-zoom-animated');
  if (popupPaneElement){
    popupPaneElement.remove();
  }
}

function deletePristineErrorMessage() {
  const pristineErrorMessages = [...document.querySelectorAll('.pristine-error')];
  pristineErrorMessages.forEach((errorMessage) => errorMessage.remove());
}

function setStatusToChildNode({parentItem, tagName, status, className}) {
  [...parentItem.childNodes].forEach((item) => {
    if (item.tagName === tagName) {
      return status === 'remove' ? item.classList.remove(className) : item.classList.add(className);
    }
  });
}

export function setInactiveState() {
  advertisementFormElement.classList.add('ad-form--disabled');
  advertisementFormNodes.forEach((item) => {
    item.disabled = true;
  });
  mapNodes.forEach((mapItem) => {
    if (mapItem.tagName === 'SELECT') {
      mapItem.disabled = true;
    }
    if (mapItem.tagName === 'FIELDSET') {
      setStatusToChildNode({parentItem: mapItem, tagName: 'LABEL', status: 'add', className: 'map__feature_inactive'});
    }
  });
  mapElement.disabled = true;
}

export function setActiveState() {
  advertisementFormElement.classList.remove('ad-form--disabled');
  advertisementFormNodes.forEach((item) => {
    item.disabled = false;
  });
  mapNodes.forEach((mapItem) => {
    if (mapItem.tagName === 'SELECT') {
      mapItem.disabled = false;
    }
    if (mapItem.tagName === 'FIELDSET') {
      setStatusToChildNode({parentItem: mapItem, tagName: 'LABEL', status: 'remove', className: 'map__feature_active'});
    }
  });
  mapElement.disabled = false;
}


