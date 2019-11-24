// storage.js

export let storage = {
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