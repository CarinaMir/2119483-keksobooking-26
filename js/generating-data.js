import {getRandomPositiveFloat, getRandomPositiveInteger, getValueToString} from './utils.js';
import {TITLE, TYPES, PERIODS, FEATURES, DESCRIPTION, PHOTO_URLS, MAX_AMOUNT, MAX_PRICE, MAX_DIGITS, MAX_AVATAR, MIN_LAT, MAX_LAT, MIN_LNG, MAX_LNG} from './constants.js';

function getAuthor() {
  return {
    avatar: `img/avatars/user${getValueToString(getRandomPositiveInteger(1, MAX_AVATAR))}.png`
  };
}

function getOffer(location) {
  return {
    title: TITLE,
    address: `${location.lat}, ${location.lng}`,
    price: getRandomPositiveInteger(1, MAX_PRICE),
    type: TYPES[getRandomPositiveInteger(0, TYPES.length - 1)],
    rooms: getRandomPositiveInteger(1, MAX_AMOUNT),
    guests: getRandomPositiveInteger(1, MAX_AMOUNT),
    checkin: PERIODS[getRandomPositiveInteger(0, PERIODS.length - 1)],
    checkout: PERIODS[getRandomPositiveInteger(0, PERIODS.length - 1)],
    features: getRandomPart(FEATURES),
    description: DESCRIPTION,
    photos: getRandomPart(PHOTO_URLS)
  };
}

function getRandomPart(items) {
  return items.slice(0, getRandomPositiveInteger(1, items.length - 1));
}

function getLocation() {
  return {
    lat: getRandomPositiveFloat(MIN_LAT, MAX_LAT, MAX_DIGITS),
    lng: getRandomPositiveFloat(MIN_LNG, MAX_LNG, MAX_DIGITS)
  };
}

export function createObject () {
  const locality = getLocation();
  return {
    author: getAuthor(),
    offer: getOffer(locality),
    location: locality
  };
}


