(function() {
  var Branch, Impact, Lightning, init;

  Impact = function(x, y) {
    return this.r = 10;
  };

  Impact.prototype = {
    render: function() {
      return this;
    }
  };

  Branch = function(lightning, start, vector) {
    this.lightning = lightning;
    this.start = start;
    this.vector = vector;
    this.branchTime = 100;
    this.colorSteps = 20;
    this.age = 1;
    this.ctx = this.lightning.ctx;
    this.ctx.strokeStyle = 'rgba(123,85,211,0.2)';
    this.lines = [];
    this.draw();
    return this.lightning.branches += 1;
  };

  Branch.prototype = {
    mix: function(value) {
      return value - Math.random() * value * 2;
    },
    draw: function() {
      var ds, f, l, s, segments, v;
      segments = Math.max(20, Math.sqrt(this.vector[0] * this.vector[0] + this.vector[1] * this.vector[1]) / 10);
      s = [this.start[0], this.start[1]];
      v = [this.vector[0], this.vector[1]];
      l = v[0] * v[0] + v[1] * v[1];
      f = [s[0] + v[0], s[0] + v[0]];
      this.ctx.beginPath();
      this.ctx.moveTo(s[0], s[1]);
      console.log(v);
      while (l > (s[0] - this.start[0]) * (s[0] - this.start[0]) + (s[1] - this.start[1]) * (s[1] - this.start[1])) {
        ds = [s[0] + (f[0] - this.start[0]) / segments + this.mix(5), s[1] + (f[1] - this.start[1]) / segments + this.mix(5)];
        this.ctx.lineTo(ds[0], ds[1]);
        s = [ds[0], ds[1]];
        v = [f[0] - ds[0], f[1] - ds[1]];
      }
      return this.ctx.stroke();
    }
  };

  Lightning = function() {
    this.branches = 0;
    this.maxBranches = 50;
    this.active = false;
    this.start = [500, 500];
    this.render = function(finish) {
      var strike, that;
      this.duration = Math.random() * 5000;
      this.vector = [finish[0] - this.start[0], finish[1] - this.start[1]];
      this.active = true;
      that = this;
      strike = window.setInterval(function() {
        var b;
        return b = new Branch(that, that.start, that.vector);
      }, 5);
      return window.setTimeout(function() {
        this.active = false;
        return window.clearInterval(strike);
      }, this.duration);
    };
    this.updateCoordinates = function(finish) {
      return this.vector = [finish[0] - this.start[0], finish[1] - this.start[1]];
    };
    this.init = function(ctx) {
      return this.ctx = ctx;
    };
    return true;
  };

  init = function() {
    var $body, $canvas, canvas, ctx, l;
    $body = $('body');
    $canvas = $('<canvas id="lightning">');
    $canvas.appendTo($body).attr('width', $body.width()).attr('height', $body.height());
    canvas = $canvas[0];
    ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'lighter';
    l = new Lightning();
    l.init(ctx);
    $(window).click(function(e) {
      return l.render([e.pageX, e.pageY]);
    });
    return $(window).mousemove(function(e) {
      return l.updateCoordinates([e.pageX, e.pageY]);
    });
  };

  $(function() {
    return init();
  });

}).call(this);
