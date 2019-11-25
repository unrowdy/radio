// stations.js

import {storage} from './storage.js';
import {settings} from './settings.js';
import {preset} from './preset.js';

export let stations = {};

var xhttp = new XMLHttpRequest();
xhttp.addEventListener( 'load', function () {
  stations = JSON.parse(this.responseText);
  
  var buttons = document.querySelectorAll('.preset button');
  for (let i = 0; i < buttons.length; i++) {
    if (storage.getItem(buttons[i].id) !== undefined) {
      buttons[i].innerHTML = stations[storage.getItem(buttons[i].id)].station;
    }
    buttons[i].addEventListener('click', preset.select);
  }
});
xhttp.open('GET', settings.stations, true);
xhttp.overrideMimeType('application/json');
xhttp.send();