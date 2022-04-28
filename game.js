//game.js
class Game{
  
screen = 0;
points = 0;
scoreBoard = document.getElementById("score-number")
ctx = null;
frameId = null;
background = null;
sounds= new Sounds();
player = null;
enemies= [];
astro = [];


//----------------------------initalizion------------------------------

init() {
    if (this.ctx === null) {
      this.ctx = document.getElementById("canvas").getContext("2d");
    }
    this.setEventHandlers();
    this.start();
  }

//----------------------------start-------------------------------------

start() {
    switch (this.screen) {
      case 0:
        this.displaySplashStart();
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        this.ctx.fillRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "yellow";
        this.ctx.textAlign = "center";
        this.ctx.font = "bold 32px 'Press Start 2P'";
        this.ctx.fillText(
            `Are you ready to save some Astronauts?`,
            this.ctx.canvas.width/2,
            this.ctx.canvas.height/2
        );
        this.ctx.restore();
        break;
      case 1:
        this.reset();
        this.frameId = window.requestAnimationFrame(this.play.bind(this));
        break;
      case 2:
          console.log('screen 2')
          this.displayGameOver();
          this.ctx.fillStyle = "rgba(0,0,0,0.8)";
          this.ctx.fillRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
          this.ctx.fillStyle = "yellow";
          this.ctx.textAlign = "center";
          this.ctx.font = "bold 32px 'Press Start 2P'";
          this.ctx.fillText(
              `That hurt...`,
              this.ctx.canvas.width/2,
              this.ctx.canvas.height/2
          );
          this.ctx.restore();
        break;
      default:
        console.log("This screen code is unknown!");
    }
}

//------------------------setEventHandlers-------------------------------------

setEventHandlers() {
    window.addEventListener("keydown", (event) => {
      if (event.code === "ArrowDown") this.player.down();
    });
    window.addEventListener("keydown", (event) => {
        if(event.code === "ArrowUp") this.player.up();
    });
  }

//---------------------------displaySplashStart------------------------------------

    displaySplashStart(){
        const startButton = document.createElement("button");
        startButton.id = "game-start";
        startButton.textContent = "Start Game";
        startButton.onclick = () => {
          this.screen = 1;
          this.start();
          startButton.remove();
        };
        document.body.appendChild(startButton);
      }

//------------------------------displayGameOver-----------------------------------

      displayGameOver(){
        const restartButton = document.createElement("button");
        restartButton.id = "restart";
        restartButton.textContent = "Restart";
        restartButton.onclick = () => {
          this.screen = 1;
          this.start();
          restartButton.remove();
        };
        document.body.appendChild(restartButton);

      }

//--------------------------------generateObjects---------------------------------

      generateEnemies() { // making enemies
        if (this.frameId > 100) {
          if (this.frameId % 50 === 0) {
            //console.log("Enemies generated");
            this.enemies.push(
              new Enemies(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height)
            );
          }
        }
      }

      generateAstro() { //making astronauts
        if (this.frameId > 100) {
          if (this.frameId % 150 === 0) {
            //console.log("Astro generated");
            this.astro.push(
              new Astro(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height)
            );
          }
        }
      }

//--------------------------------checkingForCollisions------------------------------

      checkCollisions() { 
        this.enemies = this.enemies.filter(
          (obstacle) => obstacle.x + obstacle.width > 0
        );
        if(this.enemies.some((enemy) => 
            this.player.x <= enemy.x + enemy.width &&
            this.player.x + this.player.width * 0.4 >= enemy.x &&  

            this.player.y <= enemy.y + enemy.height &&
            this.player.y + this.player.height * 0.4 >= enemy.y
        )){
            return true
        }
      }

      checkCollisionsWithAstro(){
        this.astro = this.astro.filter(
            (obstacle) => obstacle.x + obstacle.width > 0
          );
          if(this.astro.some((enemy) => 
              this.player.x <= enemy.x + enemy.width &&
              this.player.x + this.player.width * 0.4 >= enemy.x &&  
  
              this.player.y <= enemy.y + enemy.height &&
              this.player.y + this.player.height * 0.4 >= enemy.y
          )){
              return true;
          }
        };    

//---------------------------------------GameOverFunction-----------------------------
    
      gameOver(){
        if(this.checkCollisions()){
            window.cancelAnimationFrame(this.frameId)
            this.screen = 2;
            this.start();
            this.sounds.play("gameOver");
        };
      }

//------------------------------------printPoints---------------------------------------

      printPoints(){
        if(this.checkCollisionsWithAstro()){
            console.log('fghjklølkjhgf')
             this.scoreBoard.innerText = this.points +1;
            }
      }

//-------------------------------------resetFunction----------------------------------

      reset(){
        this.background = new Background(this.ctx);
        this.player = new Player(this.ctx);
        this.enemies = [];
        this.astro = [];
        this.sounds.play("main");
        this.points = 0;
      }

//--------------------------------------gameOverScreen--------------------------------


//-----------------------------------------play-----------------------------------------
  
  play() {
      this.background.move(this.frameId);
      this.player.move(this.frameId);
      this.printPoints();
      this.generateEnemies();
      this.generateAstro();
      this.enemies.forEach((obstacle) => obstacle.move(this.frameId));
      this.astro.forEach((obstacle) => obstacle.move(this.frameId));
      this.checkCollisions();
      this.checkCollisionsWithAstro();
      this.background.draw(this.frameId);
      this.player.draw(this.frameId);
      this.enemies.forEach((obstacle) => obstacle.draw(this.frameId));
      this.astro.forEach((obstacle) => obstacle.draw(this.frameId));
      this.frameId = requestAnimationFrame(this.play.bind(this));
      this.gameOver();
  
  }
}

//--------------------------------done--------------------------------------------------