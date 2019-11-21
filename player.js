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
    
    if(!this.media) {
      this.audio.captureStream = this.audio.captureStream || this.audio.mozCaptureStream;
      var stream = this.audio.captureStream();
      this.media = context.createMediaStreamSource(stream);
      this.media.connect(analyser);
    }

    this.source.setAttribute("src", station.source + randy());
    this.source.setAttribute("type", station.type);
    this.audio.appendChild(this.source);
    this.audio.load();
    this.audio.oncanplay = function() {
      player1.audio.play();
      document.getElementById('tune').style.color = '#121214';
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
      document.getElementById('error').style.color = '#f33c3c';
      document.getElementById('tune').style.color = '#121214';
    });
  },
  load: function(station) {
    this.source.setAttribute("src", station.source + randy());
    this.source.setAttribute("type", station.type);
    this.audio.appendChild(this.source);
    this.audio.load();
    this.audio.oncanplay = function() {
      player2.audio.play();
      document.getElementById('tune').style.color = '#121214';
    };
  },
  unload: function() {
    this.source.removeAttribute("src");
    this.source.removeAttribute("type");
    try { this.audio.removeChild(this.source); } catch {}
    this.audio.load();
  }
}