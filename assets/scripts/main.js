let speed = 1; 
let gravity = 0.5; 
let appWidth = 500; 
let appHeight = 650; 
let obstacleWidth = 90; // 60
let gapHeight = 120; 
let canvas;
// 
var score_counter, past_deaths, past_taps; 
var manual = true; 
// Variables 
var obstacle_0, obstacle_1; 
var bird_down, bird_up; 

function preload() {
  bird_down = loadImage("assets/images/bird_down_wings.png");
  bird_up = loadImage("assets/images/bird_up_wings.png");
  obs_bot_1 = loadImage("assets/images/bottom_obstacle.png");
  obs_bot_2 = loadImage("assets/images/bottom_obstacle2.png");
  obs_top_1 = loadImage("assets/images/top_obstacle.png");
  obs_top_2 = loadImage("assets/images/top_obstacle2.png");
  // bird_down = loadImage("../assets/images/bird_down_wings.png"); // no
  // bird_down = loadImage("./assets/images/bird_down_wings.png"); 
  // bird_down = loadImage("/assets/images/bird_down_wings.png");
  // bird_down = loadImage("assets/images/bird_down_wings.png"); //works? 
  // bird_down = loadImage("../images/bird_down_wings.png");
  // bird_down = loadImage("./images/bird_down_wings.png");
  // bird_down = loadImage("/images/bird_down_wings.png");
  // bird_down = loadImage("images/bird_down_wings.png");
}

function setup() {
  canvas = createCanvas(appWidth, windowHeight);
  if (windowHeight < appHeight) {
    appHeight = windowHeight - 15; 
  }
  // frameRate(60);
  canvas.parent('p5Container');
  past_deaths = 0; 
  noStroke();
  player = new Player(); 
  start(); 
}
  
function draw() {
  // Sky
  background("white");
  // Obstacles 
  obstacle_0.update_show(player);
  // Ground 
  if (player.isDead()) {
    fill(0);
    textSize(70 + past_deaths);
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
  // Score Counter
  fill(0);
  textSize(20);
  textAlign(LEFT, CENTER); 
  text("Score: " + score_counter.toString(), 11, 18);
  text("Past deaths: " + past_deaths.toString(), 11, 38);
  // github.io code doesn't reflect changes made on github.com?
  // textSize(40);
  // textAlign(LEFT, CENTER); 
  // text("window height: " + windowHeight.toString(), appWidth / 4, 50);
  // text("display height: " + displayHeight.toString(), appWidth / 4, 100);
  // text("window width: " + windowWidth.toString(), appWidth / 4, 150);
  // text("display width: " + displayWidth.toString(), appWidth / 4, 200);
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
  if (player.isDead()) {
    past_deaths++; 
  }  
  player = new Player(); 
  obstacle_0 = new Obstacle(2 * appHeight / 4);
  obstacle_1 = new Obstacle();
  if (speed == 0) {
    pause(); 
  }
  score_counter = 0; 
  textSize(20);
  textAlign(LEFT, CENTER); 
  past_taps = 0
}

function touchStarted() {
  if (0 < touchX && touchX <= appWidth &&
      0 < touchY && touchY <= appHeight) {
    if (manual && !player.isDead()) {
      player.flap(); 
    } else if (manual && player.isDead()) {
      past_taps++; 
      if (past_taps >= 3) {
        start(); 
      }
    }
  } else if (0 < touchX && touchX <= appWidth &&
          appHeight <= touchY && touchY <= windowHeight) {
    if (manual && player.isDead()) {
      start(); 
    }
  }
}
function mousePressed() {
  if (0 < mouseX && mouseX <= appWidth &&
      0 < mouseY && mouseY <= appHeight) {
    if (manual && !player.isDead()) {
      player.flap(); 
    } else if (manual && player.isDead()) {
      past_taps++; 
      if (past_taps >= 3) {
        start(); 
      }
    }
  } else if (0 < mouseX && mouseX <= appWidth &&
          appHeight <= mouseY && mouseY <= windowHeight) {
    if (manual && player.isDead()) {
      start(); 
    }
  }
}

function keyPressed() {
  if (key == ' ') {
    if (manual && !player.isDead()) {
      player.flap(); 
    }
  } else if (key == 'r' || key == 'R') {
    if (manual && player.isDead()) {
      start(); 
    }
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