var context, analyser;

// get those two ^ vars moved in

var visualizer = {
  preload: function() {
    this.canvas = document.getElementById('frequency');
    this.ctx = this.canvas.getContext('2d');

    var values = new Array(10).fill(0);

    values.forEach((val, key) => {
      this.ctx.fillStyle = '#121214';
      this.ctx.fillRect(key * 22, this.canvas.height, 16, -this.canvas.height);
    });

    this.ctx.fillStyle = '#030303';
    this.ctx.fillRect(0, this.canvas.height -6, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -12, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -18, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -24, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -30, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -36, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -42, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -48, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -54, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -60, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -66, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -72, this.canvas.width, 2);
  },
  create: function() {
    if(!this.created) {
      this.created = true;

      context = new AudioContext();
      analyser = context.createAnalyser();
      this.data = new Uint8Array(analyser.frequencyBinCount);

      analyser.connect(context.destination);

      this.load();
    }
  },
  load: function() {
    var len = analyser.frequencyBinCount;
    var values = new Array(10).fill(0);
    var counts = new Array(10).fill(0);

    analyser.getByteFrequencyData(this.data);
    var bob = this.data.slice(1);

    bob.forEach((valu, i) => {
      var step = 9 - Math.floor(Math.log2(len / (i+2)));

      values[step] += valu;
      counts[step] += 1;
    });
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    values.forEach((val, key) => {
      var avg = Math.round(val / counts[key]);
      var mag = Math.round((avg * avg) * (this.canvas.height / (255 * 255)));

      mag = Math.round(mag / 6) * 6;

      this.ctx.fillStyle = '#121214';
      this.ctx.fillRect(key * 22, this.canvas.height, 16, -this.canvas.height);
      this.ctx.fillStyle = led.lit;
      this.ctx.fillRect(key * 22, this.canvas.height, 16, -mag);
    });
    
    this.ctx.fillStyle = '#030303';
    this.ctx.fillRect(0, this.canvas.height -6, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -12, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -18, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -24, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -30, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -36, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -42, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -48, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -54, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -60, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -66, this.canvas.width, 2);
    this.ctx.fillRect(0, this.canvas.height -72, this.canvas.width, 2);
    
    window.requestAnimationFrame(this.load.bind(this));
  }
}