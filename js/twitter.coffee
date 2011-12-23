$ ->
  twitter_user = 'tolstoy_lev'
  $container = $('<div class="tweet"></div>').appendTo $ '#tw'
  # Get a tweet
  $.getJSON 'https://api.twitter.com/1/statuses/user_timeline.json?screen_name='+twitter_user+'&count=1&callback=?', (data) ->
    if data[0]?
      tweet = data[0]
      # Find links in text and replace them
      urlify = (text) ->
        text.replace /(https?:\/\/[^\s]+)/g, (url) ->
          '<a href="' + url + '">' + url + '</a>'
      
      html = urlify tweet.text
      
      # Find the year
      year = 0
      ## Check if it the year is in Leo's lifetime 1928-1910
      isInLifespan = (y) ->
        if y >= 1828 and y <= 1910
          return true
        else
          return false
      
      iterateSearch = (list) ->
        for y in list
          n = y.replace '#', ''
          if isInLifespan(y) and y > year
            year = y
          
      ## First try to just find digit
      if yrs = tweet.text.match /\d{4}/g
        iterateSearch yrs
      ## Then hashtag, prefer hashtag over just a year
      if yrs = tweet.text.match /#\d{4}/
        iterateSearch yrs
      
      ## Date
      months = [
        'Января'
        'Февраля'
        'Марта'
        'Апреля'
        'Мая'
        'Июня'
        'Июля'
        'Августа'
        'Сентября'
        'Октября'
        'Ноября'
        'Декабря'
      ]
      
      date = new Date(tweet.created_at)
      
      tweet_url = 'http://twitter.com/'+twitter_user+'/status/'+tweet.id_str
      
      $container.html '<blockquote cite="'+tweet_url+'"><p>'+html+'</p><footer><span>&mdash; <a href="'+tweet_url+'">'+tweet.user.name+', '+tweet.user.location+'</a></span><span>'+date.getDate()+' '+months[date.getMonth()]+(if year isnt 0 then ' '+year else '')+'</span></footer></blockquote>'