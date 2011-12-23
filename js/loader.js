(function() {
  $(function() {
    var root;
    root = 'http://kvakes.github.com/vera/js/';
    $.getScript(root + 'twitter.js');
    if (screen.width < 480) {
      return;
    }
    $.getScript(root + 'flipper.js');
    return $.getScript(root + 'striker.js');
  });
}).call(this);
