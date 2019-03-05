let speed = 0.6; 
let gravity = 0.4; // 1
let jump_height = 10; // 14
let appWidth = 500; 
let appHeight = 650; 
let obstacleWidth = 90; 
let gapHeight = 120; 
// Counters, logs, etc
var obstacle_speed, score_counter, past_deaths, past_taps, last_speed, high_score;
var bg_size, ground_size, obstacle_2_trigger; 
var i, j; 
var manual = true; 
var mortal = true; 
// Variables 
let canvas, player, obstacle_0, obstacle_1; 
// AI Run 
var population; 

function preload() {
  bird_down = loadImage("assets/images/bird_down_wings.png");
  bird_up = loadImage("assets/images/bird_up_wings.png");
  obs_bot_1 = loadImage("assets/images/bottom_obstacle.png");
  obs_bot_2 = loadImage("assets/images/bottom_obstacle2.png");
  obs_top_1 = loadImage("assets/images/top_obstacle.png");
  obs_top_2 = loadImage("assets/images/top_obstacle2.png");
  bg_section = loadImage("assets/images/bg_section.png");
  ground_top = loadImage("assets/images/ground_top.png");
  ground_bot = loadImage("assets/images/ground_bot.png");
}

function setup() { // Make a title screen
  canvas = createCanvas(appWidth, windowHeight);
  if (windowHeight < appHeight) {
    appHeight = windowHeight - 15; 
  } 
  if (windowWidth <= appWidth * 2.3) {
    var right_textbox = select("#right-section"); 
    right_textbox.hide();
  }
  frameRate(60);
  canvas.parent('p5Container');
  past_deaths = high_score = 0; 
  noStroke();
  player = new Player(); 
  bg_size = bg_section.width * 1.5;
  ground_size = ground_top.width * 2;
  start(); 
}
  
function draw() {
  // Sky
  background("white");
  tint(255, 100); 
  for (i = 0; i <= 2+~~(appWidth/bg_size); i++) { 
    for (j = 0; j <= ~~(appHeight/bg_size); j++) {
      image(bg_section, bg_size*i - (player.age % bg_size), bg_size*j, bg_size, bg_size);
    }
  }
  noTint();
  // Obstacles 
  obstacle_0.update_show(player);
  if (player.age >= obstacle_1_trigger) {
    obstacle_1.update_show(player);
  } 
  if (player.age % 800 == 799) { 
    obstacle_speed *= 1.05; 
  }
  // Ground 
  for (i = 0; i <= 2+~~(appWidth/ground_size); i++) { 
    image(ground_top, ground_size*i - (player.age*0.35 % ground_size), appHeight, ground_size, ground_size);
    for (j = 1; j <= 2+~~(appHeight/ground_size); j++) {
      image(ground_bot, ground_size*i - (player.age*0.35 % ground_size), appHeight + ground_size*j, ground_size, ground_size);
    }
  }
  // Is dead? 
  fill(0);
  if (player.isDead()) {
    textSize(70 + past_deaths*2);
    textAlign(CENTER, CENTER); 
    text("YOU LOSE!", appWidth/2, appHeight/2);
    if (speed !== 0 && manual) {
      pause();
    }
  }
  // Score Counter
  textSize(20);
  textAlign(LEFT, CENTER); 
  text("Score: " + score_counter.toString(), 11, 18);
  text("High Score: " + high_score.toString(), 11, 40);
  text("Deaths: " + past_deaths.toString(), 11, 62);
  // text("age: " + player.age.toString(), 11, 84);
  // text("speed: " + speed.toString(), 11, 60);
  // text("trigger: " + obstacle_1_trigger.toString(), 11, 80);
  // Player 
  player.update(); 
  player.show(); 
}

function start() {
  if (player.isDead()) {
    past_deaths++; 
  }  
  obstacle_speed = 3; //2 //1.75
  player = new Player(); 
  obstacle_0 = new Obstacle(2 * appHeight / 4);
  obstacle_1 = new Obstacle();
  if (speed == 0) {
    pause(); 
  }
  score_counter = 0; 
  past_taps = 0;
  textSize(20);
  textAlign(LEFT, CENTER); 
  obstacle_1_trigger = (appWidth + 2*obstacleWidth + ((appWidth - obstacleWidth) / 2)) / obstacle_speed; 
}
function touchStarted() {
  mousePressed()
}
function mousePressed() {
  if (0 < mouseX && mouseX <= appWidth &&
      0 < mouseY && mouseY <= windowHeight) { //appHeight
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
    if (manual) { // && player.isDead()
      start(); 
    }
  } else if (key == 'p' || key == 'P') {
    pause();
  } else if (key == 's' || key == 'S') {
    if (speed == 1) {
      speed = 0.6;
    } else {
      speed = 1;
    }
  }
}
function pause() {
  if (speed !== 0) {
    last_speed = speed;
    speed = 1; 
  } else {
    speed = last_speed; 
  }
}