import { generateSimilarAdvertisement } from './similars.js';
import { setActiveAdvertisementForm, setActiveMapFilters } from './form.js';
import {
  CENTER_LAT,
  CENTER_LNG,
  RENDER_DELAY,
  SCALE,
  ADVERTISEMENT_AMOUNT,
  ORD_ICON_URL,
  ORD_ICON_SIZE,
  ORD_ICON_ANCHOR,
  MAIN_ICON_URL,
  MAIN_ICON_SIZE,
  MAIN_ICON_ANCHOR,
  MAX_DIGITS
} from './constants.js';
import { debounce, verifySelectorByFieldName, verifyPriceSelector, verifyFeatureSelector} from './utils.js';

const mapElement = document.querySelector('#map-canvas');
const coordinateElement = document.querySelector('#address');
const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');
const housingFeaturesContainerElement = document.querySelector('#housing-features');
const housingWiFiElement = document.querySelector('#filter-wifi');
const housingDishwasherElement = document.querySelector('#filter-dishwasher');
const housingParkingElement = document.querySelector('#filter-parking');
const housingWasherElement = document.querySelector('#filter-washer');
const housingElevatorElement = document.querySelector('#filter-elevator');
const housingConditionerElement = document.querySelector('#filter-conditioner');
let mainMarker, map, markerGroup;
const storage = {
  adeverts: []
};

const setAdverts = (value) => {
  storage.adeverts = value;
};

const getFilteredData = (items) => items.slice(0, ADVERTISEMENT_AMOUNT);

const getFilter = (item) => {
  const typeVal =housingTypeElement.value;
  const priceVal = housingPriceElement.value;
  const roomVal = housingRoomsElement.value;
  const guestVal = housingGuestsElement.value;
  const isWifi = housingWiFiElement.checked;
  const isDishwasher = housingDishwasherElement.checked;
  const isParking = housingParkingElement.checked;
  const isWasher = housingWasherElement.checked;
  const isElevator = housingElevatorElement.checked;
  const isConditioner = housingConditionerElement.checked;
  const resultFilter = verifySelectorByFieldName(item, 'type', typeVal)
                        && verifyPriceSelector(item, 'price', priceVal)
                        && verifySelectorByFieldName(item, 'rooms', roomVal)
                        && verifySelectorByFieldName(item, 'guests', guestVal)
                        && verifyFeatureSelector(item, 'wifi', isWifi)
                        && verifyFeatureSelector(item, 'dishwasher', isDishwasher)
                        && verifyFeatureSelector(item, 'parking', isParking)
                        && verifyFeatureSelector(item, 'washer', isWasher)
                        && verifyFeatureSelector(item, 'elevator', isElevator)
                        && verifyFeatureSelector(item, 'conditioner', isConditioner);
  return resultFilter;
};

const setMainMarkerSettings = () => {
  const markerIcon = L.icon({
    iconUrl: MAIN_ICON_URL,
    iconSize: [MAIN_ICON_SIZE, MAIN_ICON_SIZE],
    iconAnchor: [MAIN_ICON_ANCHOR, MAIN_ICON_SIZE],
  });
  const marker = L.marker({
    lng: CENTER_LNG,
    lat: CENTER_LAT
  },
  {
    draggable: true,
    icon: markerIcon
  },);
  return marker;
};

const createMap = () => {
  const card = L.map(mapElement)
    .on('load', () => {
      setActiveAdvertisementForm();
      coordinateElement.value = `${CENTER_LAT}; ${CENTER_LNG}`;
    })
    .setView({
      lng: CENTER_LNG,
      lat: CENTER_LAT,
    },
    SCALE);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(card);
  return card;
};

const addOrdinaryMarkersToMap = (data) => {
  const advertisementItems = data;
  const ordinaryIcon = L.icon({
    iconUrl: ORD_ICON_URL,
    iconSize: [ORD_ICON_SIZE, ORD_ICON_SIZE],
    iconAnchor: [ORD_ICON_ANCHOR, ORD_ICON_ANCHOR],
  });

  markerGroup.clearLayers();

  advertisementItems.forEach((advertisement) => {
    const lat = advertisement.location.lat;
    const lng = advertisement.location.lng;
    const ordinaryMarker = L.marker({
      lat,
      lng
    }, {
      ordinaryIcon
    });
    ordinaryMarker
      .addTo(markerGroup)
      .bindPopup(generateSimilarAdvertisement(advertisement));
  });
};

const changeFilterHandler = () => {
  let resultData = [];
  markerGroup.clearLayers();
  if (storage.adeverts) {
    resultData = getFilteredData(storage.adeverts.filter(getFilter));
    addOrdinaryMarkersToMap(resultData);
  }
};

export const initMapState = () =>{
  const filteredData = getFilteredData(storage.adeverts);
  addOrdinaryMarkersToMap(filteredData);
  setActiveMapFilters();
};

export const setMarker = () => {
  mainMarker.setLatLng({
    lat: CENTER_LAT,
    lng: CENTER_LNG,
  });
};

export const setMapView = () =>{
  map.setView({
    lng: CENTER_LNG,
    lat: CENTER_LAT,
  },
  SCALE);
};

export const closeMapPopup = () =>{
  map.closePopup();
};

export const initMap = () =>{
  mainMarker = setMainMarkerSettings();
  map = createMap();
  markerGroup = L.layerGroup().addTo(map);
  mainMarker.addTo(map);
  mainMarker.on('moveend', (evt) => {
    const coordinate = evt.target.getLatLng();
    coordinateElement.value = `${(coordinate.lat).toFixed(MAX_DIGITS)}; ${coordinate.lng.toFixed(MAX_DIGITS)}`;
  });
  housingTypeElement.addEventListener('change', debounce(changeFilterHandler, RENDER_DELAY));
  housingPriceElement.addEventListener('change', debounce(changeFilterHandler, RENDER_DELAY));
  housingRoomsElement.addEventListener('change', debounce(changeFilterHandler, RENDER_DELAY));
  housingGuestsElement.addEventListener('change', debounce(changeFilterHandler, RENDER_DELAY));
  housingFeaturesContainerElement.addEventListener('change', debounce(changeFilterHandler, RENDER_DELAY));
};

export const renderMapElemens = (data) => {
  if (data) {
    setAdverts(data);
    initMapState();
  }
};

