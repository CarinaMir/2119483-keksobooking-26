import { URL } from './constants.js';
import { showAlert } from './utils.js';

export const getData = async() => {
  try {
    const response = await fetch(`${URL}/data`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error(`${response.status} - ${response.statusText}`);
  }
  catch (err) {
    showAlert(err);
  }
};

export const sendData = async(form) => {
  const config = {
    method: 'POST',
    body: form
  };
  try {
    const response = await fetch(URL, config);
    if (response.ok) {
      return true;
    }
    throw new Error(`${response.status} - ${response.statusText}`);
  }
  catch (err) {
    showAlert(err);
  }
};

