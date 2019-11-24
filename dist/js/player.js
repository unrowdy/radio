var settings = {
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

var lcd = {
  tune: function(state) {
    if(state) {
      document.getElementById('tune').style.color = settings.colors.on;
    } else {
      document.getElementById('tune').style.color = settings.colors.off;
    }
  },
  error: function(state) {
    if(state) {
      document.getElementById('error').style.color = settings.colors.error;
    } else {
      document.getElementById('error').style.color = settings.colors.off;
    }
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
    visualizer.stop();
    
    this.source.setAttribute("src", station.source + randy());
    this.source.setAttribute("type", station.type);
    this.audio.appendChild(this.source);
    this.audio.load();
    this.audio.oncanplay = () => {
      this.audio.play();
      lcd.tune(false);
      
      this.audio.captureStream = this.audio.captureStream || this.audio.mozCaptureStream;
      var stream = this.audio.captureStream();
      this.media = context.createMediaStreamSource(stream);
      this.media.connect(analyser);
      
      visualizer.create();
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

var player2 = {
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