import { validateTitleLenght, validatePrice } from './utils.js';

const formElement = document.querySelector('.ad-form');
const advertismentTitleElement = formElement.querySelector('#title');
const advertismentPriceElement = formElement.querySelector('#price');
const advertismentRoomElement = formElement.querySelector('#room_number');
const advertismentGuestElement = formElement.querySelector('#capacity');
const advertismentSliderElement = formElement.querySelector('.ad-form__slider');
const defaultConfig = {
  classTo: 'ad-form__element',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
};

noUiSlider.create(advertismentSliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1000,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

advertismentSliderElement.noUiSlider.on('update', () => {
  advertismentPriceElement.value = advertismentSliderElement.noUiSlider.get();
});

advertismentPriceElement.addEventListener('change', changePriceHandler);

function changePriceHandler() {
  advertismentSliderElement.noUiSlider.set(advertismentPriceElement.value);
}

function getMessageByValidatingGuestByRoom() {
  const roomValue = +advertismentRoomElement.value;
  const guestValue = +advertismentGuestElement.value;
  let message = '';
  if (roomValue === 1 && guestValue !== 1) {
    message = 'Корректный варинат выбора: 1 комната — «для 1 гостя»';
  } else if (roomValue === 2 && (guestValue > 2 || guestValue <= 1)) {
    message = 'Корректный варинат выбора: 2 комнаты — «для 2 гостей» или «для 1 гостя»;';
  }else if (roomValue === 3 && (guestValue > 3 || guestValue <= 1)) {
    message = 'Корректный варинат выбора: 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»';
  } else if (roomValue === 100 && guestValue !== 0){
    message = 'Корректный варинат выбора: 100 комнат — «не для гостей»';
  }
  return message;
}

function validateGuestsByRoom() {
  const roomValue = +advertismentRoomElement.value;
  const guestValue = +advertismentGuestElement.value;
  if (
    (roomValue === 1 && guestValue === 1) ||
    (roomValue === 2  && (guestValue <= 2 && guestValue > 0)) ||
    (roomValue === 3  && (guestValue <= 3 && guestValue > 0)) ||
    (roomValue === 100 && guestValue === 0)
  ) {
    return true;
  }
  return false;
}

export const pristine = new Pristine(formElement, defaultConfig);

function selectFieldChangedHandler() {
  pristine.validate([advertismentRoomElement, advertismentGuestElement]);
}

advertismentRoomElement.addEventListener('change', selectFieldChangedHandler);
advertismentGuestElement.addEventListener('change', selectFieldChangedHandler);

pristine.addValidator(
  advertismentRoomElement,
  validateGuestsByRoom,
  getMessageByValidatingGuestByRoom
);

pristine.addValidator(
  advertismentGuestElement,
  validateGuestsByRoom,
  getMessageByValidatingGuestByRoom
);

pristine.addValidator(
  advertismentTitleElement,
  validateTitleLenght,
  'Длина не меньше 30 и не больше 100 символов'
);

pristine.addValidator(
  advertismentPriceElement,
  validatePrice,
  'Максимальное значение — 100000'
);
