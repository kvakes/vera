body = window.b
img = window.i

# Flip an image
flipper = false
body.addEventListener 'mousemove', (e) ->
  if e.pageX <= img.offsetLeft + img.width/2 and 'flipped' not in img.classList
    window.clearTimeout flipper
    flipper = window.setTimeout ->
      img.className = 'flipped'
    , 2000
  else if e.pageX > img.offsetLeft + img.width/2 and 'flipped' in img.classList
    window.clearTimeout flipper
    flipper = window.setTimeout ->
      img.className = ''
    , 2000
  else
    window.clearTimeout flipper
, false

# Don't change state when window is not active
window.addEventListener 'blur', ->
  window.clearTimeout flipper