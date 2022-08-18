import { generateSimilarAdvertisement } from './generating-similars.js';
import { setActiveState } from './form.js';
import { CENTER_LAT, CENTER_LNG } from './constants.js';
import { generatedAdvertisementData } from './generating-data.js';

const mapElement = document.querySelector('#map-canvas');
const coordinateElement = document.querySelector('#address');

const mainMarkerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker({
  lng: CENTER_LNG,
  lat: CENTER_LAT
},
{
  draggable: true,
  icon: mainMarkerIcon
},);

const map = L.map(mapElement)
  .on('load', () => {
    setActiveState();
    coordinateElement.value = `${CENTER_LAT}; ${CENTER_LNG}`;
  })
  .setView({
    lng: 139.692,
    lat: 35.6895,
  }, 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const coordinate = evt.target.getLatLng();
  coordinateElement.value = `${(coordinate.lat).toFixed(5)}; ${coordinate.lng.toFixed(5)}`;
});

const advertisementItems = generatedAdvertisementData();

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
