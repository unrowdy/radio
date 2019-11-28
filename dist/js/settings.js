// settings.js

import {player1, player2} from './player.js';
//import {display} from './display.js';
import {storage} from './storage.js';
import {preset} from './preset.js';
//import {stations} from './stations.js';

export let settings = {
  colors: {
    on: '#ffb16e',
    error: '#ffb16e',
    off: '#1c1c1f',
  },
  stations: 'data/66536.json',
  visual: true,
  volume: function(n) {
    player1.audio.volume = n;
    player2.audio.volume = n;
  },
  /*color: function(hex) {
    settings.colors.on = hex;
    for(let o=0; o<settings.colors.gradient.length; o++) {
      settings.colors.gradient[o] = hex;
    }
    display.load(stations[storage.getItem('current')].station);
  },*/
  visualizer: function(boo) {
    this.visual = boo;
    preset.play(storage.getItem('current'));
  }
}