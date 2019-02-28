let speed = 1; 
let gravity = 0.5; 
let appWidth = 500;
let appHeight = 650; 
var manual = true; 

var bird_down, bird_up; 
var all_obstacles; 

function preload() {
  bird_down = loadImage("images/bird_down_wings.png");
  bird_up = loadImage("images/bird_up_wings.png");
}

function setup() {
  let canvas = createCanvas(appWidth, windowHeight);
  canvas.parent("page_body");
  player = new Player(); 
  if (windowHeight < appHeight) {
    appHeight = windowHeight - 15; 
  }

}
  
function draw() {
  background("white");
  if (player.isDead()) {
    fill(255, 0, 0);
  } else { 
    fill(153, 102, 51);
  }
  rect(0, appHeight, appWidth, windowHeight - appHeight);
  player.update();
  player.show(); 

}

function keyPressed() {
  if (key == ' ') {
    if (manual) {
      player.flap(); 
    }
  } else if (key == 'r' || key == 'R') {
    player = new Player();
  }
}