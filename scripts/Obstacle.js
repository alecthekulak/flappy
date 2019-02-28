class Obstacle{ 
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 
    }
    collide(object){
        if (object.x >= this.x && 
            object.x + object.width <= this.x + this.width && 
            object.y >= this.y && 
            object.y + object.height <= this.y + this.height){
            return true;
        }
        return false;
    }
    onScreen(){
        if (this.x + this.width > 0) {
            return true;
        }
        return false; 
    }
    update(obstacles){ 
        this.age++;
        for(obstacle in obstacles){
            if(obstacle.collide(this)){
                this.dead = true; 
            }
        }
    }
    show(){

    }
}