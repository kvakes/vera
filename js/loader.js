(function() {
  $(function() {
    var root;
    root = 'http://localhost:8888/js/';
    $.getScript(root + 'twitter.js');
    if (screen.width < 480) {
      return;
    }
    $.getScript(root + 'flipper.js');
    return $.getScript(root + 'striker.js');
  });
}).call(this);
