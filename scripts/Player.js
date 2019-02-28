class Player{ 
    constructor() {
        this.x = appWidth / 5;
        this.y = appHeight / 2;
        this.speed_y = 0;
        this.dead = false;
        this.age = 0; 
        this.width = 20; 
        this.height = 10; 
        this.flapping = 0; 
    }
    update(obstacles) { 
        if (this.speed_y > 40) {
            this.speed_y = 40;
        } else if (this.speed_y < -20) {
            this.speed_y = -20;
        }
        this.y -= this.speed_y; 
        
        if (this.y <= 0) {
            this.y = 0;
            this.speed_y = 0; 
        }
        this.speed_y -= gravity; 
        this.age++;
        for(obstacle in obstacles){
            if(obstacle.collide(this)){
                this.dead = true; 
            }
        }
        if (this.y >= appHeight) {
            this.dead = true; 
        }
    }
    isDead() {
        return this.dead; 
    }
    flap() {
        this.flapping = 8; 
        this.speed_y += 14; 
    }
    show() {
        if (this.flapping > 0) {
            image(bird_down, this.x, this.y);
            this.flapping -= 1; 
        } else {
            image(bird_up, this.x, this.y);
        }

    }
}