// settings.js

import {player1, player2} from './player.js';
import {display} from './display.js';

export let settings = {
  colors: {
    on: '#54d454',
    error: '#f33c3c',
    off: '#121214',
    gradient: [
      '#54d454',
      '#54d454',
      '#54d454',
      '#54d454',
      '#54d454',
      '#54d454',
      '#54d454',
      '#54d454',
      '#54d454',
      '#e0e042',
      '#e0e042',
      '#f33c3c',
    ]
  },
  volume: function(n) {
    player1.audio.volume = n;
    player2.audio.volume = n;
  },
  color: function(hex) {
    settings.colors.on = hex;
    display.load(stations[storage.getItem('current')].station);
  }
}