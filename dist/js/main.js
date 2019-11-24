// main.js

import {storage} from './storage.js';
import {stations} from './stations.js';
import {preset} from './preset.js';
import {settings} from './settings.js';
import {lcd, player1, player2} from './player.js';
import {visualizer} from './visualizer.js';
import {display} from './display.js';

window.settings = settings;

if (storage.getItem('current') === undefined) {
  storage.setItem('current', -1);
}

window.addEventListener('load', function() {
  //lcd.error(false);
  //lcd.tune(false); // fades in...

  player1.create();
  player2.create();
  display.create();
  visualizer.preload();

  document.getElementById('off').addEventListener('click', function() {
    if(player1.source.getAttribute("src") || player2.source.getAttribute("src")) {
      player1.unload();
      player2.unload();

      lcd.error(false);
      lcd.tune(false);
      document.getElementById("off").innerHTML = 'On';
      display.unload();
      document.title = 'Radio';
      preset.active(false);
    } else {
      var current = storage.getItem('current');
      if (current === -1) current = 0;
      preset.play(current);
      storage.setItem('current', current);
    }
  });

  document.getElementById('prev').addEventListener('click', function() {
    var current = storage.getItem('current') - 1;
    if (current < 0) current = stations.length - 1;
    preset.play(current);
    storage.setItem('current', current);
  });

  document.getElementById('next').addEventListener('click', function() {
    var current = storage.getItem('current') + 1;
    if (current === stations.length) current = 0;
    preset.play(current);
    storage.setItem('current', current);
  });

  document.getElementById('set').addEventListener('click', function() {
    if((player1.source.getAttribute("src") || player2.source.getAttribute("src")) && !preset.flag) {
      preset.active(true);
    } else {
      preset.active(false);
    }
  });
});