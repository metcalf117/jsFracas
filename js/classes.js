window.jsFracas = window.jsFracas || { };

/*
 * Basic rectangle data structure, not super interesting or complex
 */
jsFracas.Rectangle = class {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	
	//Getters and setters
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

/*
 * The building blocks of countries. Basically a rectangle with some extra data
 */
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

/*
 * The Clyde AI is pretty dumb
 * --Prefers to randomly expand into unowned countries
 * --Will attack if preferred expansion path is owned by non-ally
 * --Moves troops randomly
 * --Resupplies randomly
 * --Will develop ports if expansion/combat isn't allowed and a sea-bordering country isn't developed
 */
jsFracas.ClydeAI = class {
	think(turnStage, countryList, factionId) {
		switch(turnStage) {
			case jsFracas.TURN_RESUPPLY:
				break;
			case jsFracas.TURN_ANNEX:
				break;
			case jsFracas.TURN_MOVE:
				break;
		}
	}
}

/*
 * The Defensive AI likes to lock itself up in a tight ball of defense
 * --Will annex all countries immediately surrounding capital, expanding that ring with time
 * --Resupplies capital always until at least 1000 troops, but will check any enemy country that neighbors a country it owns and attempt to keep +100 troops from strongest detected country
 * --Attacks any country that neighbors a neighbor of capital
 * --Doesn't move troops unless a threat is detected near the capital, in which case troops are moved to the capital from the highest troop count countries
 */
jsFracas.DefensiveAI = class {
	think(turnStage, countryList, factionId) {
		switch(turnStage) {
			case jsFracas.TURN_RESUPPLY:
				break;
			case jsFracas.TURN_ANNEX:
				break;
			case jsFracas.TURN_MOVE:
				break;
		}
	}
}

/*
 * The aggressive ai likes to spear head attacks for enemy capitals, while leaving its own capital relatively unguarded
 * --Annexes countries in a direct path to an enemy capital
 * --Resupplies the country closest to an enemy capital
 * --Moves troops towards spear head location
 * --Tries to maintain at least 1/5 of it's highest troop count country in its capital
 */
jsFracas.AggressiveAI = class {
	think(turnStage, countryList, factionId) {
		switch(turnStage) {
			case jsFracas.TURN_RESUPPLY:
				break;
			case jsFracas.TURN_ANNEX:
				break;
			case jsFracas.TURN_MOVE:
				break;
		}
	}
}

/*
 * The bastard AI plays like a human.
 * --Resupplies it's own capital if any enemies are within 9 nodes of it until capital defense alone is +250 of threat
 * --Creates a solid border around its capital
 * --Sends out controlled spearhead groups to attack enemy capitals
 * --If move through is enabled and any owned countries lose route back to capital restoring that link is prioritized
 * --If enemy countries detected closer than 9 nodes to capital, elimination of threat countries takes top priority
 */
jsFracas.BastardAI = class {
	think(turnStage, countryList, factionId) {
		switch(turnStage) {
			case jsFracas.TURN_RESUPPLY:
				break;
			case jsFracas.TURN_ANNEX:
				break;
			case jsFracas.TURN_MOVE:
				break;
		}
	}
}

/* 
 * The sadistic AI works a bit like the bastard AI, but instead of eliminating the capital straight away, it prefers to toy with it's victims
 * --Moves towards enemy capitals
 * --If the enemy controls more than 25 countries and loseOnCapitalLoss is false, the capital will be struck to weaken the faction
 * --Once the enemy capital is surrounded entirely, as long as there are more countries under that factions control the AI will perform search and destroy tactics
 * --If the sadistic AI's capital is threatened, it will drop toying with prey and defend its capital
 * ----If the threat is from a country currently being toyed with and eliminating their capital can be done quickly, it will be done
 * ----Otherwise, the threat will be removed directly
 */
jsFracas.SadisticAI = class {
	think(turnStage, countryList, factionId) {
		switch(turnStage) {
			case jsFracas.TURN_RESUPPLY:
				
				break;
			case jsFracas.TURN_ANNEX:
				break;
			case jsFracas.TURN_MOVE:
				break;
		}
	}
}

/*
 * Represents a player (human or AI)
 */
jsFracas.Faction = class {
	constructor(factionId, factionName, countryColor, isHuman) {
		this.factionId = factionId;
		this.factionName = factionName;
		this.countryColor = countryColor;
		this.isHuman = isHuman;
		
		this.aiBrain = null;
		this.countries = [];
	}
	
	getFactionId() { return this.factionId; }
	
	getFactionName() { return this.factionName; }
	setFactionName(factionName) { this.factionName = factionName; }
	
	getCountryColor() { return this.countryColor; }
	setCountryColor(countryColor) { this.countryColor = countryColor; }
	
	getIsHuman() { return this.isHuman; }
	setIsHuman(isHuman) { this.isHuman = isHuman; }
	
	setAI(ai) {
		if(this.isHuman) {
			console.log("Tried to set AI on a human player. Why?");
		} else {
			this.aiBrain = ai;
		}
	}
	
	performAI(turnStage) {
		if(this.isHuman || this.aiBrain == null) {
			console.log("Failed to invoke performAI for " + this.factionName + ". Either human or no AI set!");
		} else {
			this.aiBrain.think(turnStage, this.countries, this.factionId).bind(this.aiBrain);
		}
	}
	
	getCountries() { return this.countries; }
	setCountries(countries) { this.countries = countries; }
	
	addCountry(country) { 
		if(this.countries.length == 0) {
			country.setIsCapital(true);
		}
		this.countries[this.countries.length] = country;
	}
	
	removeCountryById(id) {
		for(var countryIterator = 0; countryIterator < this.countries.length; countryIterator++) {
			if(this.countries[countryIterator].getId() == id) {
				this.countries.splice(countryIterator, 1);
				break;
			}
		}
	}
}

/*
 * A collection of nodes that form a single country (or ocean)
 */
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
	
	removeNodeById(nodeId) {
		for(var nodeIteator = 0; nodeIterator < this.nodeList.length; nodeIterator++) {
			if(this.nodeList[nodeIterator].getId() == nodeId) {
				this.nodeList.splice(nodeIterator, 1);
				break;
			}
		}
	}
	
	getNodeByTileCoordinate(tileX, tileY) {
		for(var nodeIterator = 0; nodeIterator < this.nodeList.length; nodeIterator++) {
			var node = this.nodeList[nodeIterator];
			if(node.getTileX() == tileX && node.getTileY() == tileY) {
				return node;
			}
		}
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
	modTroops(amount) { this.troops += amount; }
	
	getIsCapital() { return this.isCapital; }
	setIsCapital(isCapital) { this.isCapital = isCapital; }
	
	getIsHighlighted() { return this.isHighlighted; }
	setIsHighlighted(isHighlighted) { this.isHighlighted = isHighlighted; }
	
	/*
	 * Handles the rendering of all child nodes and troop count, with respect to highlighting and capital status
	 */
	render(gContext, gameCamera) {
		var textX = 0;
		var textY = 0;
		var grabbedTextPosition = false;
		for(var i = 0; i < this.nodeList.length; i++) {
			var currentNode = this.nodeList[i];
			
			if(!gameCamera.isPointOnScreen(currentNode.getWorldX(), currentNode.getWorldY())) {
				continue;
			}
			
			var nodeX = gameCamera.getWorldXAsLocalX(currentNode.getWorldX());
			var nodeY = gameCamera.getWorldYAsLocalY(currentNode.getWorldY());
			
			//For the first valid, on-screen node, grab the text position
			if(!grabbedTextPosition) {
				textX = nodeX;
				textY = nodeY;
				grabbedTextPosition = true;
			}
			
			//Draw the country
			if(this.isHighlighted) {
				gContext.fillStyle = "#ffffff";
			} else {
				gContext.fillStyle = this.owningFaction.getCountryColor();
			}
			
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
			
			//If this country has a naval port
			//TODO: Make this better than what it is
			if(this.hasPort) {
				gContext.strokeStyle = "#000088";
				gContext.moveTo(nodeX, nodeY);
				gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY + jsFracas.TILE_SIZE);
				gContext.moveTo(nodeX, nodeY + jsFracas.TILE_SIZE);
				gContext.lineTo(nodeX + jsFracas.TILE_SIZE, nodeY);
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
		
		//Now that all nodes have been drawn, render the troop count
		if(this.troops > 0) {
			if(this.troops <= 999) {
				gContext.font = "15px Georgia";
			} else if (this.troops <= 9999) {
				gContext.font = "12px Georgia";
			} else if (this.troops <= 99999) {
				gContext.font = "8px Georgia";
			}
			gContext.fillStyle = "#000000";
			gContext.fillText(this.troops, textX + 2, textY + (jsFracas.TILE_SIZE / 2));
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
	
	getWorldXAsMinimapX(worldX) {
		return Math.floor(this.getWorldXAsLocalX(worldX) / jsFracas.MINIMAP_SCALE);
	}
	
	getWorldYAsMinimapY(worldY) {
		return Math.floor(this.getWorldYAsLocalY(worldY) / jsFracas.MINIMAP_SCALE);
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

/*
 * Contains all game information and handles input for human players as well as running the AI players. 
 */
jsFracas.GameWrapper = class {
	constructor(countriesList, cameraObject, oceanPlayer, players, gameCanvas, minimapCanvas) {
		this.countriesList = countriesList;
		this.camera = cameraObject;
		this.oceanPlayer = oceanPlayer; //TODO: Evaluate if the game wrapper actually needs the ocean player and/or if the necessity can be mitigated by updating the countriesList?
		this.players = players;
		this.gameCanvas = gameCanvas;
		this.minimapCanvas = minimapCanvas;
		
		//Initialize turn and state information
		this.playerTurn = 0;
		this.aiPerformingTurn = false;
		this.pickedCapitals = false;
		this.tempCountry = null; //Used for holding a country object for two-stage actions made by the player (like moving troops)
	}
	
	/*
	 * Quick helper method to grab a mouse click coordinates in canvas coordinates
	 */
	getClickCoordinates(evt) {
		//Grab the canvas bounding rect
		var rect = this.gameCanvas.getBoundingClientRect();
		
		//Get the x and y in canvas coords
		var x = evt.clientX - rect.left;
		var y = evt.clientY - rect.top;
		
		return {x: x, y: y};
	}
	
	/*
	 * Helper method to retrieve which country was clicked via world coordinates.
	 * Will return the counry object that was clicked, or null if no country was found
	 */
	getClickedCountry(worldX, worldY) {
		var clickedCountry = null;
		for(var countryIterator = 1; countryIterator < this.countriesList.length; countryIterator++) {
			var country = this.countriesList[countryIterator];
			
			//Check all nodes of the current country
			var nodeList = country.getNodeList();
			for(var nodeIterator = 0; nodeIterator < nodeList.length; nodeIterator++) {
				var node = nodeList[nodeIterator];
				//If the node was clicked
				if(node.getRectBounds().contains(worldX, worldY)) {
					clickedCountry = country;
					break;
				}
			}
			
			if(clickedCountry != null) {
				break;
			}
		}
		return clickedCountry;
	}
	
	/*
	 * Handles the right click event. 
	 */
	handleRightClick(evt) {
		//Prevent the usual pop up menu.
		evt.preventDefault();
		
		var clickCoordinates = this.getClickCoordinates(evt);
		
		//Translate the local screen co-ords to world co-ordinates
		var worldX = this.camera.getLocalXAsWorldX(clickCoordinates.x);
		var worldY = this.camera.getLocalYAsWorldY(clickCoordinates.y);
		
		var clickedCountry = this.getClickedCountry(worldX, worldY);

		if(clickedCountry == null) {
			return;
		}
		
		//Tally the defense of this country as well as attack strength against the country
		var defenseCount = clickedCountry.getTroops();
		var attackCount = 0;
		for(var neighborIterator = 0; neighborIterator < clickedCountry.getNeighbors().length; neighborIterator++) {
			var neighborId = clickedCountry.getNeighbors()[neighborIterator];
			var neighborCountry = this.countriesList[neighborId];
			var neighborFactionId = neighborCountry.getOwningFaction().getFactionId();
			if(neighborFactionId == clickedCountry.getOwningFaction().getFactionId()) {
				defenseCount += neighborCountry.getTroops();
			} else if(neighborFactionId != clickedCountry.getOwningFaction().getFactionId() && neighborFactionId != jsFracas.FACTION_OCEAN && neighborFactionId != jsFracas.FACTION_UNOWNED) {
				attackCount += neighborCountry.getTroops();
			} else if (neighborFactionId == jsFracas.FACTION_OCEAN) {
				//Check for any over-the-sea attackers or allies
				var oceanNeighbors = neighborCountry.getNeighbors();
				for(var oceanNeighborIterator = 0; oceanNeighborIterator < oceanNeighbors.length; oceanNeighbors++) {
					var oceanNeighborId = oceanNeighbors[oceanNeighborIterator];
					var oceanNeighbor = this.countriesList[oceanNeighborId];
					var oceanNeighborFactionId = oceanNeighbor.getOwningFaction().getFactionId();
					if(oceanNeighborFactionId == clickedCountry.getOwningFaction().getFactionId()) {
						defenseCount += oceanNeighbor.getTroops() * jsFracas.navalStrength;
					} else if (oceanNeighborFactionId != clickedCountry.getOwningFaction().getFactionId() && oceanNeighborFactionId != jsFracas.FACTION_OCEAN && oceanNeighborFactionId != jsFracas.FACTION_UNOWNED) {
						attackCount += oceanNeighbor.getTroops() * jsFracas.navalStrength;
					}
				}
			}
		}
		
		//Set the highlight of countries the clicked country can access
		for(var neighborIterator = 0; neighborIterator < clickedCountry.getNeighbors().length; neighborIterator++) {
			var neighborId = clickedCountry.getNeighbors()[neighborIterator];
			var neighborCountry = this.countriesList[neighborId];
			var neighborFactionId = neighborCountry.getOwningFaction().getFactionId();
			if(neighborFactionId != jsFracas.FACTION_OCEAN) {
				neighborCountry.setIsHighlighted(true);
			} else if (neighborFactionId == jsFracas.FACTION_OCEAN && clickedCountry.getHasPort()) {
				var oceanNeighbors = neighborCountry.getNeighbors();
				for(var oceanNeighborIterator = 0; oceanNeighborIterator < oceanNeighbors.length; oceanNeighborIterator++) {
					var oceanNeighborId = oceanNeighbors[oceanNeighborIterator];
					var oceanNeighbor = this.countriesList[oceanNeighborId];
					var oceanNeighborFactionId = oceanNeighbor.getOwningFaction().getFactionId();
					if(oceanNeighborFactionId != jsFracas.FACTION_OCEAN) {
						oceanNeighbor.setIsHighlighted(true);
					}
				}
			}
		}
		
		setTimeout(this.clearHighlights.bind(this), jsFracas.HIGHLIGHT_TIME);
		
		document.getElementById("infoCountryName").innerHTML = "Country name: " + clickedCountry.getName();
		document.getElementById("infoCountryTroops").innerHTML = "Troop Count: " + clickedCountry.getTroops();
		document.getElementById("infoCountryDefense").innerHTML = "Total defense: " + defenseCount;
		document.getElementById("infoCountryAttack").innerHTML = "Total attack: " + attackCount;
		document.getElementById("infoCountryOwnerName").innerHTML = "Owned by: " + clickedCountry.getOwningFaction().getFactionName();
	}
	
	/*
	 * Clear highlighted countries, except tempCountry if not null
	 */
	clearHighlights() {
		for(var countryIterator = 1; countryIterator < this.countriesList.length; countryIterator++) {
			if(this.countriesList[countryIterator].getIsHighlighted()) {
				this.countriesList[countryIterator].setIsHighlighted(false);
			}
		}
		
		if(this.tempCountry != null) {
			this.tempCountry.setIsHighlighted(true);
		}
	}
	
	/*
	 * Handles the left click event, this is the main interation of the player with the game, so it's pretty hefty
	 * TODO: Maybe split this up into some more manageable chunks
	 */
	handleClick(evt) {
		var clickCoordinates = this.getClickCoordinates(evt);
		
		//Translate the local screen co-ords to world co-ordinates
		var worldX = this.camera.getLocalXAsWorldX(clickCoordinates.x);
		var worldY = this.camera.getLocalYAsWorldY(clickCoordinates.y);
		
		//If the current player is human (to prevent clicking during AI turns)
		var currentPlayer = this.players[this.playerTurn];
		if(currentPlayer.getIsHuman()) {
			//Iterate through all countries to determine which was clicked
			var clickedCountry = this.getClickedCountry(worldX, worldY);
			
			//If the user clicked outside of the bounds of the game field, do nothing
			if(clickedCountry == null) {
				return;
			}
			if(this.pickedCapitals == false) {
				if(clickedCountry.getOwningFaction().getFactionId() == jsFracas.FACTION_UNOWNED) {
					clickedCountry.setOwningFaction(currentPlayer);
					currentPlayer.addCountry(clickedCountry);
					this.advanceTurn();
					if(this.playerTurn == this.players.length - 1) {
						this.pickedCapitals = true;
					}
				}
				return;
			}
			switch(this.turnStage) {
				case jsFracas.TURN_RESUPPLY:
					if(clickedCountry.getOwningFaction().getFactionId() == currentPlayer.getFactionId()) {
						clickedCountry.modTroops(jsFracas.reinforcementByCountryNumber * currentPlayer.getCountries().length);
						this.turnStage = jsFracas.TURN_ANNEX;
					} else {
						console.log("You must resupply a country you own!");
						jsFracas.soundFX[jsFracas.SFX_INVALID].play();
					}
					break;
				case jsFracas.TURN_ANNEX:
					//Figure out if annexing, attacking, or developing
					//If the current country is unowned and the player has no capital or this country is neighbors with one they own
					if(clickedCountry.getOwningFaction().getFactionId() == jsFracas.FACTION_UNOWNED) {
						//Annexing!
						var validSelection = false;
						for(var playerCountryIterator = 0; playerCountryIterator < currentPlayer.getCountries().length; playerCountryIterator++) {
							var currentPlayerCountry = currentPlayer.getCountries()[playerCountryIterator];
							
							for(var neighborIterator = 0; neighborIterator < currentPlayerCountry.getNeighbors().length; neighborIterator++) {
								var neighborId = currentPlayerCountry.getNeighbors()[neighborIterator];
								
								//Check for valid path acrosss ocean boundaries
								if(this.countriesList[neighborId].getOwningFaction().getFactionId() == jsFracas.FACTION_OCEAN && currentPlayerCountry.getHasPort()) {
									var oceanNeighbors = this.countriesList[neighborId].getNeighbors();
									for(var oceanNeighborIterator = 0; oceanNeighborIterator < oceanNeighbors.length; oceanNeighborIterator++) {
										var oceanNeighborId = oceanNeighbors[oceanNeighborIterator];
										if(oceanNeighborId == clickedCountry.getId()) {
											validSelection = true;
											break;
										}
									}
									
									if(validSelection) {
										break;
									}
								}
								if(clickedCountry.getId() == currentPlayerCountry.getNeighbors()[neighborIterator]) {
									validSelection = true;
									break;
								}
							}
							
							if(validSelection) {
								break;
							}
						}
						
						//If this is valid, let 'em have it
						if(validSelection) {
							//Set the country as owned by the current player
							clickedCountry.setOwningFaction(currentPlayer);
							
							//Add the country to the player's list of countries
							currentPlayer.addCountry(clickedCountry);
						
							jsFracas.soundFX[jsFracas.SFX_ANNEX].play();
						
							this.turnStage = jsFracas.TURN_MOVE;
						} else {
							//Otherwise 
							console.log("Invalid selection! Selection must be adjacent");
							jsFracas.soundFX[jsFracas.SFX_INVALID].play();
						}
					} else if (clickedCountry.getOwningFaction().getFactionId() != jsFracas.FACTION_OCEAN && clickedCountry.getOwningFaction().getFactionId() != currentPlayer.getFactionId()) {
						//Attacking!
						var attackSuccess = this.performAttack(currentPlayer, clickedCountry, true);
						if(attackSuccess) {
							this.turnStage = jsFracas.TURN_MOVE;
						} 
					} else if(clickedCountry.getOwningFaction().getFactionId() == currentPlayer.getFactionId() && !clickedCountry.getHasPort()) {
						//Developing
						jsFracas.soundFX[jsFracas.SFX_DEVELOP].play();
						clickedCountry.setHasPort(true);
						this.turnStage = jsFracas.TURN_MOVE;
					} else {
						jsFracas.soundFX[jsFracas.SFX_INVALID].play();
					}
					break;
				case jsFracas.TURN_MOVE:
					//Make sure the selected country is one the player owns
					if(clickedCountry.getOwningFaction().getFactionId() == currentPlayer.getFactionId()) {
						//If this is the first country clicked in the move stage
						if(this.tempCountry == null) {
							//Make sure to highlight it and update the instruction text
							this.tempCountry = clickedCountry;
							this.tempCountry.setIsHighlighted(true);
							this.updateBanner(currentPlayer.getFactionName() + ", select country to move troops to");
							document.getElementById("infoMoveTroopAmount").value = this.tempCountry.getTroops();
						} else {
							//Otherwise, if this is the second country clicked in the move stage of the turn
							
							//If they didn't click the same country
							if(clickedCountry.getId() == this.tempCountry.getId()) {
								this.tempCountry = null;
							} else {
								//Otherwise make sure the move is valid
								var movingSelectionsValid = false;
								
								//Determine if a valid path (with respect to the moveThrough game flag) exists
								movingSelectionsValid = this.doesValidPathExistBetweenTwoCountries(this.tempCountry, clickedCountry.getId(), currentPlayer.getFactionId(), true);
								
								if(movingSelectionsValid) {
									var troopAmount = document.getElementById("infoMoveTroopAmount").value;
									
									//If there's a problem with the value of the troops to move, set a default value
									if(isNaN(troopAmount) || troopAmount > this.tempCountry.getTroops()) {
										troopAmount = this.tempCountry.getTroops();
									} else if (troopAmount <= 0) {
										//TODO: Consider alerting this to the player and/or defaulting to full move amount?
										troopAmount = 1;
									}
									
									troopAmount = parseInt(troopAmount);
									
									clickedCountry.modTroops(troopAmount);
									this.tempCountry.modTroops(-troopAmount);
									
									//Remove the highlight from the first country
									this.tempCountry.setIsHighlighted(false);
									
									//Troops were moved, advance the turn
									this.advanceTurn();
								} else {
									console.log("You can only move within your own countries");
									jsFracas.soundFX[jsFracas.SFX_INVALID].play();
								} 
								
								//Reset the temp country
								this.tempCountry = null;
							}
						}
					} else {
						console.log("You can only click within your own countries");
					}
					break;
			}
		}
	}
	
	/*
	 * Sets the moveTroop value box to the appropriate amount based on which button was clicked (1/4, 1/2, 3/4, or All) 
	 */
	setMoveTroopAmount(amountFactor) {
		//Only do anything if it's the move step of the turn and the current player is human
		if(this.turnStage == jsFracas.TURN_MOVE && this.players[this.playerTurn].getIsHuman()) {
			//Only update stuff if we have a source country selected already
			if(this.tempCountry != null) {
				var troopCount = this.tempCountry.getTroops() * amountFactor;
				//Should never happen, but if someone thought they were clever by editing the script to change this (as opposed to editing values directly?) go ahead and block it lol
				if(troopCount > this.tempCountry.getTroops()) {
					troopCount = this.tempCountry.getTroops();
				}
				
				document.getElementById("infoMoveTroopAmount").value = troopCount;
			}
		}
	}
	
	//TODO: Rig this up to a button on the front end
	handleSkipClicked() {
		//Only perform skipping if the current player is human
		var currentPlayer = this.players[this.playerTurn];
		if(currentPlayer.getIsHuman()) {
			switch(this.turnStage) {
				case jsFracas.TURN_RESUPPLY:
					//Skipping on turn start is resigning
					var confirmation = confirm("Are you sure you'd like to surrender?");
					if(confirmation) {
						this.handlePlayerLoss(currentPlayer.getFactionId());
					}
					break;
				case jsFracas.TURN_ANNEX:
					this.turnStage = jsFracas.TURN_MOVE;
					break;
				case jsFracas.TURN_MOVE:
					this.advanceTurn();
					break;
			}
		}
	}
	
	/*
	 * Attempts to attack from the attacking country to the defending country.
	 * Will return true if the attack was valid and carried out, otherwise it will
	 * return false
	 */
	performAttack(attackingPlayer, defendingCountry, isHumanInitiated) {
		//Attacking!
		var defenderTroopCount = defendingCountry.getTroops();
		var attackerTroopCount = 0;
		var defenderFactionId = defendingCountry.getOwningFaction().getFactionId();
		var attackSuccess = false;
		
		for(var defenderNeighborIterator = 0; defenderNeighborIterator < defendingCountry.getNeighbors().length; defenderNeighborIterator++) {
			var defenderNeighborId = defendingCountry.getNeighbors()[defenderNeighborIterator];
			var neighborCountry = this.countriesList[defenderNeighborId];
			if(neighborCountry.getOwningFaction().getFactionId() == defenderFactionId) {
				defenderTroopCount += neighborCountry.getTroops();
			} else if(neighborCountry.getOwningFaction().getFactionId() == attackingPlayer.getFactionId()) {
				attackerTroopCount += neighborCountry.getTroops();
			} else if(neighborCountry.getOwningFaction().getFactionId() == jsFracas.FACTION_OCEAN) {
				//Check for ocean attackers, taking into account the naval strength modifier
				var oceanNeighbors = neighborCountry.getNeighbors();
				for(var oceanNeighborIterator = 0; oceanNeighborIterator < oceanNeighbors.length; oceanNeighborIterator++) {
					var oceanNeighborId = oceanNeighbors[oceanNeighborIterator];
					var oceanNeighbor = this.countriesList[oceanNeighborId];
					if(oceanNeighbor.getOwningFaction().getFactionId() == attackingPlayer.getFactionId() && oceanNeighbor.getHasPort()) {
						attackerTroopCount += Math.floor(oceanNeighbor.getTroops() * jsFracas.navalStrength);
					} else if (oceanNeighbor.getOwningFaction() == defenderFactionId && oceanNeighbor.getHasPort()) {
						defenderTroopCount += Math.floor(oceanNeighbor.getTroops() * jsFracas.navalStrength);
					}
				}
			}
		}
		
		if(defenderTroopCount > attackerTroopCount) {
			if(isHumanInitiated) {
				//Only play the sound when a human makes this mistake... they don't need to know how silly the AI is lol
				jsFracas.soundFX[jsFracas.SFX_INVALID].play();
			}
		} else {
			attackSuccess = true;
			var percentDifference = defenderTroopCount / attackerTroopCount;
			var countryLost = false;
			
			jsFracas.soundFX[jsFracas.SFX_ATTACK].play();
			
			if(percentDifference <= 0.4) {
				//If the defender is only 40% the troops of the attacker, instant death
				countryLost = true;
			} else {
				var troopLoss = Math.floor(defenderTroopCount * percentDifference);
				if(defendingCountry.getTroops() - troopLoss <= 0) {
					//Country was lost
					countryLost = true;
				} else {
					defendingCountry.modTroops(troopLoss * -1);
				}
			}
			
			if(countryLost) {
				if(defendingCountry.getIsCapital()) {
					if(jsFracas.loseOnCapitalLoss) {
						//Instant loss on behalf of player
						this.handlePlayerLoss(defendingCountry.getOwningFaction().getFactionId());
					} else {
						//Take into account the behavior options of how to behave on capital loss
					}
					defendingCountry.setIsCapital(false);
				} else {
					for(var playerIterator = 0; playerIterator < this.players.length; playerIterator++) {
						if(defenderFactionId == this.players[playerIterator].getFactionId()) {
							this.players[playerIterator].removeCountryById(defendingCountry.getId());
							break;
						}
					}
				}
				//Remove any survivors
				defendingCountry.setTroops(0);
				defendingCountry.setOwningFaction(attackingPlayer);
				attackingPlayer.addCountry(defendingCountry);
				
			}
		}
		
		return attackSuccess;
	}
	
	
	/*
	 * Attempts to prove that a valid path exists to the destination country id. In the current setup of the
	 * game, a shorter version of this could simply be return true since it's presently enforced that countries
	 * must be neighbors to be annexed or claimed. However, when naval ports are introduced there can be one-way
	 * neighboring present that this method will detect and prevent movethrough in the wrong direction. 
	 */
	doesValidPathExistBetweenTwoCountries(currentCountry, destinationCountryId, factionId, isMoving) {
		var pathExists = false;
		//Check direct neighbors, maybe we're just that lucky
		for(var neighborIterator = 0; neighborIterator < currentCountry.getNeighbors().length; neighborIterator++) {
			var neighborId = currentCountry.getNeighbors()[neighborIterator];
			if(currentCountry.getHasPort() && this.countriesList[neighborId].getOwningFaction().getFactionId() == jsFracas.FACTION_OCEAN) {
				//Ocean neighbor found and we have a port 
				console.log("Found ocean neighbor and current country has a port, let's check it out!");
				var oceanNeighbors = this.countriesList[neighborId].getNeighbors();
				for(var secondNeighborIterator = 0; secondNeighborIterator < oceanNeighbors.length; secondNeighborIterator++) {
					var oceanNeighborId = oceanNeighbors[secondNeighborIterator];
					if(oceanNeighborId == destinationCountryId) {
						pathExists = true;
						console.log("Found a valid neighbor across ocean");
						break;
					}
				}
				
				if(pathExists) {
					break;
				}
			}
			if(neighborId == destinationCountryId) {
				pathExists = true;
				break;
			}
		}
		
		//If we didn't find it in direct neighbors, check more if the moveThrough game flag is true and this is a move action (combat actions are locked to neighbors and ocean neighbors)
		if(!pathExists && jsFracas.allowMovethrough && isMoving) {
			for(var neighborIterator = 0; neighborIterator < currentCountry.getNeighbors().length; neighborIterator++) {
				var neighborId = currentCountry.getNeighbors()[neighborIterator];
				
				var country = this.countriesList[neighborId];
					
				//Only check through countries the player owns
				if(country.getOwningFaction().getFactionId() == factionId) {
					pathExists = this.doesValidPathExistBetweenTwoCountries(this.countriesList[neighborId], destinationCountryId);
				}
			}
		}
		
		return pathExists;
	}

	/*
	 * Handle a player being completely defeated
	 */
	handlePlayerLoss(factionId) {
		for(var playerIterator = 0; playerIterator < this.players.length; playerIterator++) {
			var player = this.players[playerIterator];
			if(player.getFactionId() == factionId) {
				switch(jsFracas.countryBehaviorOnDeath) {
					case jsFracas.BEHAVIOR_DEATH_RANDOM:
						//TODO: Iterate through all countries, pick randomly which each one should do
						break;
					case jsFracas.BEHAVIOR_DEATH_SWITCH_TO_CONQUEROR:
						//TODO: Iterate through all countries and switch them to the player that conquered
						break;
					case jsFracas.BEHAVIOR_DEATH_SWITCH_TO_ALLIES:
						//TODO: Iterate through all countries and switch to random allies, if applicable, default to unowned if no allies
						break;
					case jsFracas.BEHAVIOR_DEATH_REMAIN_LOYAL:
						//TODO: Don't really need to do anything
						break;
					case jsFracas.BEHAVIOR_DEATH_BECOME_UNOWNED:
						//TODO: Iterate through all countries and switch them to unowned
						break;
				}
				
				console.log(player.getFactionName() + " has been defeated!");
				jsFracas.soundFX[jsFracas.SFX_ATTACK].pause();
				jsFracas.soundFX[jsFracas.SFX_ATTACK].currentTime = 0;
				jsFracas.soundFX[jsFracas.SFX_PLAYER_DEATH].play();
				this.players.splice(playerIterator, 1);
				break;
			}
		}
		
		this.checkForVictoryConditions();
	}
	
	/*
	 * Checks for victory conditions
	 * TODO: Check for team winning conditions as well
	 */
	checkForVictoryConditions() {
		if(this.players.length == 1) {
			alert(this.players[0].getFactionName() + " wins the game!");
		}
	}
	
	/*
	 * Responsible for advancing the turn with respect to max players
	 */
	advanceTurn() {
		this.aiPerformingTurn = false;
		this.turnStage = jsFracas.TURN_RESUPPLY;
		this.playerTurn++;
		if(this.playerTurn >= this.players.length) {
			this.playerTurn = 0;
		}
	}
	
	/*
	 * Handles any key down event
	 */
	handleKeyDown(evt) {
		var key = evt.code;
		
		//If the A/D key is pressed, set the camera to move left/right
		if(key == "KeyA") {
			this.camera.setXSpeed(-jsFracas.CAMERA_SPEED);
		} else if(key == "KeyD") {
			this.camera.setXSpeed(jsFracas.CAMERA_SPEED);
		}
		
		//If the W/S key is pressed, set the camera to move up/down
		if(key == "KeyW") {
			this.camera.setYSpeed(-jsFracas.CAMERA_SPEED);
		} else if (key == "KeyS") {
			this.camera.setYSpeed(jsFracas.CAMERA_SPEED);
		}
	}
	
	/*
	 * Handles any key up event
	 */
	handleKeyUp(evt) {
		var key = evt.code;
		
		//If a horizontal camera movement key was released, stop horizontal camera movement
		if(key == "KeyA" || key == "KeyD") {
			this.camera.setXSpeed(0);
		}
		
		//If a vertical camera movement key was released, stop vertical camera movement
		if(key == "KeyW" || key == "KeyS") {
			this.camera.setYSpeed(0);
		}
	}
	
	//Unimplemented, left just in case for now
	//TODO: Final cleanup, if these are still unimplmented, remove them and their handlers
	handleMouseMove(evt) {}
	
	handleMouseDown(evt) {}
	
	handleMouseUp(evt) {}
	
	/*
	 * Very primitive "AI" testing. 
	 * TODO: Split this logic into self-contained classes that represent AI difficulties
	 * TODO: Add all player steps (re-supply, annex/attack/develop, move)
	 */
	testAI() {
		var currentPlayer = this.players[this.playerTurn];
		
		//If this is the computer's first country
		if(!this.pickedCapitals) {		
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
			} else {
				//Failed to find a country, look for first unclaimed and take it
				for(var i = 1; i < this.countriesList.length; i++) {
					if(this.countriesList[i].getOwningFaction().getFactionId() == jsFracas.FACTION_UNOWNED) {
						this.countriesList[i].setOwningFaction(this.players[this.playerTurn]);
						currentPlayer.addCountry(this.countriesList[i]);
						break;
					}
				}
				//No more countries available
				console.log("No more available countries, advancing turn");
			}
			
			if(this.playerTurn == this.players.length - 1) {
				this.pickedCapitals = true;
				this.advanceTurn();
			} else {
				setTimeout(this.updateAITurn.bind(this), jsFracas.TURN_DELAY);
			}
		} else {
			switch(this.turnStage) {
				case jsFracas.TURN_RESUPPLY:
					var resupplyCountryIndex = Math.floor(Math.random() * currentPlayer.getCountries().length);
					currentPlayer.getCountries()[resupplyCountryIndex].modTroops(jsFracas.reinforcementByCountryNumber * currentPlayer.getCountries().length);
					setTimeout(this.updateAITurn.bind(this), jsFracas.TURN_DELAY);
					break;
				case jsFracas.TURN_ANNEX:
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
						jsFracas.soundFX[jsFracas.SFX_ANNEX].play();
					} else {
						//Failed to find a valid neighbor, iterate through and take the first available
						var annexedOrAttacked = false;
						for(var countryIterator = 0; countryIterator < currentPlayer.getCountries().length; countryIterator++) {
							var currentCountry = currentPlayer.getCountries()[countryIterator];
							for(var neighborIterator = 0; neighborIterator < currentCountry.getNeighbors().length; neighborIterator++) {
								var neighborId = currentCountry.getNeighbors()[neighborIterator];
								
								if(this.countriesList[neighborId].getOwningFaction().getFactionId() == jsFracas.FACTION_UNOWNED) {
									this.countriesList[neighborId].setOwningFaction(currentPlayer);
									currentPlayer.addCountry(this.countriesList[neighborId]);
									annexedOrAttacked = true;
									jsFracas.soundFX[jsFracas.SFX_ANNEX].play();
									break;
								} else if(this.countriesList[neighborId].getOwningFaction().getFactionId() != jsFracas.FACTION_OCEAN && this.countriesList[neighborId].getOwningFaction().getFactionId() != currentPlayer.getFactionId()) {
									//Attempt an attack
									var attackSuccess = this.performAttack(currentPlayer, this.countriesList[neighborId], false);
									if(attackSuccess) {
										annexedOrAttacked = true;
										break;
									}
								}
							}
							
							if(annexedOrAttacked) {
								break;
							}
						}
					}
					setTimeout(this.updateAITurn.bind(this), jsFracas.TURN_DELAY);
					break;
				case jsFracas.TURN_MOVE:
					//TODO: Implment moving troops phase
					setTimeout(this.updateAITurn.bind(this), jsFracas.TURN_DELAY);
					break;
				case jsFracas.TURN_AI_END_TURN:
					this.advanceTurn();
					break;
			}
		}
	}
	
	updateAITurn() {
		this.aiPerformingTurn = false;
		if(!this.pickedCapitals) {
			//TODO: Make this verify that the turn actually goes to the first player after the flag flips to true on last player capital pick
			this.advanceTurn();
		} else {
			this.turnStage++;
		}
	}
	
	/*
	 * Update the header banner displayed to the player
	 */
	updateBanner(msg) {
		document.getElementById("bannerMessage").innerHTML = msg;
	}
	
	update() {
		window.requestAnimationFrame(this.update.bind(this));
		var currentPlayer = this.players[this.playerTurn];
		switch(this.turnStage) {
			case jsFracas.TURN_RESUPPLY:
				this.updateBanner(this.players[this.playerTurn].getFactionName() + ", pick a country to resupply!");
				break;
			case jsFracas.TURN_ANNEX:
				this.updateBanner(this.players[this.playerTurn].getFactionName() + ", select a country to annex, attack, or develop!");
				break;
			case jsFracas.TURN_MOVE:
				this.updateBanner(this.players[this.playerTurn].getFactionName() + ", move troops!");
				break;
		}
		if(!currentPlayer.isHuman && !this.aiPerformingTurn) {
			//AI :D
			this.aiPerformingTurn = true;
			this.testAI();
		}
		this.camera.update();
		this.render();
	}
	
	render() {
		var gContext = this.gameCanvas.getContext('2d');
		gContext.fillStyle = "#000000";
		gContext.fillRect(0, 0, jsFracas.CANVAS_WIDTH, jsFracas.CANVAS_HEIGHT);
		for(var countryIterator = 1; countryIterator < this.countriesList.length; countryIterator++) {
			this.countriesList[countryIterator].render(gContext, this.camera);
		}
		
		//Minimap rendering
		var minimapContext = this.minimapCanvas.getContext('2d');
		minimapContext.fillStyle = "#000000";
		minimapContext.fillRect(0, 0, 160, 160);
		
		//Since the minimap is 1/10 the size of the game canvas, adjust drawing sizes accordingly
		var tileSize = Math.floor(jsFracas.TILE_SIZE / 10);
		for(var countryIterator = 1; countryIterator < this.countriesList.length; countryIterator++) {
			var country = this.countriesList[countryIterator];
			var countryNodes = country.getNodeList();
			for(var nodeIterator = 0; nodeIterator < countryNodes.length; nodeIterator++) {
				var node = countryNodes[nodeIterator];
				var nodeMinimapX = this.camera.getWorldXAsMinimapX(node.getWorldX()) + 40;
				var nodeMinimapY = this.camera.getWorldYAsMinimapY(node.getWorldY()) + 40;
				if(nodeMinimapX >= 0 && nodeMinimapX <= 160 && nodeMinimapY >= 0 && nodeMinimapY <= 160) {
					minimapContext.fillStyle = country.getOwningFaction().getCountryColor();
					minimapContext.fillRect(nodeMinimapX, nodeMinimapY, tileSize, tileSize);
				}
			}
		}
		minimapContext.strokeStyle = "#ff00ff";
		minimapContext.strokeRect(40, 40, 80, 80);
	}
}