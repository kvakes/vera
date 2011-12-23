(function() {
  $(function() {
    var root;
    root = 'http://kvakes.github.com/vera/js/';
    $.getScript(root + 'twitter.js');
    if (screen.width < 480) {
      return;
    }
    return $.getScript(root + 'flipper.js');
  });
}).call(this);
