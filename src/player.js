// player.js

import {storage} from './storage.js';
import {settings} from './settings.js';
import {preset} from './preset.js';
import {visualizer} from './visualizer.js';

function randy() {
  return '?randy=' + Math.round(Math.random() * 100000000);
}

export let lcd = {
  tune: function(state) {
    if(state) {
      document.getElementById('tune').classList.add('lit');
    } else {
      document.getElementById('tune').classList.remove('lit');
    }
  },
  error: function(state) {
    if(state) {
      document.getElementById('error').classList.add('error');
    } else {
      document.getElementById('error').classList.remove('error');
    }
  }
}

export let player1 = {
  create: function() {
    this.audio = document.createElement("audio");
    this.audio.setAttribute("preload", "none");
    this.audio.setAttribute("crossorigin", "anonymous");

    this.source = document.createElement("source");
    this.source.addEventListener("error", function(e) {
      preset.play(storage.getItem('current'), true);
    });
  },
  load: function(station) {
    visualizer.create();
    
    this.source.setAttribute("src", station.source + randy());
    this.source.setAttribute("type", station.type);
    this.audio.appendChild(this.source);
    this.audio.load();
    this.audio.oncanplay = () => {
      this.audio.play();
      lcd.tune(false);
      
      if(this.audio.mozCaptureStream) {
        this.audio.captureStream = this.audio.mozCaptureStream;
        console.log('mozilla');
      } else {
        this.audio.muted = true;
        console.log('chrome');
      }
      var stream = this.audio.captureStream();
      this.media = visualizer.context.createMediaStreamSource(stream);
      this.media.connect(visualizer.analyser);
      
      visualizer.start();
    };
  },
  unload: function() {
    visualizer.stop();
    this.source.removeAttribute("src");
    this.source.removeAttribute("type");
    try { this.audio.removeChild(this.source); } catch {}
    this.audio.load();
  }
}

export let player2 = {
  create: function() {
    this.audio = document.createElement("audio");
    this.audio.setAttribute("preload", "none");

    this.source = document.createElement("source");
    this.source.addEventListener("error", function(e) {
      lcd.error(true);
      lcd.tune(false);
    });
  },
  load: function(station) {
    this.source.setAttribute("src", station.source + randy());
    this.source.setAttribute("type", station.type);
    this.audio.appendChild(this.source);
    this.audio.load();
    this.audio.oncanplay = function() {
      player2.audio.play();
      lcd.tune(false);
    };
  },
  unload: function() {
    this.source.removeAttribute("src");
    this.source.removeAttribute("type");
    try { this.audio.removeChild(this.source); } catch {}
    this.audio.load();
  }
}