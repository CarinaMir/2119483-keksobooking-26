const realEstateTypes = {
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
  if (photos){
    photos.forEach((photo) => {
      const imgItem = document. createElement('img');
      imgItem.src = photo;
      imgItem.classList.add('popup__photo');
      imgItem.width = '45';
      imgItem.height = '40';
      fragment.appendChild(imgItem);
    });
  }
  return fragment;
}

export function generateSimilarAdvertisement(item) {
  const advertisementTemplateElement = document.querySelector('#card');
  const advertisementContainer = document.createElement('div');
  const advertisementItem = advertisementTemplateElement.cloneNode(true);
  const advertisementItemContent = advertisementItem.content;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = item.offer;
  advertisementItemContent.querySelector('.popup__title').textContent = title || '';
  advertisementItemContent.querySelector('.popup__text--address').textContent = address || '';
  advertisementItemContent.querySelector('.popup__text--price').textContent = `${price} ₽/ночь` || '';
  advertisementItemContent.querySelector('.popup__type').textContent = realEstateTypes[type] || '';
  advertisementItemContent.querySelector('.popup__text--capacity').textContent =`${rooms} ${getNameByRoomCount(rooms)} для ${guests} ${getNameByGuestCount(guests)}` || '';
  advertisementItemContent.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}` || '';
  advertisementItemContent.querySelector('.popup__features').textContent = features || '';
  advertisementItemContent.querySelector('.popup__description').textContent = description || '';
  advertisementItemContent.querySelector('.popup__photos').textContent = '';
  advertisementItemContent.querySelector('.popup__photos').appendChild(getPhotos(photos));
  advertisementItemContent.querySelector('.popup__avatar').src = item.author.avatar || '';
  advertisementContainer.appendChild(advertisementItemContent);
  return advertisementContainer;
}
