import {generatedAdvertisementData} from './generating-data.js';

const renameTypes = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace':'Дворец',
  'hotel': 'Отель'
};

function getNameByRoomCount(value){
  if (value === 1){
    return 'комната';
  } else if (value < 5){
    return 'комнаты';
  }
  return 'комнат';
}

function getNameByGuestCount(value){
  return value === 1 ? 'гостя' : 'гостей';
}

function getPhotos(photos) {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const imgItem = document. createElement('img');
    imgItem.src = photo;
    imgItem.classList.add('popup__photo');
    imgItem.width = '45';
    imgItem.height = '40';
    fragment.appendChild(imgItem);
  });
  return fragment;
}

export function generateSimilarAdvertisement() {
  const advertisementTemplateElement = document.querySelector('#card');
  const mapContainerElement = document.querySelector('#map-canvas');
  const fragment = document.createDocumentFragment();
  const advertisementItems = generatedAdvertisementData();
  advertisementItems.forEach((advertisement) => {
    const advertisementItem = advertisementTemplateElement.cloneNode(true);
    const advertisementItemContent = advertisementItem.content;
    advertisementItemContent.querySelector('.popup__title').textContent = advertisement.offer.title || '';
    advertisementItemContent.querySelector('.popup__text--address').textContent = advertisement.offer.address || '';
    advertisementItemContent.querySelector('.popup__text--price').textContent = `${advertisement.offer.price} ₽/ночь` || '';
    advertisementItemContent.querySelector('.popup__type').textContent = renameTypes[advertisement.offer.type] || '';
    advertisementItemContent.querySelector('.popup__text--capacity').textContent =`${advertisement.offer.rooms} ${getNameByRoomCount(advertisement.offer.rooms)} для ${advertisement.offer.guests} ${getNameByGuestCount(advertisement.offer.guests)}` || '';
    advertisementItemContent.querySelector('.popup__text--time').textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}` || '';
    advertisementItemContent.querySelector('.popup__features').textContent = advertisement.offer.features || '';
    advertisementItemContent.querySelector('.popup__description').textContent = advertisement.offer.description || '';
    advertisementItemContent.querySelector('.popup__photos').textContent = '';
    advertisementItemContent.querySelector('.popup__photos').appendChild(getPhotos(advertisement.offer.photos));
    advertisementItemContent.querySelector('.popup__avatar').src = advertisement.author.avatar || '';
    fragment.appendChild(advertisementItemContent);
  });
  mapContainerElement.appendChild(fragment);
}


