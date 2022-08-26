import { generateSimilarAdvertisement } from './generating-similars.js';
import { setActiveAdvertisementForm, setActiveMapFilters } from './form.js';
import { CENTER_LAT, CENTER_LNG } from './constants.js';
import { getData } from './api.js';

const mapElement = document.querySelector('#map-canvas');
const coordinateElement = document.querySelector('#address');
const mainMarker = setMainMarkerSettings();
const map = initMap();
mainMarker.addTo(map);
mainMarker.on('moveend', (evt) => {
  const coordinate = evt.target.getLatLng();
  coordinateElement.value = `${(coordinate.lat).toFixed(5)}; ${coordinate.lng.toFixed(5)}`;
});

getData().then((data) => {
  if (data){
    addOrdinaryMarkersToMap(data);
    setActiveMapFilters();
  }
});

function setMainMarkerSettings() {
  const markerIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
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
}

function initMap() {
  const card = L.map(mapElement)
    .on('load', () => {
      setActiveAdvertisementForm();
      coordinateElement.value = `${CENTER_LAT}; ${CENTER_LNG}`;
    })
    .setView({
      lng: CENTER_LNG,
      lat: CENTER_LAT,
    },
    10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(card);
  return card;
}

function addOrdinaryMarkersToMap(data) {
  const advertisementItems = data;
  const ordinaryIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

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
      .addTo(map)
      .bindPopup(generateSimilarAdvertisement(advertisement));
  });
}

export function setMarker() {
  mainMarker.setLatLng({
    lat: CENTER_LAT,
    lng: CENTER_LNG,
  });
}
