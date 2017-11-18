canvasSize = 300
turn = 0
#gridMoves = [	[0, 0],[0,1],[0,2],
#			 	[1,0], [1,1], [1,2],
#				[2,0], [2,1], [2,2]]
$ -> # Main Function, Draws Everything
	initialise = () ->
		canvas = document.getElementById("myCanvas")
		canvas.addEventListener("mousedown", doMouseDown, false)
		
	doMouseDown = (event) ->
		X = event.pageX
		Y = event.pageY
		s = [0, 0]
		
		if X > 10 && X < 105 
			s[0] = 0
			if Y > 10 && Y < 105 then	s[1] = 0
			else if Y > 110 && Y < 205 then	s[1] = 1
			else if Y > 210 && Y < 305 then	s[1] = 2 
		else if X > 110 && X < 205
			s[0] = 1
			if Y > 10 && Y < 105 then	s[1] = 0
			else if Y > 110 && Y < 205 then	s[1] = 1
			else if Y > 210 && Y < 305 then	s[1] = 2
		else if X > 210 && X < 305
			s[0] = 2
			if Y > 10 && Y < 105 then s[1] = 0
			else if Y > 110 && Y < 205 then	s[1] = 1
			else if Y > 210 && Y < 305 then	s[1] = 2
		# this parse the right squre ^
		console.log("Mouse: x = #{X}, y = #{Y}, Square #{s} ")
		drawMove(s)
		#whereToDraw(s[0], s[1])
		return s
	
	drawMove = (s) ->
		if turn % 2 == 0 then drawSWC(s[0], s[1])
		else if turn % 2 == 1 then drawCircle(s[0], s[1])
		turn += 1
	drawLine = (x0, y0, x1, y1, color, lineWidth) ->
    	ctx.beginPath()
    	ctx.moveTo(x0,y0)
    	ctx.lineTo(x1,y1)
    	ctx.lineWidth = lineWidth # Global Line Thickness 
    	ctx.strokeStyle = color
    	ctx.stroke()
    	ctx.closePath()
		# ^ end of
		
		#Draw Canvas blueish   
    canvas = $('#myCanvas')[0]
    canvas.width = canvas.height = canvasSize
    ctx = canvas.getContext '2d'
    
    ctx.fillStyle = '#002b36' #055773
    ctx.fillRect(0,0,canvasSize,canvasSize)
    initialise()
		#End of Blueish canvas
    ###ctx.font = '30px Arial'
    ctx.fillStyle = 'white'
    ctx.fillText("works", 40, 150)###
		drawGrid = () ->
			c = "white" #color
			t = 2 #line thickness
			drawLine(0,100,300,100, c, t)
			drawLine(0,200,300,200, c, t)
			drawLine(100,0,100,300, c, t)
			drawLine(200,0,200,300, c, t)
		
		drawCircle = (x, y) ->
			ctx.beginPath()
			ctx.arc(x * 100 + 50,y * 100 + 50,40,0,2*Math.PI)
			ctx.strokeStyle = "#0CB09D"
			ctx.lineWidth = 5
			ctx.stroke()
			ctx.closePath()
		# x and y betwwen [0..2]
		
		drawSWC = (x, y) ->
			p = 15
			#ctx.lineWidth = 2 
			drawLine(x * 100 + p, y * 100 + p, x * 100 + 100 - p, y * 100 + 100 - p, "#CF0C23", 5)
			drawLine(x * 100 + p, y * 100 + 100 - p, x * 100 + 100 - p, y * 100 + p, "#CF0C23", 5)
		
	#whereToDraw() ->
		#console.log("e")
		drawGrid()
		###
		drawCircle(1,1)
		drawCircle(0,0)
		drawCircle(2,1)
		drawCircle(1,2)
		drawSWC(1,0)
		drawSWC(2,0)
		drawSWC(2,2)
		drawSWC(0,1)
		drawSWC(0,2)
		###
		console.log("end of initalise")
