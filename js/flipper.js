(function() {
  var $img, flipper;
  $img = $('#leo');
  flipper = false;
  $('body').mousemove(function(e) {
    if (e.pageX <= $img.offset().left + $img.width() / 2 && !$img.hasClass('flipped')) {
      window.clearTimeout(flipper);
      return flipper = window.setTimeout(function() {
        return $img.addClass('flipped');
      }, 2000);
    } else if (e.pageX > $img.offset().left + $img.width() / 2 && $img.hasClass('flipped')) {
      window.clearTimeout(flipper);
      return flipper = window.setTimeout(function() {
        return $img.removeClass('flipped');
      }, 2000);
    } else {
      return window.clearTimeout(flipper);
    }
  });
  $(window).blur(function() {
    return window.clearTimeout(flipper);
  });
}).call(this);
