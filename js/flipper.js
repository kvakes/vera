(function() {
  var body, flipper, img;
  var __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  body = window.b;
  img = window.i;
  flipper = false;
  body.addEventListener('mousemove', function(e) {
    if (e.pageX <= img.offsetLeft + img.width / 2 && __indexOf.call(img.classList, 'flipped') < 0) {
      window.clearTimeout(flipper);
      return flipper = window.setTimeout(function() {
        return img.className = 'flipped';
      }, 2000);
    } else if (e.pageX > img.offsetLeft + img.width / 2 && __indexOf.call(img.classList, 'flipped') >= 0) {
      window.clearTimeout(flipper);
      return flipper = window.setTimeout(function() {
        return img.className = '';
      }, 2000);
    } else {
      return window.clearTimeout(flipper);
    }
  }, false);
  window.addEventListener('blur', function() {
    return window.clearTimeout(flipper);
  });
}).call(this);
