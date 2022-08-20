import { pristine } from './validating.js';

const advertisementFormElement = document.querySelector('.ad-form');
const advertisementFormNodes = [...advertisementFormElement.childNodes];
const mapElement = document.querySelector('.map__filters');
const mapNodes = [...mapElement.childNodes];
const formElement = document.querySelector('.ad-form');
const buttonSubmitElement = formElement.querySelector('.ad-form__submit');

buttonSubmitElement.addEventListener('click', submitFormHandler);

function submitFormHandler(evt) {
  evt.preventDefault();
  pristine.validate();
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


