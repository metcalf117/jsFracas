//Setup jsFracas namespace
window.jsFracas = window.jsFracas || { };

//global "Constants"
jsFracas.TILE_SIZE = 32;
jsFracas.BORDER_NORTH = 1;
jsFracas.BORDER_EAST = 2;
jsFracas.BORDER_SOUTH = 4;
jsFracas.BORDER_WEST = 8;

jsFracas.CANVAS_HEIGHT = 800;
jsFracas.CANVAS_WIDTH = 800;
jsFracas.CAMERA_SPEED = 16;
jsFracas.MINIMAP_SCALE = 10; //The minimap is 1/10 the size of the game canvas

jsFracas.FACTION_OCEAN = 0;
jsFracas.FACTION_UNOWNED = 1;

jsFracas.TURN_RESUPPLY = 0;
jsFracas.TURN_ANNEX = 1;
jsFracas.TURN_MOVE = 2;

jsFracas.BEHAVIOR_CAPITAL_LOSS_RANDOM = 0;
jsFracas.BEHAVIOR_CAPITAL_LOSS_SWITCH = 1;
jsFracas.BEHAVIOR_CAPITAL_LOSS_REMAIN_LOYAL = 2;
jsFracas.BEHAVIOR_CAPITAL_LOSS_BECOME_UNOWNED = 3;

jsFracas.BEHAVIOR_DEATH_RANDOM = 0;
jsFracas.BEHAVIOR_DEATH_SWITCH_TO_CONQUEROR = 1;
jsFracas.BEHAVIOR_DEATH_SWITCH_TO_ALLIES = 2;
jsFracas.BEHAVIOR_DEATH_REMAIN_LOYAL = 3;
jsFracas.BEHAVIOR_DEATH_BECOME_UNOWNED = 4;

//Music and sounds
jsFracas.MUSIC_BGM1 = 0;
jsFracas.SFX_INVALID = 0;
jsFracas.SFX_ATTACK = 1;

//Configuration values (TODO: make them, ya know, configurable)
jsFracas.reinforcementByCountryNumber = 3; //How many additional troops each owned country adds to reinforcements
jsFracas.navalStrength = 0.6; //The percentage of strength naval bases provide (min 0, max, um, like a lot)
jsFracas.allowMovethrough = false; //Allow troops to be moved between any two owned countries as long as a valid path exists (default: false)
jsFracas.pickCapitals = true; //Whether or not players can choose their capital countries
jsFracas.loseOnCapitalLoss = true; //Whether or not players lose when their capital city is captured/destroyed (default: false)
jsFracas.countryBehaviorOnCapitalLoss = jsFracas.BEHAVIOR_CAPITAL_LOSS_RANDOM; //How countries a player owns should behave when the capital is lost
jsFracas.countryBehaviorOnDeath = jsFracas.BEHAVIOR_DEATH_RANDOM; //How countries a player owned should behave when that player is dead
jsFracas.countryMinimumTroopCount = 0; //The minimum number of troops allowed during map generation
jsFracas.countryMaximumTroopCount = 100; //The maximum number of troops allowed during map generation
jsFracas.countryAllowGenerationTroops = true; //Whether or not to allow troops in unowned countries during generation

//Global objects
jsFracas.owningFactions = [];
jsFracas.music = [];
jsFracas.soundFX = [];

var gameWrapper = null;
var graphicsContext = null;

