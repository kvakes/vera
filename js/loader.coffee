$ ->
  root = 'http://kvakes.github.com/vera/js/' # in production should be http://kvakes.github.com/vera/js/
  
  # All versions
  $.getScript root + 'twitter.js'
  
  # Only desktop
  if screen.width < 480
    return

  $.getScript root + 'flipper.js'
  $.getScript root + 'striker.js'