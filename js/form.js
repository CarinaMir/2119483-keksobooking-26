const advertisementFormElement = document.querySelector('.ad-form');
const advertisementFormNodes = [...advertisementFormElement.childNodes];
const mapElement = document.querySelector('.map__filters');
const mapNodes = [...mapElement.childNodes];

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
      [...mapItem.childNodes].forEach((item) => {
        if (item.tagName === 'LABEL') {
          item.classList.add('map__feature_inactive');
        }
      });
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
      [...mapItem.childNodes].forEach((item) => {
        if (item.tagName === 'LABEL') {
          item.classList.remove('map__feature_inactive');
        }
      });
    }
  });
  mapElement.disabled = false;
}

