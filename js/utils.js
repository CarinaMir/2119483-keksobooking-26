import { ALERT_SHOW_TIME, FILE_TYPES, MIN_REAL_ESTATE_PRICE, MAX_REAL_ESTATE_PRICE } from './constants.js';

export const validateTitleLenght = (value) => !!value && value.length >= 30 && value.length <= 100;
export const validatePrice = (value) => !!value && value <= 100000;
export const showAlert = (message) => {
  const alertContainerElement = document.createElement('div');
  alertContainerElement.textContent = message;
  alertContainerElement.classList.add('alert-message--active');
  document.body.appendChild(alertContainerElement);
  setTimeout(() => {
    alertContainerElement.remove();
  }, ALERT_SHOW_TIME);
};

export const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export const setPhoto = (chooserName, fieldName) =>{
  const file = chooserName.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matches) {
    fieldName.src = URL.createObjectURL(file);
  }
};

export const verifySelectorByFieldName = (item, fieldName, value) =>{
  if (value !== 'any') {
    return ((item.offer[fieldName].toString()) === value);
  }
  return true;
};

export const verifyPriceSelector = (item, fieldName, value) => {
  if (value === 'middle') {
    return  (Number(item.offer[fieldName]) > MIN_REAL_ESTATE_PRICE && Number(item.offer[fieldName]) <= MAX_REAL_ESTATE_PRICE);
  }
  if (value === 'low') {
    return (Number(item.offer[fieldName]) <= MIN_REAL_ESTATE_PRICE);
  }
  if (value === 'high') {
    return (Number(item.offer[fieldName]) > MAX_REAL_ESTATE_PRICE);
  }
  return true;
};

export const verifyFeatureSelector = (item, fieldName, value) => {
  if (value) {
    if (item.offer.features !== undefined) {
      return item.offer.features.includes(fieldName);
    }
    return false;
  }
  return true;
};

export const isEscapeKey = (evt) => evt.key === 'Escape';
