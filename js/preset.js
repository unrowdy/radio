// preset.js

import {storage} from './storage.js';
import {settings} from './settings.js';
import {stations} from './stations.js';
import {lcd, player1, player2} from './player.js';
import {display} from './display.js';

export let preset = {
  flag: false,
  play: function(x, retry) {
    lcd.error(false);
    lcd.tune(true);
    document.getElementById("off").innerHTML = 'Off';
    settings.playing = true;
    display.load(stations[x].station);
    document.title = stations[x].station;
    preset.active(false);
    storage.setItem('current', x);
  
    if(retry || !settings.visual) {
      player1.unload();
      player2.load(stations[x]);
    } else {
      player2.unload();
      player1.load(stations[x]);
    }
  },
  select: function(e) {
    if (preset.flag) {
      storage.setItem(e.target.id, storage.getItem('current'));
      preset.active(false);
      e.target.innerHTML = stations[storage.getItem('current')].station;
    } else if (storage.getItem(e.target.id) !== undefined) {
      preset.play(storage.getItem(e.target.id));
    }
  },

  active: function(active) {
    this.flag = active;
    var buttons = document.querySelectorAll('.preset button');
    for (let i = 0; i < buttons.length; i++) {
      if (active) {
        buttons[i].className = 'blink';
      } else {
        buttons[i].className = '';
      }
    }
  }
};