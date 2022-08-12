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
      setStatusToChildNode(mapItem, 'LABEL', 'add', 'map__feature_inactive');
    }
  });
  mapElement.disabled = true;
}

function setStatusToChildNode(parentItem, tagName, status, className) {
  [...parentItem.childNodes].forEach((item) => {
    if (item.tagName === tagName) {
      return status === 'remove' ? item.classList.remove(className) : item.classList.add(className);
    }
  });
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
      setStatusToChildNode(mapItem, 'LABEL', 'remove', 'map__feature_inactive');
    }
  });
  mapElement.disabled = false;
}

