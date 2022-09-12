import { ALERT_SHOW_TIME, FILE_TYPES } from './constants.js';

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
