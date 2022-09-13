import { ALERT_SHOW_TIME, FILE_TYPES, MIN_REAL_ESTATE_PRICE, MAX_REAL_ESTATE_PRICE } from './constants.js';

export function validateTitleLenght(value) {
  return !!value && value.length >= 30 && value.length <= 100;
}

export function validatePrice(value) {
  return !!value && value <= 100000;
}

export function showAlert(message) {
  const alertContainerElement = document.createElement('div');
  alertContainerElement.textContent = message;
  alertContainerElement.classList.add('alert-message--active');
  document.body.appendChild(alertContainerElement);

  setTimeout(() => {
    alertContainerElement.remove();
  }, ALERT_SHOW_TIME);
}

export function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

export function debounce(callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export function setPhoto(chooserName, fieldName) {
  const file = chooserName.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matches) {
    fieldName.src = URL.createObjectURL(file);
  }
}

export function verifySelectorByFieldName(item, fieldName, value) {
  if (value !== 'any') {
    return ((item.offer[fieldName].toString()) === value);
  }
  return true;
}

export function verifyPriceSelector(item, fieldName, value) {
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
}

export function verifyFeatureSelector(item, fieldName, value) {
  if (value) {
    if (item.offer.features !== undefined) {
      return item.offer.features.includes(fieldName);
    }
    return false;
  }
  return true;
}
