/*
	This file contains the logic and variables to run the editor menu
*/

const CANVAS_WIDTH = 800; //The width of the canvas object for drawing
const CANVAS_HEIGHT = 800; //The height of the canvas object for drawing
const TILE_SIZE = 32; //Tiles are 32px by 32px squares

//The level data for the level we're making
var levelData = {};

//The "camera". We're just using a rectangle to track rendering offsets 
var camera = {};

//The canvas object, represents the actual canvas element shown to the user in the DOM
var gCanvas = null;

//Holds the interval for the game for pausing and such, likely to not matter for the editor as much as the game
var gameInterval = null;

function init() {
	console.log("----Beginning Init----");
	
	//Prompt the user for map dimension information
	var tileWidth = prompt("Please enter map width in tiles");
	var tileHeight = prompt("Please enter map height in tiles");
	
	//If they gave us something that isn't numeric, make them do it again.
	//This is not elegant error handling since it just spams them constantly to re-enter,
	//but should be sufficient for our purposes.
	while(isNaN(tileWidth) || isNaN(tileHeight)) {
		alert("Values entered must be numeric");
		tileWidth = prompt("Please enter map width in tiles");
		tileHeight = prompt("Please enter map height in tiles");
	}
	
	//Setup the levelData object to contain the information we care about
	levelData.mapWidth = parseInt(tileWidth);
	levelData.mapHeight = parseInt(tileHeight);
	levelData.nodes = [];
	
	//Initialize the camera, which is really just a basic rectangle
	camera.w = CANVAS_WIDTH;
	camera.h = CANVAS_HEIGHT;
	camera.x = 0;
	camera.y = 0;
	
	gCanvas = document.getElementById("gameCanvas");
	console.log(gCanvas);
	
	//Add the document level event listeners
	document.addEventListener("keydown", handleKeyDown);
	document.addEventListener("keyup", handleKeyUp);
	document.addEventListener("mousemove", handleMouseMove);
	document.addEventListener("click", handleClick);
	
	//Set interval for rendering and update loop
	
	
	console.log("----Finished Init----");
}

function handleKeyDown(e) {
	console.log(e);
}

function handleKeyUp(e) { 
	console.log(e);
}

function handleMouseMove(e) {
}

function handleClick(e) { 
	var clientX = e.clientX;
	var clientY = e.clientY;
	
	var clientBoundingRect = gCanvas.getBoundingClientRect();
	var canvasX = clientBoundingRect.x;
	var canvasY = clientBoundingRect.y;
	
	var localX = clientX - canvasX;
	var localY = clientY - canvasY;
	if(localX > 0 && localY > 0 
		&& localX < (canvasX + clientBoundingRect.width) 
		&& localY < (canvasY + clientBoundingRect.height)) {
		console.log("Canvas was clicked. Local co-ords: (" + localX + "," + localY + ")");
	}
	console.log("Client: (" + clientX + "," + clientY + ")");
	console.log("Canvas: (" + canvasX + "," + canvasY + ")");
	
}