/**
 *  Initialize the game data and create base objects to start the game
**/
function gameInit() {
	
	//Make a camera rect, then create the camera, make some nodes and get them rendering
	var cameraRect = new jsFracas.Rectangle(0, 0, jsFracas.CANVAS_WIDTH, jsFracas.CANVAS_HEIGHT);
	var gameCamera = new jsFracas.Camera(cameraRect);
	
	//Create the factions
	//TODO: Extract all player factions to a form before game starts
	jsFracas.owningFactions[0] = new jsFracas.Faction(0, "Ocean", "#000033", false);
	jsFracas.owningFactions[1] = new jsFracas.Faction(1, "Unclaimed", "#888888", false); //Unclaimed/unowned countries
	jsFracas.owningFactions[2] = new jsFracas.Faction(2, "Player 1", "#C0392B", true); //Red Player
	jsFracas.owningFactions[3] = new jsFracas.Faction(3, "Player 2", "#E74C3C", false); //Pink player
	jsFracas.owningFactions[4] = new jsFracas.Faction(4, "Player 3", "#9B59B6", false); //Lavender player
	jsFracas.owningFactions[5] = new jsFracas.Faction(5, "Player 4", "#8E44AD", false); //Purple player
	jsFracas.owningFactions[6] = new jsFracas.Faction(6, "Player 5", "#2980B9", false); //Blue Player
	jsFracas.owningFactions[7] = new jsFracas.Faction(7, "Player 6", "#3498DB", false); //Light Blue Player
	jsFracas.owningFactions[8] = new jsFracas.Faction(8, "Player 7", "#1ABC9C", false); //Turquoise Player
	jsFracas.owningFactions[9] = new jsFracas.Faction(9, "Player 8", "#16A085", false); //Seafoam player
	jsFracas.owningFactions[10] = new jsFracas.Faction(10, "Player 9", "#27AE60", false); //Emerald player
	jsFracas.owningFactions[11] = new jsFracas.Faction(11, "Player 10", "#2ECC71", false); //Forest Player
	jsFracas.owningFactions[12] = new jsFracas.Faction(12, "Player 11", "#F1C40F", false); //Yellow Player
	jsFracas.owningFactions[13] = new jsFracas.Faction(13, "Player 12", "#F39C12", false); //Gold Player
	jsFracas.owningFactions[14] = new jsFracas.Faction(14, "Player 13", "#E67E22", false); //Light Orange Player
	jsFracas.owningFactions[15] = new jsFracas.Faction(15, "Player 14", "#D35400", false); //Orange Player
	jsFracas.owningFactions[16] = new jsFracas.Faction(16, "Player 15", "#FFFFFF", false); //White Player
	jsFracas.owningFactions[17] = new jsFracas.Faction(17, "Player 16", "#AED6F1", false); //Sky Blue Player
	
	//Setup musics and SFX
	jsFracas.music[jsFracas.MUSIC_BGM1] = document.getElementById("bgm1");
	jsFracas.soundFX[jsFracas.SFX_INVALID] = document.getElementById("sfxInvalid");
	jsFracas.soundFX[jsFracas.SFX_ATTACK] = document.getElementById("sfxAttack");
	
	//TODO: This needs to be in a form before the game, but lazy dev wants fast tests lol
	//Get the total number of players, who is human/AI, names, and team information
	//Allow for changing the colors
	
	var testNodes = createRandomMap(50, 50);
	
	var gameNodes = createCountryList(testNodes);
	
	var currentPlayers = [jsFracas.owningFactions[2], jsFracas.owningFactions[10], jsFracas.owningFactions[4]];

	gameWrapper = new jsFracas.GameWrapper(gameNodes, gameCamera, currentPlayers, document.getElementById("gameCanvas"), document.getElementById("minimapCanvas"));
	
	jsFracas.music[0].loop = true;
	jsFracas.music[0].play();
	
	if(gameWrapper == null) {
		//Realistically should never happen, but you never know
		alert("[ERROR] Failed instantiate game wrapper");
	}
	
	document.addEventListener('keydown', gameWrapper.handleKeyDown.bind(gameWrapper));
	document.addEventListener('keyup', gameWrapper.handleKeyUp.bind(gameWrapper));
	//document.addEventListener('mousedown', gameWrapper.handleMouseDown.bind(gameWrapper));
	//document.addEventListener('mouseup', gameWrapper.handleMouseUp.bind(gameWrapper));
	gameCanvas.addEventListener('click', gameWrapper.handleClick.bind(gameWrapper));
	
	//NOTE: I *never* recommend grabbing the context menu event in anything except a game
	gameCanvas.addEventListener('contextmenu', gameWrapper.handleRightClick.bind(gameWrapper));
	
	//Setup the game loop using the requestAnimationFrame method
	window.requestAnimationFrame(gameWrapper.update.bind(gameWrapper));
}

/*
 *  Creates an array of fully constructed Country objects.
 *  
 *  This method is pretty hefty, but is only needed for first-time game data initialization
 *  so it's not a terribly huge deal I suppose
 */
