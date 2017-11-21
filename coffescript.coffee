canvasSize = 300
turn = 0
won = false
gridMoves = [] #[ [0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2] ]
gridSign = [9, 9, 9,
		   	9, 9, 9,
		   	9, 9, 9]
$ -> # Main Function, Draws Everything
	initialise = () ->
		canvas = document.getElementById("myCanvas")
		canvas.addEventListener("mousedown", doMouseDown, false)
		
	doMouseDown = (event) ->
		if won == false
			X = event.pageX
			Y = event.pageY
			s = [0, 0]

			if X > 10 && X < 105 
				s[0] = 0
				if Y > 10 && Y < 105 then	s = [0, 0]
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

			if checkIfIn(s) == true
				#gridMoves.splice(indexOf(s), 1)
				temp = (s[1] * 3 ) + (s[0] % 3)
				gridMoves.push(s)

				#gridSign = gridMoves.slice(0)
				#gridSign = 2
				#console.log gridMoves
				if turn % 2 == 0
					drawSWC(s[0], s[1])
					gridSign[temp] = 1
				else if turn % 2 == 1
					drawCircle(s[0], s[1])
					gridSign[temp] = 0
				turn += 1
				console.log gridSign

			checkIfWon()			
			#drawLine(0, 0, 300, 300, "yellow", 16)
			#whereToDraw(s[0], s[1])
			return s
	# ^ ^ ^ End of main function - draw x and O by turn and check if someone won yet ^
	checkIfIn = (s) ->
		for sqr in gridMoves
			if JSON.stringify(s) == JSON.stringify(sqr)
				return false
		return true
	
	checkIfWon = () ->
		if gridSign[0] + gridSign[4] + gridSign[8] == 3
			drawLine(0, 0, 300, 300 , "#CF0C23", 16)
			won = true
			console.log "X has won"
		else if gridSign[2] + gridSign[4] + gridSign[6] == 3
			drawLine(300, 0, 0, 300 , "#CF0C23", 16)
			won = true
			console.log "X has won"
		else if gridSign[0] + gridSign[4] + gridSign[8] == 0
			drawLine(0, 0, 300, 300 , "#0CB09D", 16)
			won = true
			console.log "O has won"
		else if gridSign[2] + gridSign[4] + gridSign[6] == 0
			drawLine(0, 300, 300, 0 , "#0CB09D", 16)
			won = true
			console.log "O has won"	
			#
		for i in [0..8] by 3
			if gridSign[0+i] + gridSign[1+i] + gridSign[2+i] == 3
				drawLine(0, (i//3)*100 +50, 300, (i//3)*100 +50, "#CF0C23", 16)
				won = true
				console.log "X has won"
			else if gridSign[0+i] + gridSign[1+i] + gridSign[2+i] == 0
				drawLine(0, (i//3)*100 +50, 300, (i//3)*100 +50, "#0CB09D", 16)
				won = true
				console.log "O has won"
			else if gridSign[0+(i//3)] + gridSign[3+(i//3)] + gridSign[6+(i//3)] == 3
				drawLine((i//3)*100 + 50, 0, (i//3)*100 + 50, 300 , "#CF0C23", 16)
				won = true
				console.log "X has won"
			else if gridSign[0+(i//3)] + gridSign[3+(i//3)] + gridSign[6+(i//3)] == 0
				drawLine((i//3)*100 + 50, 0, (i//3)*100 + 50, 300 , "#0CB09D", 16)
				won = true
				console.log "O has won"
			
				
		
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
	
		drawGrid()
		console.log("end of initalise")
