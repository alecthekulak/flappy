class Obstacle{
    constructor(gap = -100){
        this.generate_obstacles(gap);
    }
    generate_obstacles(gap){
        if (gap <= 0 || gap > appHeight) {
            gap = floor(random(gapHeight, appHeight - gapHeight));
        }
        this.gap = gap; 
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
    left() {
        return this.top.x; 
    }
    right() {
        return this.top.x + obstacleWidth; 
    }
    update_show(players){
        if (!this.onScreen()) {
            if (manual) {
                player_age = players[0].age; 
            } else {
                player_age = generation.age; 
            }
            this.generate_obstacles(-player_age);
            if (!all_dead) {
                score_counter++; 
                if (score_counter > high_score) {
                    high_score = score_counter; 
                }

            }
        }
        this.top.update(players);
        this.bot.update(players);
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
    update(players){ 
        for (i=0; i<players.length; i++) {
            if (this.collide(players[i])) {
                players[i].isDead(true);
            }
        }
        this.x -= obstacle_speed * speed;
    }
    // update(player){ 
    //     if (this.collide(player)) {
    //         player.isDead(true);
    //     }
    //     this.x -= obstacle_speed * speed;
    // }
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