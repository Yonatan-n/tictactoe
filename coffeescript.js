(function() {
  var canvasSize, gridMoves, turn;

  canvasSize = 300;

  turn = 0;

  gridMoves = [];

  $(function() {
    var canvas, checkIfIn, ctx, doMouseDown, drawCircle, drawGrid, drawLine, drawSWC, initialise;
    initialise = function() {
      var canvas;
      canvas = document.getElementById("myCanvas");
      return canvas.addEventListener("mousedown", doMouseDown, false);
    };
    doMouseDown = function(event) {
      var X, Y, s;
      X = event.pageX;
      Y = event.pageY;
      s = [0, 0];
      if (X > 10 && X < 105) {
        s[0] = 0;
        if (Y > 10 && Y < 105) {
          s = [0, 0];
        } else if (Y > 110 && Y < 205) {
          s[1] = 1;
        } else if (Y > 210 && Y < 305) {
          s[1] = 2;
        }
      } else if (X > 110 && X < 205) {
        s[0] = 1;
        if (Y > 10 && Y < 105) {
          s[1] = 0;
        } else if (Y > 110 && Y < 205) {
          s[1] = 1;
        } else if (Y > 210 && Y < 305) {
          s[1] = 2;
        }
      } else if (X > 210 && X < 305) {
        s[0] = 2;
        if (Y > 10 && Y < 105) {
          s[1] = 0;
        } else if (Y > 110 && Y < 205) {
          s[1] = 1;
        } else if (Y > 210 && Y < 305) {
          s[1] = 2;
        }
      }
      console.log(s);
      if (checkIfIn(s) === true) {
        gridMoves.push(s);
        console.log(gridMoves);
        if (turn % 2 === 0) {
          drawSWC(s[0], s[1]);
        } else if (turn % 2 === 1) {
          drawCircle(s[0], s[1]);
        }
        turn += 1;
        console.log(s);
      }
      return s;
    };
    checkIfIn = function(s) {
      var i, len, sqr;
      for (i = 0, len = gridMoves.length; i < len; i++) {if (window.CP.shouldStopExecution(1)){break;}
        sqr = gridMoves[i];
        if (JSON.stringify(s) === JSON.stringify(sqr)) {
          return false;
        }
      }
window.CP.exitedLoop(1);

      return true;
    };

    /*drawMove = (s) ->
    		if s not in gridMoves
    			gridMoves.push(s)
    			if turn % 2 == 0 then drawSWC(s[0], s[1])
    			else if turn % 2 == 1 then drawCircle(s[0], s[1])
    			turn += 1
    			console.log s
     */
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
    initialise();

    /*ctx.font = '30px Arial'
    ctx.fillStyle = 'white'
    ctx.fillText("works", 40, 150)
     */
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

    /*
    		drawCircle(1,1)
    		drawCircle(0,0)
    		drawCircle(2,1)
    		drawCircle(1,2)
    		drawSWC(1,0)
    		drawSWC(2,0)
    		drawSWC(2,2)
    		drawSWC(0,1)
    		drawSWC(0,2)
     */
    return console.log("end of initalise");
  });

}).call(this);
