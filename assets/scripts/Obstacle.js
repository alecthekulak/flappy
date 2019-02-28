class Obstacle{
    constructor(gap = -100){
        this.generate_obstacles(gap);
    }
    generate_obstacles(gap){
        if (gap <= 0 || gap > appHeight) {
            gap = floor(random(gapHeight, appHeight - gapHeight));
        }
        this.top = new Obstacle_Component(gap, true);
        this.bot = new Obstacle_Component(gap, false);

    }
    collide(player){
        if (this.top.collide(player) || this.bot.collide(player)) { 
            return true;
        } 
        return false; 
    }
    onScreen(){
        return (this.top.x + obstacleWidth) > 0; 
    }
    update_show(player){
        if (!this.onScreen()) {
            this.generate_obstacles(-player.age);
            score_counter++; 
        }
        this.top.update(player);
        this.bot.update(player);
        this.top.show(); 
        this.bot.show(); 
    }

}

class Obstacle_Component{ 
    constructor(gap, top = true){
        this.x = appWidth;
        if (top) {
            this.height = gap - (gapHeight / 2);
            this.y = 0; 
        } else {
            this.y = gap + (gapHeight / 2)
            this.height = appHeight - (gap + (gapHeight / 2));
        }
    }
    collide(player){
        if (player.x + player.width >= this.x && 
            player.x <= this.x + obstacleWidth && 
            player.bottom() >= this.y && 
            player.top() <= this.y + this.height){
                // player.y + player.height
                // player.y
            return true;
        }
        return false;
    }
    update(player){ 
        if (this.collide(player)) {
            player.isDead(true);
        }
        this.x -= 2 * speed;
    }
    show(){
        fill(11, 102, 35);
        if (this.top) {
            rect(this.x, this.y, obstacleWidth, this.height);
        } else {
            rect(this.x, this.y, obstacleWidth, this.height);
        }
    }
}