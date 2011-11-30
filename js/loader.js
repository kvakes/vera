(function() {
  var f, s;
  if (screen.width < 480) {
    return;
  }
  window.b = document.getElementsByTagName('body')[0];
  window.i = document.getElementById('leo');
  f = document.createElement('script');
  s = document.createElement('script');
  f.type = s.type = 'text/javascript';
  f.src = 'js/flipper.js';
  s.src = 'js/striker.js';
  b.appendChild(f);
}).call(this);
