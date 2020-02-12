// controls.js

import {storage} from './storage.js';
import {settings} from './settings.js';
import {stations} from './stations.js';
import {preset} from './preset.js';
import {lcd, player1, player2} from './player.js';
import {display} from './display.js';

export let controls = {
  off: function() {
    if(player1.source.getAttribute("src") || player2.source.getAttribute("src")) {
      player1.unload();
      player2.unload();

      lcd.error(false);
      lcd.tune(false);
      document.getElementById("off").innerHTML = 'On';
      settings.playing = false;
      display.unload();
      document.title = 'Radio';
      preset.active(false);
    } else {
      var current = storage.getItem('current');
      if (current === -1) current = 0;
      preset.play(current);
      storage.setItem('current', current);
    }
  },
  prev: function() {
    var current = storage.getItem('current') - 1;
    if (current < 0) current = stations.length - 1;
    preset.play(current);
    storage.setItem('current', current);
  },
  next: function() {
    var current = storage.getItem('current') + 1;
    if (current === stations.length) current = 0;
    preset.play(current);
    storage.setItem('current', current);
  },
  set: function() {
    if((player1.source.getAttribute("src") || player2.source.getAttribute("src")) && !preset.flag) {
      preset.active(true);
    } else {
      preset.active(false);
    }
  }
}