$img = $ '#leo'

# Flip an image
flipper = false
$('body').mousemove (e) ->
  if e.pageX <= $img.offset().left + $img.width() / 2 and !$img.hasClass 'flipped'
    window.clearTimeout flipper
    flipper = window.setTimeout ->
      $img.addClass 'flipped'
    , 2000
  else if e.pageX > $img.offset().left + $img.width() / 2 and $img.hasClass 'flipped'
    window.clearTimeout flipper
    flipper = window.setTimeout ->
      $img.removeClass 'flipped'
    , 2000
  else
    window.clearTimeout flipper

# Don't change state when window is not active
$(window).blur ->
  window.clearTimeout flipper