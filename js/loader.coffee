$ ->
  root = 'http://localhost:8888/js/' # in production should be http://kvakes.github.com/vera/js/

  # Only desktop
  if screen.width < 480
    return

  $.getScript root + 'flipper.js'
  $.getScript root + 'striker.js'