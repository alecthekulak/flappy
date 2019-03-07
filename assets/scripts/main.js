let speed = 0.6; 
let gravity = 0.4;
let jump_height = 10;
let appWidth = 500; 
let appHeight = 650; 
let obstacleWidth = 90; 
let gapHeight = 120; 
// Counters, logs, etc
var obstacle_speed, score_counter, past_deaths, past_taps, last_speed, high_score, frames;
var bg_size, ground_size, obstacle_1_trigger, all_dead; 
var i, j, temp; 
var mortal = true; 
// Variables 
let canvas, players, obstacles, generation; 
// AI Run 
var manual = false; 
// var mutation_amount = 0.8; 
var mutation_amount = 0.5; 

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
  if (manual) {
    players = [new Player()]; 
  } else {
    generation = new Population(80); 
    players = generation.members; 
  }

  bg_size = bg_section.width * 1.5;
  ground_size = ground_top.width * 2;
  start(); 
}
  
function draw() {
  frames += speed; 
  if (manual) {
    player_age = players[0].age; 
  } else {
    player_age = generation.age; 
    players = generation.members; 
  }
  // Sky
  background("white");
  tint(255, 100); 
  for (i = 0; i <= 2+~~(appWidth/bg_size); i++) { 
    for (j = 0; j <= ~~(appHeight/bg_size); j++) {
      image(bg_section, bg_size*i - (frames % bg_size), bg_size*j, bg_size, bg_size); // frames -> player_age // to make it stop when he dies
    }
  }
  noTint();
  // Obstacles 
  obstacles[0].update_show(players);
  if (player_age >= obstacle_1_trigger) {
    obstacles[1].update_show(players);
  } 
  if (player_age % 800 == 799) { 
    obstacle_speed *= 1.05; 
  }
  // Ground 
  for (i = 0; i <= 2+~~(appWidth/ground_size); i++) { 
    image(ground_top, ground_size*i - (frames*obstacle_speed % ground_size), appHeight, ground_size, ground_size); //0.35
    for (j = 1; j <= 2+~~(appHeight/ground_size); j++) {
      image(ground_bot, ground_size*i - (frames*obstacle_speed % ground_size), appHeight + ground_size*j, ground_size, ground_size);
    }
  }
  // Is dead? 
  fill(0);
  if (manual && players[0].isDead()) {
    all_dead = true; 
    textSize(70 + past_deaths*2);
    textAlign(CENTER, CENTER); 
    text("YOU LOSE!", appWidth/2, appHeight/2);
  } else if (!manual && generation.dead) {
    all_dead = true; 
    textSize(70);
    textAlign(CENTER, CENTER); 
    text("THEY DEAD!", appWidth/2, appHeight/2);
    start();
  }
  // Score Counter
  textSize(20);
  textAlign(LEFT, CENTER); 
  text("High Score: " + high_score.toString(), 11, 40);
  // Player 
  if (manual) {
    text("Score: " + score_counter.toString(), 11, 18);
    text("Deaths: " + past_deaths.toString(), 11, 62);
    players[0].update(); 
    players[0].show(); 
  } else {
    generation.update(obstacles);
    generation.show();
    text("Generation: " + generation.gen_num.toString(), 11, 18);
    text("Max age: " + round(generation.age).toString(), 11, 62);
  }
}

function start() {
  if (manual && players[0].isDead()) {
    past_deaths++; 
  } else if (!manual && generation.dead) {
    generation.nextGeneration(); 
    players = generation.members; 
  }
  obstacle_speed = 3; //2 //1.75
  players = [new Player()];
  obstacles = [new Obstacle(2 * appHeight / 4), new Obstacle()];
  if (speed == 0) {
    pause(); 
  }
  score_counter = 0; 
  past_taps = 0;
  textSize(20);
  textAlign(LEFT, CENTER); 
  obstacle_1_trigger = (appWidth + 2*obstacleWidth + ((appWidth - obstacleWidth) / 2)) / obstacle_speed; 
  frames = 0;
  all_dead = false; 
}
function touchStarted() {
  mousePressed()
}
function mousePressed() {
  if (0 < mouseX && mouseX <= appWidth &&
      0 < mouseY && mouseY <= windowHeight) { 
    if (manual && players[0].isDead()) {
      past_taps++; 
      if (past_taps >= 3) {
        start(); 
      }
    } else {
      for (i=0; i<players.length; i++) {
        players[i].flap(); 
      }
    }
  } else if (0 < mouseX && mouseX <= appWidth &&
          appHeight <= mouseY && mouseY <= windowHeight) {
    if (manual && players[0].isDead()) {
      start(); 
    }
  }
}
function keyPressed() {
  if (key == ' ') {
    for (i=0; i<players.length; i++) {
      players[i].flap(); 
    }
  } else if (key == 'r' || key == 'R') {
    if (manual || generation.dead) { 
      start(); 
    } 
  } else if (key == 'p' || key == 'P') {
    pause();
  } else if (key == 'a' || key == 'A' || key == 'm' || key == 'M') {
    manual = !manual; 
    high_score = 0;
    start();
  } else if (key == 'f' || key == 'F') {
    speed = 1.8; 
  } else if (!manual && (key == 'k' || key == 'K')) {
    generation.dead = true;
  } else if (key == 's' || key == 'S') {
    if (speed == 0.6) { //1
      speed = 1.2;
    } else if (speed == 1.2) {
      speed = 4.8;
    } else if (speed == 4.8) {
      speed = 9.6;
    } else {
      speed = 0.6;
    }
  }
}
function keyReleased() {
  if (key == 'f' || key == 'F') {
    speed = 0.6; 
  }
}
function pause() {
  if (speed !== 0) {
    last_speed = speed;
    speed = 0; 
  } else {
    speed = last_speed; 
  }
}