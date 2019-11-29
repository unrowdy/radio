// main.js

import {stations} from './stations.js'; // just cause it needs to come before settings cause you have loops n stuff
import {storage} from './storage.js';
import {settings} from './settings.js';
import {player1, player2} from './player.js';
import {visualizer} from './visualizer.js';
import {display} from './display.js';
import {controls} from './controls.js';
import './keyboard.js';

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
    controls.off();
  });

  document.getElementById('prev').addEventListener('click', function() {
    controls.prev();
  });

  document.getElementById('next').addEventListener('click', function() {
    controls.next();
  });

  document.getElementById('set').addEventListener('click', function() {
    controls.set();
  });

  var urlParams = new URLSearchParams(window.location.search);
  if(urlParams.has('debug')) {
    document.getElementById('fps').style.display = 'block';
  }
});