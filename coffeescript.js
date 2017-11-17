(function() {
  var canvasSize;

  canvasSize = 300;

  $(function() {
    var canvas, ctx, drawCircle, drawGrid, drawLine, drawSWC, mousePos;
    mousePos = function(evt) {
      var mouseX, mouseY, rect, root;
      rect = canvas.getBoundingClientRect();
      root = document.documentElement;
      mouseX = evt.clientX - rect.left - root.scrollLeft;
      mouseY = evt.clientY - rect.top - root.scrollTop;
      console.log([mouseX, mouseY]);
      return {
        x: mouseX,
        y: mouseY
      };
    };
    drawLine = function(x0, y0, x1, y1, color, lineWidth) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
      ctx.stroke();
      return ctx.closePath();
    };
    canvas = $('#myCanvas')[0];
    canvas.width = canvas.height = canvasSize;
    ctx = canvas.getContext('2d');
    ctx.fillStyle = '#002b36';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    drawGrid = function() {
      var c, t;
      c = "white";
      t = 2;
      drawLine(0, 100, 300, 100, c, t);
      drawLine(0, 200, 300, 200, c, t);
      drawLine(100, 0, 100, 300, c, t);
      return drawLine(200, 0, 200, 300, c, t);
    };
    drawCircle = function(x, y) {
      ctx.beginPath();
      ctx.arc(x * 100 + 50, y * 100 + 50, 40, 0, 2 * Math.PI);
      ctx.strokeStyle = "#0CB09D";
      ctx.lineWidth = 5;
      ctx.stroke();
      return ctx.closePath();
    };
    drawSWC = function(x, y) {
      var p;
      p = 15;
      drawLine(x * 100 + p, y * 100 + p, x * 100 + 100 - p, y * 100 + 100 - p, "#CF0C23", 5);
      return drawLine(x * 100 + p, y * 100 + 100 - p, x * 100 + 100 - p, y * 100 + p, "#CF0C23", 5);
    };
    drawGrid();
    drawCircle(1, 1);
    drawCircle(0, 0);
    drawSWC(1, 0);
    return drawSWC(2, 0);
  });

}).call(this);

