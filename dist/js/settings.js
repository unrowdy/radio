// settings.js

import {player1, player2} from './player.js';
import {storage} from './storage.js';
import {preset} from './preset.js';

export let settings = {
  stations: 'data/66536.json',
  visual: true,
  debugFlag: false,
  debug: function(sw) {
    if(sw) {
      this.debugFlag = true;
      document.getElementById('fps').style.display = 'block';
    } else {
      this.debugFlag = false;
      document.getElementById('fps').style.display = 'none';
    }
  },
  night: function(t) {
    if(t) {
      document.body.classList.add('night');
    } else {
      document.body.classList.remove('night');
    }
  },
  volume: function(n) {
    player1.audio.volume = n;
    player2.audio.volume = n;
  },
  visualizer: function(boo) {
    this.visual = boo;
    preset.play(storage.getItem('current'));
  }
}