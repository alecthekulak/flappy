let speed = 1; 
let gravity = 0.5; 
let appWidth = 500; 
let appHeight = 650; 
let obstacleWidth = 60; 
let gapHeight = 120; 
var score_counter; 
var manual = true; 
var obstacle_0; 

var bird_down, bird_up; 

function preload() {
  bird_down = loadImage("../assets/images/bird_down_wings.png");
  bird_down = loadImage("./assets/images/bird_down_wings.png");
  bird_down = loadImage("/assets/images/bird_down_wings.png");
  bird_down = loadImage("assets/images/bird_down_wings.png");
  bird_down = loadImage("../images/bird_down_wings.png");
  bird_down = loadImage("./images/bird_down_wings.png");
  bird_down = loadImage("/images/bird_down_wings.png");
  bird_down = loadImage("images/bird_down_wings.png");
  bird_up = loadImage("../assets/images/bird_up_wings.png");
}

function setup() {
  let canvas = createCanvas(appWidth, windowHeight);
  // frameRate(60);
  canvas.parent("page_body");
  if (windowHeight < appHeight) {
    appHeight = windowHeight - 15; 
  }
  start(); 
}
  
function draw() {
  background("white");
  // Ground 
  if (player.isDead()) {
    fill(0);
    textSize(70);
    textAlign(CENTER, CENTER); 
    text("YOU LOSE!", appWidth/2, appHeight/2);
    fill(255, 0, 0);
    if (speed !== 0 && manual) {
      pause();
    }
  } else { 
    fill(153, 102, 51);
  }
  rect(0, appHeight, appWidth, windowHeight - appHeight);
  // Obstacles 
  obstacle_0.update_show(player);
  // Score Counter
  fill(0);
  textSize(20);
  textAlign(LEFT, CENTER); 
  text("Score: " + score_counter.toString(), 11, 18);
  // Maybe instructions on buttons to press over the Earth? 
  // Temp
  // text("player age:" + player.age.toString(), appWidth / 4, 250);
  // text("player top:" + player.top().toString(), appWidth / 4, 250);
  // text("player y:" + player.y.toString(), appWidth / 4, 300);
  // Player 
  player.update(); 
  player.show(); 

}

function start() {
  player = new Player(); 
  obstacle_0 = new Obstacle(2 * appHeight / 4);
  obstacle_1 = new Obstacle();
  if (speed == 0) {
    pause(); 
  }
  score_counter = 0; 
  textSize(20);
  textAlign(LEFT, CENTER); 
}


function mousePressed() {
  // Check if mouse is inside the circle
  // var d = dist(mouseX, mouseY, appWidth/2, appHeight/2);
  if (0 < mouseX && mouseX <= appWidth &&
      0 < mouseY && mouseY <= appHeight) {
    if (manual) {
      player.flap(); 
    }
    
  }
}

function keyPressed() {
  if (key == ' ') {
    if (manual) {
      player.flap(); 
    }
  } else if (key == 'r' || key == 'R') {
    start(); 
  } else if (key == 'p' || key == 'P') {
    pause();
  }
}
function pause() {
  if (speed !== 0) {
    speed = 0; 
  } else {
    speed = 1; 
  }
}