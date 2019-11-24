var context, analyser;

// get those two ^ vars moved in

var black = '#444444';
var squares = 12;

var visualizer = {
  running: false,
  preload: function() { // create the initial screen
    this.canvas = document.getElementById('frequency');

    var values = new Array(10).fill(0);

    var screen = document.querySelector('.screen');
  
    var svg = element.create('svg', {
      parent: screen,
      attributes: {
        height: '72px',
        width: '220px'
      }
    });

    this.canvas.parentNode.replaceChild(svg, this.canvas);

    values.forEach((val, key) => {
      for(k=0; k<squares; k++) {
        element.create('rect', {
          parent: svg,
          attributes: {
            x: key * 22,
            y: (72 - 4) - (k * 6),
            width: 16,
            height: 4,
            id: key + '-' + (k+1)
          },
          style: {
            fill: settings.colors.off
          }
        });
      }
    });
  },
  create: function() { // connect it to the analyser
    if(!this.created) {
      this.created = true;

      context = new AudioContext();
      analyser = context.createAnalyser();
      this.data = new Uint8Array(analyser.frequencyBinCount);

      analyser.connect(context.destination);
    }
    if(!this.running) {
      this.running = true;
      this.load();
    }
  },
  load: function() { // refresh it
    if(this.running) { // cause you still get like 20 refreshes after killing it
      var len = analyser.frequencyBinCount;
      var values = new Array(10).fill(0);
      var counts = new Array(10).fill(0);

      analyser.getByteFrequencyData(this.data);
      var bob = this.data.slice(1);

      // Add all the analyser values into bucket totals
      // and keep a count to get the average
      bob.forEach((valu, i) => {
        var step = 9 - Math.floor(Math.log2(len / (i+2)));

        values[step] += valu;
        counts[step] += 1;
      });

      values.forEach((val, key) => {
        // this is the average value for that bar
        var avg = Math.round(val / counts[key]);
        // make it exponential and scale to 12
        var mag = Math.round((avg * avg) * (12 / (255 * 255)));

        for(h=0; h<squares; h++) {
          var id = key + '-' + (h + 1);
          if((h+1) <= mag) {
            document.getElementById(id).style.fill = settings.colors.gradient[h];
          } else {
            document.getElementById(id).style.fill = settings.colors.off;
          }
        }
      });
    
      window.requestAnimationFrame(this.load.bind(this));
    }
  },
  stop: function() {
    this.running = false;

    // clear the screen
    var values = new Array(10).fill(0);
    values.forEach((val, key) => {
      for(h=0; h<squares; h++) {
        var id = key + '-' + (h + 1);
        document.getElementById(id).style.fill = settings.colors.off;
      }
    });
  }
}