
/*
This class draws lightning strike. Pretty nice, huh?

Note: all floating points coordinates are rounded in order to optimize animation
*/

(function() {
  var Branch, Impact, Lightning, Vector, init;

  Vector = function(x, y) {
    this.x = Math.round(x);
    this.y = Math.round(y);
    this.length = Math.round(Math.sqrt(this.x * this.x + this.y * this.y));
    this.primitive = function() {
      return [this.x, this.y];
    };
    this.add = function(z) {
      return new Vector(this.x + z.x, this.y + z.y);
    };
    this.subtract = function(z) {
      return new Vector(this.x - z.x, this.y - z.y);
    };
    this.multiply = function(m) {
      return new Vector(Math.round(this.x * m), Math.round(this.y * m));
    };
    this.twist = function(d) {
      var mess;
      if (d == null) d = 10;
      mess = function(v) {
        return v - d / 2 + Math.round(d * Math.random());
      };
      this.x = mess(this.x);
      this.y = mess(this.y);
      return this;
    };
    return this;
  };

  Impact = function(x, y) {
    return this.r = 10;
  };

  Impact.prototype = {
    render: function() {
      return this;
    }
  };

  Branch = function(lightning, start, end) {
    this.l = lightning;
    this.ctx = this.l.ctx;
    this.ctx.strokeStyle = 'rgba(123,85,211,0.2)';
    this.start = start;
    this.end = end;
    this.age = 1;
    return this.draw();
  };

  Branch.prototype = {
    draw: function() {
      var dv, s, segments, v;
      this.l.branches += 1;
      s = this.start;
      v = this.end.subtract(this.start);
      this.ctx.beginPath();
      this.ctx.moveTo(s.x, s.y);
      while (v.length > 0) {
        segments = Math.max(10, v.length / 10);
        dv = v.multiply(1 / segments);
        if (v.length < 15) {
          s = this.end;
        } else {
          s = s.add(dv).twist();
        }
        this.ctx.lineTo(s.x, s.y);
        v = this.end.subtract(s);
      }
      return this.ctx.stroke();
    }
  };

  Lightning = function() {
    this.branches = 0;
    this.maxBranches = 1;
    this.branchTime = 100;
    this.colorSteps = 20;
    this.active = false;
    this.start = new Vector(500, 500);
    this.render = function(end) {
      var strike, that;
      this.duration = Math.random() * 5000;
      this.active = true;
      this.end = end;
      that = this;
      strike = window.setInterval(function() {
        var b;
        return b = new Branch(that, that.start, that.end);
      }, 5);
      return window.setTimeout(function() {
        this.active = false;
        return window.clearInterval(strike);
      }, this.duration);
    };
    this.updateEndCoordinates = function(end) {
      return this.end = end;
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
      return l.render(new Vector(e.pageX, e.pageY));
    });
    return $(window).mousemove(function(e) {
      return l.updateEndCoordinates(new Vector(e.pageX, e.pageY));
    });
  };

  $(function() {
    return init();
  });

}).call(this);
