# Impact zone #
Impact = (x, y) ->
  # settings
  @.r = 10# radius

Impact.prototype =
  render : ->
    @

# Ligtning branches #
Branch = (lightning, start, vector) ->
  @lightning = lightning
  # coordinates
  @start = start
  @vector = vector
  # settings
  @branchTime = 100# branch timespan, ms
  @colorSteps = 20# how many color steps a branch has in a lifetime
  @age = 1
  # color
  @ctx = @lightning.ctx
  @ctx.strokeStyle = 'rgba(123,85,211,0.2)'
  
  # save segments line coordinates to age the branch
  @lines = []
  # commence
  @draw()
  @lightning.branches += 1

Branch.prototype =
  mix : (value) ->
    # this function returns value in range from -value to +value
    value - Math.random() * value * 2
  draw : ->
    # how many segments this branch has
    segments = Math.max 20, (Math.sqrt(@vector[0] * @vector[0] + @vector[1] * @vector[1]) / 10)
    # define first local segment coordinates
    s = [@start[0], @start[1]]
    # vector (randomize finish coordinate)
    v = [@vector[0], @vector[1]]
    # straight vector pseudo-length
    l = v[0] * v[0] + v[1] * v[1]
    # finish coordinate
    f = [s[0] + v[0], s[0] + v[0]]
    
    # move our virtual brush to start position
    @ctx.beginPath()
    @ctx.moveTo s[0], s[1]
    
    console.log v

    while l > (s[0] - @start[0]) * (s[0] - @start[0]) + (s[1] - @start[1]) * (s[1] - @start[1])
      ds = [s[0] + (f[0] - @start[0]) / segments + @mix(5), s[1] + (f[1] - @start[1]) / segments + @mix(5)]
      @ctx.lineTo ds[0], ds[1]
      s = [ds[0], ds[1]]
      v = [f[0] - ds[0], f[1] - ds[1]]

    @ctx.stroke()
    

Lightning = ->
  # settings
  @branches = 0#branch count
  @maxBranches = 50# how many branches to render at once
  # state
  @active = no
  # coordinates
  @start = [500, 500]

  @render = (finish) ->
    @duration = Math.random() * 5000# animation duration
    @vector = [finish[0] - @start[0], finish[1] - @start[1]]
    @active = yes
    that = this
    strike = window.setInterval ->
      #if that.branches < that.maxBranches
      b = new Branch that, that.start, that.vector
    , 5
    window.setTimeout ->
      @active = no
      window.clearInterval strike
    , @duration
  
  @updateCoordinates = (finish) ->
    @vector = [finish[0] - @start[0], finish[1] - @start[1]]

  @init = (ctx) ->
    @ctx = ctx
  
  on # needed for correct constructor behavior: 1st quirk of coffeescript

init = ->
  # init
  $body = $ 'body'
  $canvas = $ '<canvas id="lightning">'
  $canvas.appendTo($body).attr('width', $body.width()).attr 'height', $body.height()
  canvas = $canvas[0]
  ctx = canvas.getContext '2d'
  ctx.globalCompositeOperation = 'lighter'

  # init lightning
  l = new Lightning()
  l.init ctx
  
  # events
  $(window).click (e) ->
    l.render [e.pageX, e.pageY]
  
  $(window).mousemove (e) ->
    l.updateCoordinates [e.pageX, e.pageY]

$ ->
  init()