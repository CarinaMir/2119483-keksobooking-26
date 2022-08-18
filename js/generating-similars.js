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

export function generateSimilarAdvertisement(item) {
  const advertisementTemplateElement = document.querySelector('#card');
  const advertisementContainer = document.createElement('div');
  const advertisementItem = advertisementTemplateElement.cloneNode(true);
  const advertisementItemContent = advertisementItem.content;
  advertisementItemContent.querySelector('.popup__title').textContent = item.offer.title || '';
  advertisementItemContent.querySelector('.popup__text--address').textContent = item.offer.address || '';
  advertisementItemContent.querySelector('.popup__text--price').textContent = `${item.offer.price} ₽/ночь` || '';
  advertisementItemContent.querySelector('.popup__type').textContent = realEstateTypes[item.offer.type] || '';
  advertisementItemContent.querySelector('.popup__text--capacity').textContent =`${item.offer.rooms} ${getNameByRoomCount(item.offer.rooms)} для ${item.offer.guests} ${getNameByGuestCount(item.offer.guests)}` || '';
  advertisementItemContent.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}` || '';
  advertisementItemContent.querySelector('.popup__features').textContent = item.offer.features || '';
  advertisementItemContent.querySelector('.popup__description').textContent = item.offer.description || '';
  advertisementItemContent.querySelector('.popup__photos').textContent = '';
  advertisementItemContent.querySelector('.popup__photos').appendChild(getPhotos(item.offer.photos));
  advertisementItemContent.querySelector('.popup__avatar').src = item.author.avatar || '';
  advertisementContainer.appendChild(advertisementItemContent);
  return advertisementContainer;
}
