var element = {
  create: function(type, data) {
    var element = document.createElementNS("http://www.w3.org/2000/svg", type);
    
    if (data) {
      for (var key in data.attributes) {
        element.setAttribute(key, data.attributes[key]);
      }
  
      if(data.parent) {
        data.parent.appendChild(element);
      }
    }

    return element;
  }
}

var display = {
  chart: {
    0: ['a','b','c','d','e','f'],
    1: ['b','c'],
    2: ['a','b','d','e','g'],
    3: ['a','b','c','d','g'],
    4: ['b','c','f','g'],
    5: ['a','c','d','f','g'],
    6: ['a','c','d','e','f','g'],
    7: ['a','b','c'],
    8: ['a','b','c','d','e','f','g'],
    9: ['a','b','c','d','f','g']
  },
  create: function() {
    var lcd = document.getElementById('lcd');
  
    var svg = element.create('svg', {
      parent: lcd,
      attributes: {
        height: '48px',
        width: '138px'
      }
    });
    element.create('circle', {
      parent: svg,
      attributes: {
        cx: '101',
        cy: '43',
        r: '3.25',
        id: 'dp'
      }
    });
  
    for(p = 0; p < 4; p++) {
      var offset = 108 - (43 * p);
  
      var prnt = element.create('g', {
        parent: svg,
        attributes: {
          height: '48px',
          width: '31px',
          transform: 'translate('+ offset +',0) scale(0.25)'
        }
      });

      var path = {
        a: 'M33 8c-9 0-16.5 7.2-17 16l-.1 2.7 19.9 2L36 24h54.8l5.7-16z',
        b: 'M102.8 8.2l-7 19.6-3 52 14.7 8.5 5.2-6L116 24c.4-8.2-5.3-14.8-13.2-15.8z',
        c: 'M107.5 95.2l-16 9.3-2.9 52 7.3 26.7c6.6-2 11.7-8 12-15.2l3.8-67.8z',
        d: 'M31.4 168L8 170.2c.7 7.8 7 13.8 15 13.8H90l-4.4-16z',
        e: 'M16.6 96l-4.9 5.6-3.5 62.6 20.1-2 3.2-57.7z',
        f: 'M15.5 32.7l-2.8 51.8 4 4.5 16.2-9.5 2.5-44.9z',
        g: 'M37.2 84l-14.6 8.4 13 7.6h51.7l14.2-8.2L88.1 84z'
      }

      var segm = this.chart[8]
      if(p === 3) {
        segm = this.chart[1];
      }

      segm.forEach((s) => {
        element.create('path', {
          parent: prnt,
          attributes: {
            d: path[s],
            id: s + p
          }
        });
      });
    }
  },
  load: function(strg) {
    this.unload();

    var numb = strg.replace('.','').split('').reverse();
    numb.forEach((c, p) => {
      var mask = this.chart[c];
    
      mask.forEach((s) => {
        document.getElementById(s + p).classList.add('lit');
      });
    });
    document.getElementById('dp').classList.add('lit');
  },
  unload: function() {
    for(p = 0; p < 4; p++) {
      var segm = this.chart[8]
      if(p === 3) {
        segm = this.chart[1];
      }

      segm.forEach((s) => {
        document.getElementById(s + p).classList.remove('lit');
      });
    }
    document.getElementById('dp').classList.remove('lit');
  }
}