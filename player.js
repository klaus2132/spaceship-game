class Player {
    constructor(ctx) {
      this.ctx = ctx;
      this.width = 420;
      this.height = 150;
      this.y = 200;//this.ctx.canvas.height - this.height;
      this.x = 0;
      this.spritesCount = 5;
      this.spriteNumber = 0;
      this.img = new Image();
      this.img.src = "./images/spaceship.player.png";
      this.speedY = 0;
    }


    up(){
        console.log('were going up');
        if(this.y != 0) this.y -= 30;
    }

    down(){
        console.log('were going down');
        if(this.y != -0) this.y += 30;
    }

      move(frameId) {
        //this.y += this.speedY;
    
      }


  
    animate(frameId) {
      this.spriteNumber = Math.floor((frameId / 10) % this.spritesCount);
    }
  
    draw(frameId) {
      this.animate(frameId);
      const sx = 0;//this.spriteNumber * this.width;
      const sy = this.spriteNumber * 150;
      const sWidth = this.width;
      const sHeight = this.height;
      const dx = this.x
      const dy = this.y
      const dWidth = this.width * 0.5;
      const dHeight = this.height * 0.5;
  
      this.ctx.drawImage(
        this.img,
        sx,
        sy,
        sWidth,
        sHeight,
        dx,
        dy,
        dWidth,
        dHeight
      );
    }
  }