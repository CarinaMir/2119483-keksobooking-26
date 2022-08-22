import { URL } from './constants.js';
import { showAlert } from './utils.js';

const buttonSubmitElement = document.querySelector('.ad-form__submit');

async function getData() {
  try {
    const response = await fetch(`${URL}/data`);
    if (response.ok) {
      return await response.json();
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
    buttonSubmitElement.disabled = true;
    buttonSubmitElement.classList.add('ad-form__submit__disabled');
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  }
  catch (err) {
    return false;
  }
  finally {
    buttonSubmitElement.disabled = false;
    buttonSubmitElement.classList.remove('ad-form__submit__disabled');
  }
}

export { getData, sendData };
