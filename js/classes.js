window.jsFracas = window.jsFracas || { };

jsFracas.Rectangle = class {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	
	//Basic getters and setters. Technically not needed because JavaScript, but it feels better to me personally
	getX() {return this.x;}
	setX(x) { this.x = x; }
	
	getY() {return this.y;}
	setY(y) {this.y = y;}
	
	getWidth() {return this.w;}
	setWidth(w) {this.w = w;}
	
	getHeight() {return this.h;}
	setHeight(h) {this.h = h;}
	
	/**
	 *  Returns true if the specified point is within the rectangle
	**/
	contains(x, y) {
		var isContained = false;
		if(x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h) {
			isContained = true;
		}
		return isContained;
	}
}

//Country with id = 0 is ocean, all others are conssidered grouped together as countries by id
jsFracas.Node = class {
	constructor(id, worldX, worldY, tileX, tileY) {
		this.id = id;
		this.rectBounds = new jsFracas.Rectangle(worldX, worldY, jsFracas.TILE_SIZE, jsFracas.TILE_SIZE);
		this.tileX = tileX;
		this.tileY = tileY;
		this.borderMode = 0; //No borders
	}
	
	getId() { return this.id; }
	setId(id) { this.id = id;}
	
	getWorldX() { return this.rectBounds.x; }
	setWorldX(x) { this.rectBounds.x = x;}
	
	getWorldY() { return this.rectBounds.y; }
	setWorldY(y) { this.rectBounds.y = y; }
	
	getTileX() { return this.tileX; }
	getTileY() { return this.tileY; }
	
	getBorderMode() { return this.borderMode; }
	setBorderMode(borderMode) { this.borderMode = borderMode;}
	
	getRectBounds() { return this.rectBounds; }
}

jsFracas.Faction = class {
	constructor(factionId, factionName, countryColor, isHuman) {
		this.factionId = factionId;
		this.factionName = factionName;
		this.countryColor = countryColor;
		this.isHuman = isHuman;
		this.countries = [];
	}
	
	getFactionId() { return this.factionId; }
	
	getFactionName() { return this.factionName; }
	setFactionName(factionName) { this.factionName = factionName; }
	
	getCountryColor() { return this.countryColor; }
	setCountryColor(countryColor) { this.countryColor = countryColor; }
	
	getIsHuman() { return this.isHuman; }
	setIsHuman(isHuman) { this.isHuman = isHuman; }
	
	getCountries() { return this.countries; }
	setCountries(countries) { this.countries = countries; }
	
	addCountry(country) { 
		if(this.countries.length == 0) {
			country.setIsCapital(true);
		}
		this.countries[this.countries.length] = country;
	}
}

