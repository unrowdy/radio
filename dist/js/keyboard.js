// keyboard.js

import {settings} from './settings.js';

window.addEventListener("keydown", function (e) {
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
    settings.color('#f33c3c');
  }
  else if (e.keyCode === 39) {
    // right arrow
    settings.color('#54d454');
  }
});