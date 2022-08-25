import { URL } from './constants.js';
import { showAlert } from './utils.js';

async function getData() {
  try {
    const response = await fetch(`${URL}/data`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  }
  catch (err) {
    showAlert(err);
  }
}

async function sendData(form) {
  const config = {
    method: 'POST',
    body: form
  };
  try {
    const response = await fetch(URL, config);
    if (response.ok) {
      return true;
    } else {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  }
  catch (err) {
    showAlert(err);
  }
}

export { getData, sendData };
