class Player{ 
    sprite_top_gap = 11; 
    sprite_height = 15; 
    constructor() {
        this.x = appWidth / 5;
        this.y = appHeight / 2;
        this.speed_y = 0;
        this.dead = false;
        this.age = 0; 
        this.score = 0; 
        this.width = 32; 
        this.height = 32; 
        this.flapping = 0; 
        this.angle = 0; 
    }
    update() { 
        // If dead, move along with obstacles 
        if (this.isDead()) {
            this.x -= obstacle_speed * speed * 1.5;
            this.y = constrain(this.y, this.sprite_top_gap-50*this.dead, windowHeight-this.height);
        }
        // Bound maximum speed between -20 and 24 //edit this?, top speed especially  
        this.speed_y -= gravity * speed;  
        this.speed_y = constrain(this.speed_y, -20, 20);
        this.y -= this.speed_y * speed; 
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
            this.angle += 1; 
        } else if (!this.dead && this.speed_y < this.angle) {
            this.angle -= 1;
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
        this.flapping = 9; 
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
        translate(this.x, this.y);
        rotate(radians(-2.5*this.angle));
        // rotate(radians(-2.5*this.angle)); //4.5 //choppy at slower speeds 
        imageMode(CORNER)
        if (this.flapping > 0) {
            image(bird_down, 0, 0);
            this.flapping -= 1; 
        } else {
            image(bird_up, 0, 0);
        }
        pop(); 

    }
}