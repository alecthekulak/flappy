class Obstacle{ 
    constructor(height, top = true){
        this.x = appWidth;
        this.height = height; 
        if (top) {
            this.y = appHeight;
        } else {
            this.y = 0; 
        }
    }
    collide(object){
        if (object.x + object.width >= this.x && 
            object.x <= this.x + obstacleWidth && 
            object.y + object.height >= this.y && 
            object.y <= this.y + this.height){
            return true;
        }
        return false;
    }
    onScreen(){
        if (this.x + obstacleWidth > 0) {
            return true;
        }
        return false; 
    }
    update(player){ 
        if (this.collide(player)) {
            // player.dead = true; 
            player.isDead(true);
        }
        this.x -= 2 * speed;
    }
    show(){
        fill(153, 102, 51);
        if (this.top) {
            rect(this.x, this.y, obstacleWidth, -this.height);
        } else {
            rect(this.x, this.y, obstacleWidth, -this.height);
        }
    }
}