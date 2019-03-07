class Player{ 
    sprite_top_gap = 11; 
    sprite_height = 15; 
    constructor() {
        this.x = appWidth / 5;
        this.y = appHeight / 2;
        this.speed_y = 1;
        this.dead = false;
        this.dead_counter = 0;
        this.age = 0; 
        this.score = 0; 
        this.width = 32; 
        this.height = 32; 
        this.flapping = 0; 
        this.angle = 0; 
    }
    update(_) { 
        // Bound maximum speed between -20 and 24 //edit this?, top speed especially  
        this.speed_y -= gravity * speed;  
        this.speed_y = constrain(this.speed_y, -20, 20);
        this.y -= this.speed_y * speed; 
        // If dead, move along with obstacles 
        if (this.dead) {
            this.dead_counter -= obstacle_speed * speed * 1.5;
            this.y = constrain(this.y, this.sprite_top_gap - (50*this.dead), windowHeight-this.height);
        } else {
            this.score = score_counter; 
        }
        // Constrain between top and bottom of area
        if (!this.dead && this.top() <= 0) {
            this.y = 0;
            this.speed_y = 0; 
        } else if (this.bottom() >= appHeight) {
            this.y = appHeight - this.height;
            this.speed_y = 0; 
            this.isDead(true);
        }
        // Increment age and angle 
        this.age += speed * !this.dead;
        if (!this.dead && this.speed_y > this.angle) { 
            this.angle += speed; 
        } else if (!this.dead && this.speed_y < this.angle) {
            this.angle -= speed;
        }
    }
    isDead(yes = false) {
        if (yes && mortal && !this.dead) {
            past_taps = 0; 
            this.dead = true; 
            this.speed_y += 10;
            this.angle += 20; 
        } 
        return this.dead; 
    }
    flap() {
        this.flapping = 10; 
        if (speed !== 0) {
            this.speed_y += jump_height; 
        }
    }
    top() {
        return this.y + this.sprite_top_gap; 
    }
    bottom() {
        return this.top() + this.sprite_height; 
    }
    show() {
        push(); 
        imageMode(CENTER);
        translate(this.x + this.dead_counter, this.y);
        if (speed !== 0) {
            rotate(radians(-2.5*this.angle)); //4.5 //choppy at slower speeds 
        }
        imageMode(CORNER)
        if (this.flapping > 0) {
            image(bird_down, 0, 0);
            this.flapping -= 1 * speed; 
        } else {
            image(bird_up, 0, 0);
        }
        pop(); 
    }
    // For AI: 
    observeEnvironment(obstacles) {
        var observed_variables = []; 
        // Speed Y, Height Y, X Dist Nearest Obst, Gap Height Nearest Obst, Time Since Flap
        observed_variables[0] = this.speed_y; // Verticle speed 
        observed_variables[1] = this.y; // Verticle height 
        var nearest_obstacle_distance = appWidth; 
        var nearest_obstacle = obstacles[0];
        for (var j=0; j<obstacles.length; j++){
            if (obstacles[j].right() >= this.x && obstacles[j].left() <= nearest_obstacle_distance) {
                nearest_obstacle = obstacles[j]; 
                nearest_obstacle_distance = obstacles[j].left(); 
            }
        }
        observed_variables[2] = nearest_obstacle_distance; // Distance to nearest obstacle 
        observed_variables[3] = nearest_obstacle.gap_y(); // Gap height for nearest obstacle 
        observed_variables[4] = this.flapping; // How long it has been since last flap  
        return observed_variables; 
    }
    reset() {
        this.x = appWidth / 5;
        this.y = appHeight / 2;
        this.speed_y = 1;
        this.dead = false;
        this.dead_counter = 0;
        this.age = 0; 
        this.score = 0; 
        this.flapping = 0; 
        this.angle = 0; 
    }
}