var led = {
  lit: '#54d454',
  warn: '#f33c3c',
  off: '#121214',
  tune: function(state) {
    if(state) {
      document.getElementById('tune').style.color = this.lit;
    } else {
      document.getElementById('tune').style.color = this.off;
    }
  },
  error: function(state) {
    if(state) {
      document.getElementById('error').style.color = this.warn;
    } else {
      document.getElementById('error').style.color = this.off;
    }
  },
  color: function(hex) {
    this.lit = hex;
    display.load(stations[storage.getItem('current')].station);
  }
}

var player1 = {
  create: function() {
    this.audio = document.createElement("audio");
    this.audio.setAttribute("preload", "none");
    this.audio.setAttribute("crossorigin", "anonymous");

    this.source = document.createElement("source");
    this.source.addEventListener("error", function(e) {
      tuneStation(storage.getItem('current'), true);
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
      led.tune(false);
      
      this.audio.captureStream = this.audio.captureStream || this.audio.mozCaptureStream;
      var stream = this.audio.captureStream();
      this.media = context.createMediaStreamSource(stream);
      this.media.connect(analyser);
    };
  },
  unload: function() {
    this.source.removeAttribute("src");
    this.source.removeAttribute("type");
    try { this.audio.removeChild(this.source); } catch {}
    this.audio.load();
  }
}

var player2 = {
  create: function() {
    this.audio = document.createElement("audio");
    this.audio.setAttribute("preload", "none");

    this.source = document.createElement("source");
    this.source.addEventListener("error", function(e) {
      led.error(true);
      led.tune(false);
    });
  },
  load: function(station) {
    this.source.setAttribute("src", station.source + randy());
    this.source.setAttribute("type", station.type);
    this.audio.appendChild(this.source);
    this.audio.load();
    this.audio.oncanplay = function() {
      player2.audio.play();
      led.tune(false);
    };
  },
  unload: function() {
    this.source.removeAttribute("src");
    this.source.removeAttribute("type");
    try { this.audio.removeChild(this.source); } catch {}
    this.audio.load();
  }
}