jsFracas.Country = class {
	constructor(id, name, owningFaction) {
		this.id = id; //Numeric id, used for internal recognition
		this.name = name; // Name of country, to be dispayed to player
		this.nodeList = []; //The list of nodes that make up this country
		this.owningFaction = owningFaction; //Faction object
		this.neighbors = []; //List of numeric IDs that correspond to the countries that are neighbors with this one. Can contain 0 if country is bordering water
		this.troops = 0; //The troop count of the country
		this.hasPort = false; //Boolean flag determining if the country has a port (can move across water)
		this.isCapital = false; //Boolean flag determining if the country is the owning faction's capital
		this.isHighlighted = false; //Boolean flag for if this country should be displayed highlighted (for neighbor checks)
	}
	
	addNode(node) {
		this.nodeList[this.nodeList.length] = node;
	}
	
	getId() { return this.id; }
	setId(id) { this.id = id;}
	
	getName() { return this.name; }
	setName(name) { this.name = name; }
	
	getNodeList() { return this.nodeList; }
	setNodeList(nodeList) { this.nodeList = nodeList; }
	
	getOwningFaction() { return this.owningFaction; }
	setOwningFaction(owningFaction) { this.owningFaction = owningFaction; }
	
	getNeighbors() { return this.neighbors; }
	setNeighbors(neighborsArray) { this.neighbors = neighborsArray; }
	
	getHasPort() { return this.hasPort; }
	setHasPort(hasPort) { this.hasPort = hasPort; }
	
	getTroops() { return this.troops; }
	setTroops(troops) { this.troops = troops; }
	
	getIsCapital() { return this.isCapital; }
	setIsCapital(isCapital) { this.isCapital = isCapital; }
	
	render(gContext, gameCamera) {
		for(var i = 0; i < this.nodeList.length; i++) {
			var currentNode = this.nodeList[i];
			
			if(!gameCamera.isPointOnScreen(currentNode.getWorldX(), currentNode.getWorldY())) {
				continue;
			}
			
			var nodeX = gameCamera.getWorldXAsLocalX(currentNode.getWorldX());
			var nodeY = gameCamera.getWorldYAsLocalY(currentNode.getWorldY());
			
			//Draw the country
			gContext.fillStyle = this.owningFaction.getCountryColor();
			gContext.fillRect(nodeX, nodeY, jsFracas.TILE_SIZE, jsFracas.TILE_SIZE);
			
			if(this.isCapital) {
				gContext.beginPath();
				gContext.strokeStyle = "#ccdddd";
				gContext.moveTo(nodeX + (jsFracas.TILE_SIZE / 2), nodeY);
				gContext.lineTo(nodeX + (jsFracas.TILE_SIZE / 2), nodeY + jsFracas.TILE_SIZE);
				gContext.moveTo(nodeX, nodeY + (jsFracas.TILE_SIZE / 2));
				gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY + (jsFracas.TILE_SIZE / 2));
				gContext.stroke();
			}
			
			if(currentNode.getBorderMode() != 0) {
				gContext.beginPath();
				gContext.strokeStyle = "#000000";
				
				//Check for borders
				switch(currentNode.getBorderMode()) {
					case 1:
						//North border only
						gContext.moveTo(nodeX, nodeY);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY);
						break;
					case 2: 
						//East border only
						gContext.moveTo(nodeX + jsFracas.TILE_SIZE, nodeY);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY + jsFracas.TILE_SIZE);
						break;
					case 3:
						//N/E borders 
						gContext.moveTo(nodeX, nodeY);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY + jsFracas.TILE_SIZE);
						break;
					case 4:
						//South border only
						gContext.moveTo(nodeX, nodeY + jsFracas.TILE_SIZE);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY + jsFracas.TILE_SIZE);
						break;
					case 5:
						//N/S borders 
						gContext.moveTo(nodeX, nodeY);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY);
						gContext.moveTo(nodeX, nodeY + jsFracas.TILE_SIZE);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY + jsFracas.TILE_SIZE);
						break;
					case 6:
						//S/E borders 
						gContext.moveTo(nodeX, nodeY + jsFracas.TILE_SIZE);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY + jsFracas.TILE_SIZE);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY);
						break;
					case 7:
						//N/E/S borders (lulz, NES)
						gContext.moveTo(nodeX, nodeY);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY + jsFracas.TILE_SIZE);
						gContext.lineTo(nodeX, nodeY + jsFracas.TILE_SIZE);
						break;
					case 8:
						//West border only
						gContext.moveTo(nodeX, nodeY);
						gContext.lineTo(nodeX, nodeY + jsFracas.TILE_SIZE);
						break;
					case 9:
						//W/N borders 
						gContext.moveTo(nodeX, nodeY + jsFracas.TILE_SIZE);
						gContext.lineTo(nodeX, nodeY);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY);
						break;
					case 10:
						//W/E borders 
						gContext.moveTo(nodeX, nodeY);
						gContext.lineTo(nodeX, nodeY + jsFracas.TILE_SIZE);
						gContext.moveTo(nodeX + jsFracas.TILE_SIZE, nodeY);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY + jsFracas.TILE_SIZE);
						break;
					case 11:
						//W/N/E borders
						gContext.moveTo(nodeX, nodeY + jsFracas.TILE_SIZE);
						gContext.lineTo(nodeX, nodeY);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY + jsFracas.TILE_SIZE);
						break;
					case 12:
						//W/S borders
						gContext.moveTo(nodeX, nodeY);
						gContext.lineTo(nodeX, nodeY + jsFracas.TILE_SIZE);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY + jsFracas.TILE_SIZE);
						break;
					case 13:
						//W/S/N borders
						gContext.moveTo(nodeX + jsFracas.TILE_SIZE, nodeY + jsFracas.TILE_SIZE);
						gContext.lineTo(nodeX, nodeY + jsFracas.TILE_SIZE);
						gContext.lineTo(nodeX, nodeY);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY);
						break;
					case 14:
						//W/S/E borders 
						gContext.moveTo(nodeX, nodeY);
						gContext.lineTo(nodeX, nodeY + jsFracas.TILE_SIZE);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY + jsFracas.TILE_SIZE);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY);
						break;
					case 15:
						//All borders (this poor lonely little country lol)
						gContext.moveTo(nodeX, nodeY);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY);
						gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY + jsFracas.TILE_SIZE);
						gContext.lineTo(nodeX, nodeY + jsFracas.TILE_SIZE);
						gContext.lineTo(nodeX, nodeY);
						break;
				}
				gContext.stroke();
			}
		}
	}
}

