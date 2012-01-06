###
This class draws lightning strike. Pretty nice, huh?

Note: all floating points coordinates are rounded in order to optimize animation
###

# Vector utility #
Vector = (x, y) ->
  @x = Math.round x
  @y = Math.round y
  
  @length = Math.round Math.sqrt @x * @x + @y * @y

  @primitive = ->
    [@x, @y]
  @add = (z) ->
    new Vector @x + z.x, @y + z.y
  @subtract = (z) ->
    new Vector @x - z.x, @y - z.y
  @multiply = (m) ->
    new Vector Math.round(@x * m), Math.round(@y * m)
  @twist = (d = 10) -># dispersion 10px
    mess = (v) ->
      v - d / 2 + Math.round d * Math.random()
    @x = mess @x
    @y = mess @y
    @

  @

# Impact zone #
Impact = (x, y) ->
  # settings
  @.r = 10# radius

Impact.prototype =
  render : ->
    @

# Ligtning branches #
Branch = (lightning, start, end) ->
  @l = lightning
  # context
  @ctx = @l.ctx
  @ctx.strokeStyle = 'rgba(123,85,211,0.2)'# default color
  # coordinates
  @start = start
  @end = end
  # newborn branch
  @age = 1
  # commence
  @draw()

Branch.prototype =
  draw : ->
    # new branch, update number of branches
    @l.branches += 1
    # starting point
    s = @start
    # vector
    v = @end.subtract @start
    
    # move our virtual brush to start position
    @ctx.beginPath()
    @ctx.moveTo s.x, s.y
    
    while v.length > 0
      # how many segments this branch has
      segments = Math.max 10, v.length / 10
      # length of one segment
      dv = v.multiply 1 / segments
      # if we close enough, end
      if v.length < 15# funny behavior when dv.length * 5 istead of "15"
        s = @end
      else
        s = s.add(dv).twist()
      @ctx.lineTo s.x, s.y
      v = @end.subtract s

    @ctx.stroke()
    

Lightning = ->
  # settings
  @branches = 0#branch count
  @maxBranches = 1# how many branches to render at once
  @branchTime = 100# branch timespan, ms
  @colorSteps = 20# how many color steps a branch has in a lifetime
  # state
  @active = no
  # coordinates
  @start = new Vector 500, 500

  @render = (end) ->
    @duration = Math.random() * 5000# animation duration
    @active = yes
    @end = end
    that = this
    strike = window.setInterval ->
      #if that.branches < that.maxBranches
      b = new Branch that, that.start, that.end
    , 5
    window.setTimeout ->
      @active = no
      window.clearInterval strike
    , @duration
  
  @updateEndCoordinates = (end) ->
    @end = end

  @init = (ctx) ->
    @ctx = ctx
  
  on

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
    l.render new Vector e.pageX, e.pageY
  
  $(window).mousemove (e) ->
    l.updateEndCoordinates new Vector e.pageX, e.pageY

$ ->
  init()