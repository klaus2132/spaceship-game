class Enemies {
    constructor(ctx, x0, y0) {
      this.ctx = ctx;
      this.speedX = Math.floor(Math.random()* -10);
      this.speedY = 0;
      this.width = 70;
      this.height = 70;
      this.x = x0 - this.width - 20;
      this.y = (y0 - this.height - Math.floor(Math.random()* this.ctx.canvas.height));
      this.img = new Image();
      this.img.src = "./images/enemies1.png";
    }
  
    move(frameId) {
      this.x += this.speedX;
      this.y += this.speedY;
    }
  
    draw(frameId) {
      if (!this.img) this.ctx.fillRect(this.x, this.y, this.width, this.height);
      else this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }