const strongColors = ["#9C5400", "#9C2100", "#9C7100"]
const weakColors = ["#371E00", "#370C00", "#372800"]

class PolyrhythmPie {
    constructor(rad, sub, colorIndex, canvas) {
      this.rad = rad;
      this.sub = sub;
      this.strongColor = strongColors[colorIndex];
      this.weakColor = weakColors[colorIndex];
      this.alpha = (2 * Math.PI) / sub;
      this.theta = 0;
      this.progress = 0;
      this.innerPie = null;
      this.canvas = canvas;
    }

    draw(progress) {
        let ctx = this.canvas.getContext('2d');
        let x0 = this.canvas.width/2;
        let y0 = this.canvas.height/2;
        for (var i = 0; i < this.sub; i++){
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          let gamma =
            i * this.alpha - this.alpha / 2 + progress * this.alpha + this.theta;
          this.progress = progress;
          ctx.arc(x0, y0, this.rad, gamma, gamma + this.alpha);
          ctx.lineTo(x0, y0);
          ctx.strokeStyle = "white";
          ctx.shadowColor = "white";
          ctx.shadowBlur = 4;
          ctx.fillStyle = i == 0 ? this.strongColor : this.weakColor;
          ctx.fill();
          ctx.stroke();
        }
        if (this.innerPie) this.innerPie.draw(this.innerPie.progress);
      }
    
      incrementTheta() {
        this.theta += this.alpha;
        this.theta = this.theta % (2 * Math.PI);
      }
    
      animate({ timing, duration }) {
        let start = performance.now();
        let pie = this;
    
        requestAnimationFrame(function animate(time) {
          // timeFraction goes from 0 to 1
          let timeFraction = (time - start) / duration;
          if (timeFraction > 1) {
            timeFraction = 1;
          }
    
          // calculate the current animation state
          let progress = timing(timeFraction);
          pie.draw(progress); // draw it
    
          if (timeFraction < 1) {
            requestAnimationFrame(animate);
          }
        });
        pie.incrementTheta();
      }
}

export{PolyrhythmPie}