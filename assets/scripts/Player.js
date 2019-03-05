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
        // Bound maximum speed between -20 and 24 //edit this?, top speed especially  
        this.speed_y -= gravity * speed;  
        this.speed_y = constrain(this.speed_y, -20, 20);
        this.y -= this.speed_y * speed; 

        if (this.top() <= 0) {
            this.y = 0;
            this.speed_y = 0; 
        } else if (this.bottom() >= windowHeight) {
            this.isDead(true);
            this.y = windowHeight - this.height;
            this.speed_y = 0; 
        }
        this.age += speed;
        if (this.bottom() > appHeight) {
            this.isDead(true);
        }
        if (this.speed_y > this.angle) { 
            this.angle += 1; 
        } else if (this.speed_y < this.angle) {
            this.angle -= 1;
        }
    }
    isDead(yes = false) {
        if (yes && mortal) {
            past_taps = 0; 
            this.dead = true; 
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
        rotate(radians(-2.5*this.angle)); //4.5 //choppy at slower speeds 
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