var storage, stations, audio, source, preset;

storage = {
  getItem: function(x) {
    if(typeof localStorage === 'object') {
      var number = parseInt(localStorage.getItem(x));
      if (isNaN(number)) number = undefined;
      return number;
    } else {
      return this[x];
    }
  },
  setItem: function(x, y) {
    if(typeof localStorage === 'object') {
      localStorage.setItem(x, y);
    } else {
      this[x] = y;
    }
  }
};

if (storage.getItem('current') === undefined) {
  storage.setItem('current', -1);
}

var xhttp = new XMLHttpRequest();
xhttp.addEventListener( 'load', function () {
  stations = JSON.parse(this.responseText);
});
xhttp.open('GET', 'stations.json', true);
xhttp.overrideMimeType('application/json');
xhttp.send();

preset = false;

function tuneStation(x) {
  source.setAttribute("src", stations[x].source);
  source.setAttribute("type", stations[x].type);
  audio.appendChild(source);
  audio.load();
  document.getElementById('error').style.opacity = '0';
  document.getElementById('tune').style.opacity = '1';
  document.getElementById("display").innerHTML = stations[x].station;
  document.getElementById("off").innerHTML = 'Off';
  document.title = stations[x].station;
  presetActive(false);
  storage.setItem('current', x);
  audio.oncanplay = function() {
    audio.play();
    document.getElementById('tune').style.opacity = '0';
  };
}

function presetActive(active) {
  preset = active;
  var buttons = document.querySelectorAll('.preset button');
  for (i = 0; i < buttons.length; i++) {
    if (active) {
      buttons[i].className = 'blink';
    } else {
      buttons[i].className = '';
    }
  }
}

function presetSelect(e) {
  if (preset) {
    storage.setItem(e.target.id, storage.getItem('current'));
    presetActive(false);
    e.target.innerHTML = stations[storage.getItem('current')].station;
  } else if (storage.getItem(e.target.id) !== undefined) {
    tuneStation(storage.getItem(e.target.id));
  }
}

window.addEventListener('load', function() {
  audio = document.createElement("audio");
  audio.setAttribute("preload", "none");
  document.body.appendChild(audio);
  audio.addEventListener("error", function(e) {
    document.getElementById('error').style.opacity = '1';
    document.getElementById('tune').style.opacity = '0';
  });

  source = document.createElement("source");
  source.addEventListener("error", function(e) {
    document.getElementById('error').style.opacity = '1';
    document.getElementById('tune').style.opacity = '0';
  });

  document.getElementById('off').addEventListener('click', function() {
    if(source.getAttribute("src")) {
      source.removeAttribute("src");
      source.removeAttribute("type");
      audio.removeChild(source);
      audio.load();
      document.getElementById('error').style.opacity = '0';
      document.getElementById('tune').style.opacity = '0';
      document.getElementById("display").innerHTML = '';
      document.getElementById("off").innerHTML = 'On';
      document.title = 'Radio';
      presetActive(false);
    } else {
      var current = storage.getItem('current');
      if (current === -1) current = 0;
      tuneStation(current);
      storage.setItem('current', current);
    }
  });

  document.getElementById('prev').addEventListener('click', function() {
    var current = storage.getItem('current') - 1;
    if (current < 0) current = stations.length - 1;
    tuneStation(current);
    storage.setItem('current', current);
  });

  document.getElementById('next').addEventListener('click', function() {
    var current = storage.getItem('current') + 1;
    if (current === stations.length) current = 0;
    tuneStation(current);
    storage.setItem('current', current);
  });

  document.getElementById('set').addEventListener('click', function() {
    if(source.getAttribute("src") && !preset) {
      presetActive(true);
    } else {
      presetActive(false);
    }
  });
  
  var buttons = document.querySelectorAll('.preset button');
  for (i = 0; i < buttons.length; i++) {
    if (storage.getItem(buttons[i].id) !== undefined) {
      buttons[i].innerHTML = stations[storage.getItem(buttons[i].id)].station;
    }
    buttons[i].addEventListener('click', presetSelect);
  }
});