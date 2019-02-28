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
        this.height = 10; 
        this.flapping = 0; 
    }
    update() { 
        // Bound maximum speed between -20 and 40 
        if (this.speed_y > 40) {
            this.speed_y = 40;
        } else if (this.speed_y < -20) {
            this.speed_y = -20;
        }
        this.y -= this.speed_y * speed; 
        
        if (this.top() <= 0) {
            // this.y = sprite_top_gap;
            this.y = 0;
            this.speed_y = 0; 
        }
        this.speed_y -= gravity * speed;  
        this.age += 1 * speed;
        if (this.bottom() >= appHeight) {
            this.dead = true; 
            if (manual && speed !== 0) {
                pause(); 
            }
        }
    }
    isDead(yes = false) {
        if (yes) {
            this.dead = true; 
        } 
        return this.dead; 
    }
    flap() {
        this.flapping = 9; 
        if (speed !== 0) {
            this.speed_y += 14; 
        }
    }
    top() {
        return this.y + this.sprite_top_gap; 
    }
    bottom() {
        return this.top() + this.sprite_height; 
    }
    show() {
        if (this.flapping > 0) {
            image(bird_down, this.x, this.y);
            this.flapping -= 1;  
            // height: 16  up: 17
            // 10/11 from top
            // width: 32
        } else {
            image(bird_up, this.x, this.y);
        }

    }
}