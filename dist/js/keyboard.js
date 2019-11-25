// keyboard.js

import {settings} from './settings.js';
import {storage} from './storage.js';
import {preset} from './preset.js';
import {stations} from './stations.js';

// apparently keyCode is deprecated btw

window.addEventListener("keydown", function (e) {
  if (e.keyCode === 32) {
    // space bar
    // you need to move the UI controls into a module
    // or you are just going to duplicate all the button click events from main.js
  }
  if (e.keyCode === 38) {
    // up arrow
    settings.volume(1);
  }
  else if (e.keyCode === 40) {
    // down arrow
    settings.volume(0.5);
  }
  else if (e.keyCode === 37) {
    // left arrow
    var current = storage.getItem('current') - 1;
    if (current < 0) current = stations.length - 1;
    preset.play(current);
    storage.setItem('current', current);
  }
  else if (e.keyCode === 39) {
    // right arrow
    var current = storage.getItem('current') + 1;
    if (current === stations.length) current = 0;
    preset.play(current);
    storage.setItem('current', current);
  }
  else if (e.keyCode === 82) {
    // r key
    settings.color('#f33c3c');
  }
  else if (e.keyCode === 71) {
    // g key
    settings.color('#54d454');
  }
  else if (e.keyCode === 66) {
    // b key
    settings.color('#2470ff');
  }
});