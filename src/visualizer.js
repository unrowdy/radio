// visualizer.js

import {settings} from './settings.js';
import {element} from './display.js';

export let visualizer = {
  running: false,
  last: 0,
  preload: function() { // create the initial screen
    let md = 'M0 0h222v74h-222z';
    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 12; j++) {
        if(i === 0 && j === 0) {md += 'm4 2';}
        else if(j === 0) {md += 'm22 -66';}
        else {md += 'm0 6';}
        md += 'h16v4h-16z';
      }
    }

    var svg = element.create('svg', {
      parent: document.getElementById('frequency'),
      attributes: {
        height: '74px',
        width: '222px'
      }
    });

    this.back = element.create('path', {
      parent: svg,
      attributes: {
        id: 'back',
        d: 'M1 1h220v72h-220z'
      }
    });
    this.fill = element.create('path', {
      parent: svg,
      attributes: {
        id: 'fill',
        d: 'M1 73V73z'
      }
    });
    this.mask = element.create('path', {
      parent: svg,
      attributes: {
        id: 'mask',
        d: md
      }
    });
  },
  create: function() { // connect it to the analyser
    if(!this.created) {
      this.created = true;

      this.context = new AudioContext();
      this.analyser = this.context.createAnalyser();
      this.data = new Uint8Array(this.analyser.frequencyBinCount);

      this.analyser.connect(this.context.destination);
      console.log('create');
    }
  },
  start: function() {
    if(!this.running) {
      this.running = true;
      console.log('start');
      this.load();
    }
  },
  load: function() { // refresh it
    window.requestAnimationFrame(() => {
      
      if(settings.debugFlag) {
        var end = Date.now();
        var diff = 0;
        if(this.last) {
          diff = end - this.last;
          diff = Math.round(1 / (diff / 1000));
        }
        this.last = end;
        document.getElementById('fps').innerHTML = diff;
      }

      if(this.running) {
      
        var len = this.analyser.frequencyBinCount;
        var values = new Array(10).fill(0);
        var counts = new Array(10).fill(0);

        this.analyser.getByteFrequencyData(this.data);
        var bob = this.data.slice(1);

        // Add all the analyser values into bucket totals
        // and keep a count to get the average
        bob.forEach((valu, i) => {
          var step = 9 - Math.floor(Math.log2(len / (i+2)));

          values[step] += valu;
          counts[step] += 1;
        });

        var fd = 'M1 73';
        values.forEach((val, key) => {
          // this is the average value for that bar
          var avg = Math.round(val / counts[key]);
          // make it exponential and scale to 12
          var mag = Math.round((avg * avg) * (12 / (255 * 255)));

          var h = key * 22 + 23;
          var v = 73 - mag * 6;
          fd += 'V' + v + 'H' + h;
        });
        fd += 'V73z';
        
        this.fill.setAttribute('d', fd);

        this.load();
      } else {
        this.fill.setAttribute('d', 'M1 73V73z');
        console.log('stop');
      }
    });
  },
  stop: function() {
    this.running = false;
  }
};