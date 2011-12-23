(function() {
  $(function() {
    var $container, twitter_user;
    twitter_user = 'tolstoy_lev';
    $container = $('<div class="tweet"></div>').appendTo($('#tw'));
    return $.getJSON('https://api.twitter.com/1/statuses/user_timeline.json?screen_name=' + twitter_user + '&count=1&callback=?', function(data) {
      var date, html, isInLifespan, iterateSearch, months, tweet, tweet_url, urlify, year, yrs;
      if (data[0] != null) {
        tweet = data[0];
        urlify = function(text) {
          return text.replace(/(https?:\/\/[^\s]+)/g, function(url) {
            return '<a href="' + url + '">' + url + '</a>';
          });
        };
        html = urlify(tweet.text);
        year = 0;
        isInLifespan = function(y) {
          if (y >= 1828 && y <= 1910) {
            return true;
          } else {
            return false;
          }
        };
        iterateSearch = function(list) {
          var n, y, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = list.length; _i < _len; _i++) {
            y = list[_i];
            n = y.replace('#', '');
            console.log(n);
            _results.push(isInLifespan(y) && y > year ? year = y : void 0);
          }
          return _results;
        };
        if (yrs = tweet.text.match(/\d{4}/g)) {
          console.log(1);
          iterateSearch(yrs);
        }
        if (yrs = tweet.text.match(/#\d{4}/)) {
          console.log(2);
          iterateSearch(yrs);
        }
        months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
        date = new Date(tweet.created_at);
        tweet_url = 'http://twitter.com/' + twitter_user + '/status/' + tweet.id_str;
        console.log(year);
        return $container.html('<blockquote cite="' + tweet_url + '"><p>' + html + '</p><footer><span>&mdash; <a href="' + tweet_url + '">' + tweet.user.name + ', ' + tweet.user.location + '</a></span><span>' + date.getDate() + ' ' + months[date.getMonth()] + (year !== 0 ? ' ' + year : '') + '</span></footer></blockquote>');
      }
    });
  });
}).call(this);