function createCountryList(nodeData) {
	var countryList = [];
	var nodeIdCount = 0;
	
	//Parse raw data to create basic countries list
	for(var row = 0; row < nodeData.length; row++) {
		for (var col = 0; col < nodeData[row].length; col++) {
			var nodeId = nodeData[row][col];
			
			//If this is the first node for the country, create a new country
			if(countryList[nodeId] == null) {
				if(nodeId == 0) {
					countryList[nodeId] = new jsFracas.Country(nodeId, "Ocean", jsFracas.owningFactions[0]);
				} else {
					countryList[nodeId] = new jsFracas.Country(nodeId, "Country #" + nodeId, jsFracas.owningFactions[1]);
				}
			}
			
			//Add the new node to the country's node list
			countryList[nodeId].addNode(new jsFracas.Node(nodeIdCount, col * jsFracas.TILE_SIZE, row * jsFracas.TILE_SIZE, col, row));
			nodeIdCount++;
		}
	}
	
	//Iterate through all nodes contained within a country to extract the numeric IDs of neighboring countries and set the border mode
	for(var countryIterator = 0; countryIterator < countryList.length; countryIterator++) {
		var currentCountry = countryList[countryIterator];
		
		if(jsFracas.countryAllowGenerationTroops) {
			var maxRandom = jsFracas.countryMaximumTroopCount - jsFracas.countryMinimumTroopCount;
			var troopCount = Math.floor(Math.random() * maxRandom) + jsFracas.countryMinimumTroopCount;
			if(currentCountry.getOwningFaction().getFactionId() != 0) {
				currentCountry.setTroops(troopCount);
			} else {
				currentCountry.setTroops(0);
			}
		}
		
		var foundNeighborIds = [];
		
		for(var nodeIterator = 0; nodeIterator < currentCountry.getNodeList().length; nodeIterator++) {
			var currentNode = currentCountry.getNodeList()[nodeIterator];
			var tileX = currentNode.getWorldX() / jsFracas.TILE_SIZE;
			var tileY = currentNode.getWorldY() / jsFracas.TILE_SIZE;
			
			//Neighbors can only be in the four cardinal directions, no diagonals
			var westNeighbor = null;
			var eastNeighbor = null;
			var northNeighbor = null;
			var southNeighbor = null;
			
			//Check if N/S/E/W directions are valid within the tile map
			if(tileX - 1 >= 0) {
				westNeighbor = nodeData[tileY][tileX - 1];
			}
			
			if(tileX + 1 < nodeData[tileY].length) {
				eastNeighbor = nodeData[tileY][tileX + 1];
			}
			
			if(tileY - 1 >= 0) {
				northNeighbor = nodeData[tileY - 1][tileX];
			}
			
			if(tileY + 1 < nodeData.length) {
				southNeighbor = nodeData[tileY + 1][tileX];
			}
			
			var nodeBorderMode = 0;
			
			//If neighbors were found, check for setting border information as well as adding to the neighbors list
			if(westNeighbor != null) {
				if(westNeighbor != currentCountry.getId()) {
					nodeBorderMode += jsFracas.BORDER_WEST;
					if(!foundNeighborIds.includes(westNeighbor)) {
						//Add the ID of the neighbor to the neighbor list
						foundNeighborIds[foundNeighborIds.length] = westNeighbor;
					}
				}
			}
			
			if(eastNeighbor != null) {
				if(eastNeighbor != currentCountry.getId()) {
					nodeBorderMode += jsFracas.BORDER_EAST;
					if(!foundNeighborIds.includes(eastNeighbor)) {
						foundNeighborIds[foundNeighborIds.length] = eastNeighbor;
					}
				}
			}
			
			if(northNeighbor != null) {
				if(northNeighbor != currentCountry.getId()) {
					nodeBorderMode += jsFracas.BORDER_NORTH;
					if(!foundNeighborIds.includes(northNeighbor)) {
						foundNeighborIds[foundNeighborIds.length] = northNeighbor;
					}
				}
			}
			
			if(southNeighbor != null) {
				if(southNeighbor != currentCountry.getId()) {
					nodeBorderMode += jsFracas.BORDER_SOUTH;
					if(!foundNeighborIds.includes(southNeighbor)) {
						foundNeighborIds[foundNeighborIds.length] = southNeighbor;
					}
				}
			}
			
			currentNode.setBorderMode(nodeBorderMode);
		}
		
		currentCountry.setNeighbors(foundNeighborIds);
	}
	
	return countryList;
}

/*
 * Create a random tile map for use with the createCountryList method. 
 * TODO: Make this take parameters similar to openFracas to allow fine-tuning of map details
 */
function createRandomMap(width, height) {
	var randomMap = [];
	var nodeIdCount = 1;
	
	console.log("--Generating map size: " + width + " by " + height);
	
	//Initialize the map to pure ocean
	for(var row = 0; row < height; row++){
		randomMap[row] = [];
		for(var col = 0; col < width; col++) {
			randomMap[row][col] = 0;
		}
	}
	
	console.log("--Random map initialized");
	
	var minCountries = Math.floor((width * height) * 0.25);
	var maxCountries = Math.floor((width * height) * 0.3);
	
	var countryNum = Math.floor(Math.random() * maxCountries) + minCountries;
	
	for(var i = 0; i < countryNum; i++) {
		//1 to 6 nodes
		var countryNodeCount = Math.floor(Math.random() * 6);
		var seedY = Math.floor(Math.random() * randomMap.length);
		var seedX = Math.floor(Math.random() * randomMap[seedY].length);
		var growX = seedX;
		var growY = seedY;
		
		if(randomMap[seedY][seedX] == 0) {
			randomMap[seedY][seedX] = nodeIdCount;
		} else {
			continue;
		}
		for(var j = 0; j < countryNodeCount; j++) {
			var growDirection = Math.floor(Math.random() * 4);
			switch(growDirection) {
				case 0:
					//North
					if(seedY - 1 >= 0) {
						growY = seedY - 1;						
					}
					break;
				case 1:
					//East
					if(seedX + 1 < randomMap[seedY].length) {
						growX = seedX + 1;
					}
					break;
				case 2:
					//South
					if(seedY + 1 < randomMap.length) {
						growY = seedY + 1;
					}
					break;
				case 3:
					//West
					if(seedX - 1 >= 0) {
						growX = seedX - 1;
					}
					break;
			}
			
			if(randomMap[growY][growX] != 0) {
				continue;
			} else {
				randomMap[growY][growX] = nodeIdCount;
				seedX = growX;
				seedY = growY;
			}
		}
		
		nodeIdCount++;
	}
	
	return randomMap;
}