var storage, stations, preset;

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
  
  var buttons = document.querySelectorAll('.preset button');
  for (i = 0; i < buttons.length; i++) {
    if (storage.getItem(buttons[i].id) !== undefined) {
      buttons[i].innerHTML = stations[storage.getItem(buttons[i].id)].station;
    }
    buttons[i].addEventListener('click', presetSelect);
  }
});
xhttp.open('GET', 'stations.json', true);
xhttp.overrideMimeType('application/json');
xhttp.send();

preset = false;

function randy() {
  return '?randy=' + Math.round(Math.random() * 100000000);
}

function tuneStation(x, retry) {
  lcd.error(false);
  lcd.tune(true);
  document.getElementById("off").innerHTML = 'Off';
  display.load(stations[x].station);
  document.title = stations[x].station;
  presetActive(false);
  storage.setItem('current', x);

  if(retry) {
    player1.unload();
    player2.load(stations[x]);
  } else {
    player2.unload();
    player1.load(stations[x]);
  }
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
  //lcd.error(false);
  //lcd.tune(false); // fades in...

  player1.create();
  player2.create();
  display.create();
  visualizer.preload();

  document.getElementById('off').addEventListener('click', function() {
    if(player1.source.getAttribute("src") || player2.source.getAttribute("src")) {
      player1.unload();
      player2.unload();

      lcd.error(false);
      lcd.tune(false);
      document.getElementById("off").innerHTML = 'On';
      display.unload();
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
    if((player1.source.getAttribute("src") || player2.source.getAttribute("src")) && !preset) {
      presetActive(true);
    } else {
      presetActive(false);
    }
  });
});