jsFracas.Camera = class {
	constructor(rectCameraBounds) {
		this.rectBounds = rectCameraBounds;
		this.xSpeed = 0;
		this.ySpeed = 0;
	}
	
	/**
	 *	Returns true if the supplied object bounding coordinates are within the current camera chunk
	 */
	isWorldObjectEntirelyVisible(worldX, worldY, objW, objH) {
		var isVisible = false;
		if((worldX >= this.rectBounds.x && worldX + objW <= this.rectBounds.x + this.rectBounds.w) &&
			(worldY >= this.rectBounds.y && worldY + objH <= this.rectBounds.y + this.rectBounds.h)) {
			//Point is valid
			isVisible = true;
		}
		
		return isVisible;
	}
	
	/*
	 * Returns true if the specified point is on the screen
	 */
	isPointOnScreen(worldX, worldY) {
		var isVisible = false;
		if(worldX >= this.rectBounds.x && worldX <= this.rectBounds.x + this.rectBounds.w && worldY >= this.rectBounds.y && worldY <= this.rectBounds.y + this.rectBounds.h) {
			isVisible = true;
		}
		
		return isVisible;
	}
	
	/**
	 * Returns the current real world X coordinate of the camera
	 */
	getGlobalX() { 
		return this.rectBounds.x; 
	}
	
	getGlobalY() {
		return this.rectBounds.y;
	}
	
	
	getLocalXAsWorldX(localX) {
		return localX + this.rectBounds.x;
	}
	
	getLocalYAsWorldY(localY) {
		return localY + this.rectBounds.y;
	}
	
	getWorldXAsLocalX(worldX) {
		return worldX - this.rectBounds.x;
	}
	
	getWorldYAsLocalY(worldY) {
		return worldY - this.rectBounds.y;
	}
	
	setXSpeed(xSpeed) {
		this.xSpeed = xSpeed;
	}
	
	setYSpeed(ySpeed) {
		this.ySpeed = ySpeed;
	}
	
	update() {
		this.move(this.xSpeed, this.ySpeed);
	}
	
	move(xDir, yDir) {
		this.rectBounds.x += xDir;
		this.rectBounds.y += yDir;
	}
	
	/**
	 *	Centers the camera on the point specified in worldX and worldY global coordinates
	 */
	centerOnPoint(worldX, worldY) {
		this.rectBounds.x = parseInt(worldX - (this.rectBounds.w / 2));
		this.rectBounds.y = parseInt(worldY - (this.rectBounds.h / 2));
		if(this.rectBounds.x < 0) { this.rectBounds.x = 0; }
		if(this.rectBounds.y < 0) { this.rectBounds.y = 0; }
	}
}

jsFracas.EasyAI = class {
	constructor(owningFaction) {
		this.owningFaction = owningFaction;
	}
	
	takeTurn() {
		
	}
}

