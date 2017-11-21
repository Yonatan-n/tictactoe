(function() {
  var canvasSize, gridMoves, gridSign, turn, won;

  canvasSize = 300;

  turn = 0;

  won = false;

  gridMoves = [];

  gridSign = [9, 9, 9, 9, 9, 9, 9, 9, 9];

  $(function() {
    var canvas, checkIfIn, checkIfWon, ctx, doMouseDown, drawCircle, drawGrid, drawLine, drawSWC, initialise;
    initialise = function() {
      var canvas;
      canvas = document.getElementById("myCanvas");
      return canvas.addEventListener("mousedown", doMouseDown, false);
    };
    doMouseDown = function(event) {
      var X, Y, s, temp;
      if (won === false) {
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
        if (checkIfIn(s) === true) {
          temp = (s[1] * 3) + (s[0] % 3);
          gridMoves.push(s);
          if (turn % 2 === 0) {
            drawSWC(s[0], s[1]);
            gridSign[temp] = 1;
          } else if (turn % 2 === 1) {
            drawCircle(s[0], s[1]);
            gridSign[temp] = 0;
          }
          turn += 1;
          console.log(gridSign);
        }
        checkIfWon();
        return s;
      }
    };
    checkIfIn = function(s) {
      var j, len, sqr;
      for (j = 0, len = gridMoves.length; j < len; j++) {if (window.CP.shouldStopExecution(1)){break;}
        sqr = gridMoves[j];
        if (JSON.stringify(s) === JSON.stringify(sqr)) {
          return false;
        }
      }
window.CP.exitedLoop(1);

      return true;
    };
    checkIfWon = function() {
      var i, j, results;
      if (gridSign[0] + gridSign[4] + gridSign[8] === 3) {
        drawLine(0, 0, 300, 300, "#CF0C23", 16);
        won = true;
        console.log("X has won");
      } else if (gridSign[2] + gridSign[4] + gridSign[6] === 3) {
        drawLine(300, 0, 0, 300, "#CF0C23", 16);
        won = true;
        console.log("X has won");
      } else if (gridSign[0] + gridSign[4] + gridSign[8] === 0) {
        drawLine(0, 0, 300, 300, "#0CB09D", 16);
        won = true;
        console.log("O has won");
      } else if (gridSign[2] + gridSign[4] + gridSign[6] === 0) {
        drawLine(0, 300, 300, 0, "#0CB09D", 16);
        won = true;
        console.log("O has won");
      }
      results = [];
      for (i = j = 0; j <= 8; i = j += 3) {if (window.CP.shouldStopExecution(2)){break;}
        if (gridSign[0 + i] + gridSign[1 + i] + gridSign[2 + i] === 3) {
          drawLine(0, (Math.floor(i / 3)) * 100 + 50, 300, (Math.floor(i / 3)) * 100 + 50, "#CF0C23", 16);
          won = true;
          results.push(console.log("X has won"));
        } else if (gridSign[0 + i] + gridSign[1 + i] + gridSign[2 + i] === 0) {
          drawLine(0, (Math.floor(i / 3)) * 100 + 50, 300, (Math.floor(i / 3)) * 100 + 50, "#0CB09D", 16);
          won = true;
          results.push(console.log("O has won"));
        } else if (gridSign[0 + (Math.floor(i / 3))] + gridSign[3 + (Math.floor(i / 3))] + gridSign[6 + (Math.floor(i / 3))] === 3) {
          drawLine((Math.floor(i / 3)) * 100 + 50, 0, (Math.floor(i / 3)) * 100 + 50, 300, "#CF0C23", 16);
          won = true;
          results.push(console.log("X has won"));
        } else if (gridSign[0 + (Math.floor(i / 3))] + gridSign[3 + (Math.floor(i / 3))] + gridSign[6 + (Math.floor(i / 3))] === 0) {
          drawLine((Math.floor(i / 3)) * 100 + 50, 0, (Math.floor(i / 3)) * 100 + 50, 300, "#0CB09D", 16);
          won = true;
          results.push(console.log("O has won"));
        } else {
          results.push(void 0);
        }
      }
window.CP.exitedLoop(2);

      return results;
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
    return console.log("end of initalise");
  });

}).call(this);
