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
            if (score_counter > high_score) {
                high_score = score_counter; 
            }
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
        this.top = top;
        if (top) {
            this.height = gap - (gapHeight / 2);
            this.y = 0; 
        } else {
            this.y = gap + (gapHeight / 2)
            this.height = appHeight - (gap + (gapHeight / 2));
        }
    }
    collide(player){
        if (player.x + player.width > this.x && 
            player.x < this.x + obstacleWidth && 
            player.bottom() > this.y && 
            player.top() < this.y + this.height){
            return true;
        }
        return false;
    }
    // update_all(players) {
    //     for (player in players) {
    //         if (this.collide(player)) {

    //         }
    //     }
    // }
    // update(player){ 
    //     if (this.collide(player)) {
    //         player.isDead(true);
    //     }
    //     this.x -= obstacle_speed * speed;
    // }
    update(player){ 
        if (this.collide(player)) {
            player.isDead(true);
        }
        this.x -= obstacle_speed * speed;
    }
    show(){
        fill(75, 20);
        if (this.top == true) {
            rect(this.x, this.y, obstacleWidth, this.height);
            if (past_deaths % 2 == 0){
                image(obs_top_1, this.x, this.y - 1000 + this.height, obstacleWidth, 1000);
            } else {
                image(obs_top_2, this.x, this.y - 1000 + this.height, obstacleWidth, 1000);
            }
        } else {
            rect(this.x, this.y, obstacleWidth, this.height);
            if (past_deaths % 2 == 0){
                image(obs_bot_1, this.x, this.y, obstacleWidth, 1000);
            } else {
                image(obs_bot_2, this.x, this.y, obstacleWidth, 1000);
            }
        }
    }
}