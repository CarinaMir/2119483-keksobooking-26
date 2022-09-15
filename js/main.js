import { initMap, renderMapElemens } from './map.js';
import { getData } from './api.js';

initMap();
getData().then(renderMapElemens);