jsFracas.GameWrapper = class {
	constructor(countriesList, cameraObject, gameCanvas, players) {
		this.countriesList = countriesList;
		this.camera = cameraObject;
		this.gameCanvas = gameCanvas;
		this.players = players;
		this.playerTurn = 0;
		this.isThinking = false;
	}
	
	handleClick(evt) {
		//Grab the canvas bounding rect
		var rect = this.gameCanvas.getBoundingClientRect();
		
		//Get the x and y in canvas coords
		var x = evt.clientX - rect.left;
		var y = evt.clientY - rect.top;
		
		//Translate the local screen co-ords to world co-ordinates
		var worldX = this.camera.getLocalXAsWorldX(x);
		var worldY = this.camera.getLocalYAsWorldY(y);
		
		//If the current player is human (to prevent clicking during AI turns)
		var currentPlayer = this.players[this.playerTurn];
		if(currentPlayer.getIsHuman()) {
			
			//Iterate through all countries to determine which was clicked
			for(var countryIterator = 0; countryIterator < this.countriesList.length; countryIterator++) {
				var country = this.countriesList[countryIterator];
				
				//Check all nodes of the current country
				var nodeList = country.getNodeList();
				for(var nodeIterator = 0; nodeIterator < nodeList.length; nodeIterator++) {
					var node = nodeList[nodeIterator];
					//If the node was clicked
					if(node.getRectBounds().contains(worldX, worldY)) {
						
						//If the current country is unowned and the player has no capital or this country is neighbors with one they own
						if(country.getOwningFaction().getFactionId() == jsFracas.FACTION_UNOWNED) {
							//Check if this country can be claimed by the current player
							var validSelection = false;
							
							//If the player has no countries, this is the first, allow it
							if(currentPlayer.getCountries().length == 0) {
								validSelection = true;
							} else {
								//Otherwise check for neighbor matches
								for(var playerCountryIterator = 0; playerCountryIterator < currentPlayer.getCountries().length; playerCountryIterator++) {
									var currentPlayerCountry = currentPlayer.getCountries()[playerCountryIterator];
									
									for(var neighborIterator = 0; neighborIterator < currentPlayerCountry.getNeighbors().length; neighborIterator++) {
										if(country.getId() == currentPlayerCountry.getNeighbors()[neighborIterator]) {
											validSelection = true;
											break;
										}
									}
									
									if(validSelection) {
										break;
									}
								}
							}
							
							//If this is valid, let 'em have it
							if(validSelection) {
								//Set the country as owned by the current player
								country.setOwningFaction(currentPlayer);
								
								//Add the country to the player's list of countries
								currentPlayer.addCountry(country);
							
								this.advanceTurn();
								return;
							} else {
								//Otherwise 
								console.log("Invalid selection! Selection must be adjacent");
								//TODO: Play the invalid selection sound;
							}
						}
					}
				}
			}
		}
	}

	/*
	 * Responsible for advancing the turn with respect to max players
	 */
	advanceTurn() {
		this.playerTurn++;
		if(this.playerTurn >= this.players.length) {
			this.playerTurn = 0;
		}
	}
	
	handleKeyDown(evt) {
		var key = evt.code;
		if(key == "KeyA") {
			this.camera.setXSpeed(-jsFracas.CAMERA_SPEED);
		} else if(key == "KeyD") {
			this.camera.setXSpeed(jsFracas.CAMERA_SPEED);
		}
		
		if(key == "KeyW") {
			this.camera.setYSpeed(-jsFracas.CAMERA_SPEED);
		} else if (key == "KeyS") {
			this.camera.setYSpeed(jsFracas.CAMERA_SPEED);
		}
	}
	
	handleKeyUp(evt) {
		var key = evt.code;
		if(key == "KeyA" || key == "KeyD") {
			this.camera.setXSpeed(0);
		}
		
		if(key == "KeyW" || key == "KeyS") {
			this.camera.setYSpeed(0);
		}
	}
	
	//Unimplemented
	handleMouseMove(evt) {}
	
	handleMouseDown(evt) {}
	
	handleMouseUp(evt) {
		console.log(evt);
	}
	
	testAI() {
		var currentPlayer = this.players[this.playerTurn];
		
		//If this is the computer's first country
		if(currentPlayer.getCountries().length == 0) {		
			var countryGrabAttempts = 0;
			var randCountry = Math.floor(Math.random() * this.countriesList.length - 1) + 1;
			//Attempt to grab a random country, allowing up to 5 random attempts before taking first available
			while(this.countriesList[randCountry].getOwningFaction().getFactionId() != 1 && countryGrabAttempts < 5) {
				randCountry = Math.floor(Math.random() * this.countriesList.length - 1) + 1;
				countryGrabAttempts++;
			}
			
			if(countryGrabAttempts != 5) {
				//Found a country with random picking
				this.countriesList[randCountry].setOwningFaction(this.players[this.playerTurn]);
				currentPlayer.addCountry(this.countriesList[randCountry]);
				return;
			} else {
				//Failed to find a country, look for first unclaimed and take it
				for(var i = 0; i < this.countriesList.length; i++) {
					if(this.countriesList[i].getOwningFaction().getFactionId() == jsFracas.FACTION_UNOWNED) {
						this.countriesList[i].setOwningFaction(this.players[this.playerTurn]);
						currentPlayer.addCountry(this.countriesList[i]);
						return;
					}
				}
				//No more countries available
				console.log("No more available countries, advancing turn");
			}
		} else {
			//Otherwise the computer needs to lock it's advancements to it's neighboring areas
			var randomCountryIndex = Math.floor(Math.random() * currentPlayer.getCountries().length);
			var randomCountry = currentPlayer.getCountries()[randomCountryIndex];
			
			var randomNeighborIndex = Math.floor(Math.random() * randomCountry.getNeighbors().length);
			var randomNeighbor = randomCountry.getNeighbors()[randomNeighborIndex];
			
			var chosenCountry = this.countriesList[randomNeighbor];
			
			var neighborGrabAttempts = 0;
			//Allow up to 5 attempts before iterating to find available neighbor
			while(chosenCountry.getOwningFaction().getFactionId() != jsFracas.FACTION_UNOWNED && neighborGrabAttempts < 5) {
				randomCountryIndex = Math.floor(Math.random() * currentPlayer.getCountries().length);
				randomCountry = currentPlayer.getCountries()[randomCountryIndex];
				
				randomNeighborIndex = Math.floor(Math.random() * randomCountry.getNeighbors().length);
				randomNeighbor = randomCountry.getNeighbors()[randomNeighborIndex];
				
				chosenCountry = this.countriesList[randomNeighbor];
				neighborGrabAttempts++;
			}
			
			if(neighborGrabAttempts != 5) {
				//Found a country within the limit
				chosenCountry.setOwningFaction(currentPlayer);
				currentPlayer.addCountry(chosenCountry);
			} else {
				//Failed to find a valid neighbor, iterate through and take the first available
				for(var countryIterator = 0; countryIterator < currentPlayer.getCountries().length; countryIterator++) {
					var currentCountry = currentPlayer.getCountries()[countryIterator];
					for(var neighborIterator = 0; neighborIterator < currentCountry.getNeighbors().length; neighborIterator++) {
						var neighborId = currentCountry.getNeighbors()[neighborIterator];
						
						if(this.countriesList[neighborId].getOwningFaction().getFactionId() == jsFracas.FACTION_UNOWNED) {
							this.countriesList[neighborId].setOwningFaction(currentPlayer);
							currentPlayer.addCountry(this.countriesList[neighborId]);
							return;
						}
					}
				}
			}
		}
		
		//AI done
	}
	
	update() {
		window.requestAnimationFrame(this.update.bind(this));
		var currentPlayer = this.players[this.playerTurn];
		if(!currentPlayer.isHuman && !this.isThinking) {
			//AI :D
			this.isThinking = true;
			this.testAI();
			this.advanceTurn();
			this.isThinking = false;
		}
		this.camera.update();
		this.render();
	}
	
	render() {
		var gContext = this.gameCanvas.getContext('2d');
		gContext.fillStyle = "#000000";
		gContext.fillRect(0, 0, jsFracas.CANVAS_WIDTH, jsFracas.CANVAS_HEIGHT);
		for(var countryIterator = 0; countryIterator < this.countriesList.length; countryIterator++) {
			this.countriesList[countryIterator].render(gContext, this.camera);
		}
	}
}