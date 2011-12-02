(function() {
  var f, root, s;
  if (screen.width < 480) {
    return;
  }
  root = 'http://kvakes.github.com/vera/';
  window.b = document.getElementsByTagName('body')[0];
  window.i = document.getElementById('leo');
  f = document.createElement('script');
  s = document.createElement('script');
  f.type = s.type = 'text/javascript';
  f.src = root + 'js/flipper.js';
  s.src = root + 'js/striker.js';
  b.appendChild(f);
}).call(this);
