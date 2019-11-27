// keyboard.js

import {settings} from './settings.js';
import {controls} from './controls.js';
import {preset} from './preset.js';

let volume = {
  current: 1,
  up: function() {
    if(this.current < 1) {
      this.current = (this.current * 10 + 1) / 10;
      settings.volume(this.current);
    }
  },
  down: function() {
    if(this.current > 0) {
      this.current = (this.current * 10 - 1) / 10;
      settings.volume(this.current);
    }
  }
};

let color = {
  options: [
    '#f7707c',
    '#eb7e24',
    '#a69e22',
    '#36b240',
    '#1cae9a',
    '#16aac2',
    '#2ca3ea',
    '#9c8df5',
    '#f465c7'
  ],
  current: 3,
  up: function() {
    this.current = this.current + 1;
    if(this.current >= this.options.length) {
      this.current = 0;
    }
    settings.color(this.options[this.current]);
  },
  down: function() {
    this.current = this.current - 1;
    if(this.current < 0) {
      this.current = this.options.length - 1;
    }
    settings.color(this.options[this.current]);
  }
}

let shortcuts = {
  ' ': {
    description: 'play/pause',
    action: function() {
      controls.off();
    }
  },
  'ArrowLeft': {
    description: 'station back',
    action: function() {
      controls.prev();
    }
  },
  'ArrowRight': {
    description: 'station forward',
    action: function() {
      controls.next();
    }
  },
  's': {
    description: 'set',
    action: function() {
      controls.set();
    }
  },
  '1': {
    description: 'preset 1',
    action: function() {
      preset.select({
        target: document.getElementById('preset1')
      });
    }
  },
  '2': {
    description: 'preset 2',
    action: function() {
      preset.select({
        target: document.getElementById('preset2')
      });
    }
  },
  '3': {
    description: 'preset 3',
    action: function() {
      preset.select({
        target: document.getElementById('preset3')
      });
    }
  },
  '4': {
    description: 'preset 4',
    action: function() {
      preset.select({
        target: document.getElementById('preset4')
      });
    }
  },
  '5': {
    description: 'preset 5',
    action: function() {
      preset.select({
        target: document.getElementById('preset5')
      });
    }
  },
  '-': {
    description: 'volume down',
    action: function () {
      volume.down();
    }
  },
  '=': {
    description: 'volume up',
    action: function () {
      volume.up();
    }
  },
  ',': {
    description: 'color back',
    action: function() { 
      color.down();
    }
  },
  '.': {
    description: 'color forward',
    action: function() {
      color.up();
    }
  },
}

window.addEventListener("keydown", function (e) {
  if(!e.getModifierState('Control')) {
    if(shortcuts[e.key]) {
      shortcuts[e.key].action();
    }
  }
});