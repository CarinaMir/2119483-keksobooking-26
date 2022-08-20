import { URL } from './constants.js';
import { showAlert } from './utils.js';

async function getData() {
  try {
    const response = await fetch(URL);
    if (response.ok) {
      const json = await response.json(); // (3)
      return json;
    } else {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  }
  catch (err) {
    showAlert(err);
  }
}

export { getData };
