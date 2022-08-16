import { validateTitleLenght, validatePrice } from './utils.js';

const formElement = document.querySelector('.ad-form');
const advertismentTitleElement = formElement.querySelector('#title');
const advertismentPriceElement = formElement.querySelector('#price');
const advertismentRoomElement = formElement.querySelector('#room_number');
const advertismentGuestElement = formElement.querySelector('#capacity');
const advertismentSliderElement = formElement.querySelector('.ad-form__slider');
const advertismentTypeElement = formElement.querySelector('#type');
const advertismentTimeinElement = formElement.querySelector('#timein');
const advertismentTimeoutElement = formElement.querySelector('#timeout');

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

advertismentTypeElement.addEventListener('change', changeTypeHandler);

function changeTypeHandler(evt) {
  const value = getSliderOptions(evt.target.value);
  advertismentSliderElement.noUiSlider.updateOptions(value);
  advertismentSliderElement.noUiSlider.set(value.range.min);
  advertismentPriceElement.placeholder = value.range.min;
}

function getSliderOptions(value) {
  switch(value) {
    case 'bungalow':
      return {
        range: {
          min: 0,
          max: 100000
        },
        start: 0,
        step: 1000
      };
    case 'flat':
      return {
        range: {
          min: 1000,
          max: 100000
        },
        start: 1000,
        step: 1000
      };
    case 'hotel':
      return {
        range: {
          min: 3000,
          max: 100000
        },
        start: 3000,
        step: 1000
      };
    case 'house':
      return {
        range: {
          min: 5000,
          max: 100000
        },
        start: 5000,
        step: 1000
      };
    case 'palace':
      return {
        range: {
          min: 10000,
          max: 100000
        },
        start: 10000,
        step: 1000
      };
  }
}

advertismentTimeinElement.addEventListener('change', setAppropriateTimeinValueHander);

function setAppropriateTimeinValueHander() {
  const timein = advertismentTimeinElement.value;
  advertismentTimeoutElement.value = timein;
}

advertismentTimeoutElement.addEventListener('change', setAppropriateTimeoutValueHander);

function setAppropriateTimeoutValueHander() {
  const timeout = advertismentTimeoutElement.value;
  advertismentTimeinElement.value = timeout;
}

function getMessageByValidatingGuestByRoom() {
  const roomValue = +advertismentRoomElement.value;
  const guestValue = +advertismentGuestElement.value;
  let message = '';
  if (roomValue === 1 && guestValue !== 1) {
    message = 'Корректный варинат выбора: 1 комната — «для 1 гостя»';
  } else if (roomValue === 2 && (guestValue > 2 || guestValue <= 1)) {
    message = 'Корректный варинат выбора: 2 комнаты — «для 2 гостей» или «для 1 гостя»;';
  } else if (roomValue === 3 && (guestValue > 3 || guestValue <= 1)) {
    message = 'Корректный варинат выбора: 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»';
  } else if (roomValue === 100 && guestValue !== 0){
    message = 'Корректный варинат выбора: 100 комнат — «не для гостей»';
  }
  return message;
}

function validateGuestsByRoom() {
  const roomValue = +advertismentRoomElement.value;
  const guestValue = +advertismentGuestElement.value;
  const roomForGuest = (roomValue === 1 && guestValue === 1);
  const twoRoomsForGuests = (roomValue === 2  && (guestValue <= 2 && guestValue > 0));
  const threeRoomsForGuests = (roomValue === 3  && (guestValue <= 3 && guestValue > 0));
  const hundredRoomsNotForGuests = (roomValue === 100 && guestValue === 0);
  const isMatched = roomForGuest || twoRoomsForGuests || threeRoomsForGuests || hundredRoomsNotForGuests;
  if (isMatched) {
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
