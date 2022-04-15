(function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  //canvas.width = 700;
  canvas.height = 500;
  var h = canvas.height;
  var w = window.innerWidth;
  //var w = canvas.width;
  var particles = [];
  var string = ["#d902ee", "#ffd79d", "#f162ff", "#320d3e"];
  var maxvelocity = 1.7;
  let pTimestamp = 0;

  class Particle {
    constructor() {
      this.x = Math.floor(Math.random() * w) + 1;
      this.y = Math.floor(Math.random() * h) + 1;
      this.velocityX = Math.random() * (2 * maxvelocity) - maxvelocity;
      this.velocityY = Math.random() * (2 * maxvelocity) - maxvelocity;
      this.color = string[Math.floor(Math.random() * 4)];
    }
    drawp() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
    respawn() {
      this.x = Math.floor(Math.random() * w) + 1;
      this.y = Math.floor(Math.random() * h) + 1;
    }
  }

  function tick(timestamp) {
    requestAnimationFrame(tick);
    clear();
    pTimestamp = timestamp;
    canvas.width = window.innerWidth;
    w = canvas.width;
    for (var i in particles) {
      if (
        particles[i].x > w + 2 ||
        particles[i].x < -2 ||
        particles[i].y > h + 2 ||
        particles[i].y < 0 - 2
      ) {
        particles[i].respawn();
      }
      if (particles[i].x >= w || particles[i].x <= 0) {
        particles[i].velocityX = -1 * particles[i].velocityX;
      }
      if (particles[i].y >= h || particles[i].y <= 0) {
        particles[i].velocityY = -1 * particles[i].velocityY;
      }

      particles[i].x += particles[i].velocityX;
      particles[i].y += particles[i].velocityY;
      particles[i].drawp();
    }
    for (var i = 0; i < particles.length; i++) {
      for (var j = 0; j < particles.length; j++) {
        let c = Math.sqrt(
          Math.pow(particles[j].x - particles[i].x, 2) +
            Math.pow(particles[j].y - particles[i].y, 2)
        );
        if (c < 200) {
          ctx.beginPath();

          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.lineWidth = 1;
          //ctx.strokeStyle = "rgba(255, 255, 255," + (1 - c / 200) + ")";
          ctx.strokeStyle = "rgba(255, 255, 255," + (1 - c / 200) + ")";
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function init() {
    requestAnimationFrame(tick);

    for (var i = 0; i < 40; i++) {
      particles.push(new Particle());
    }
    particles.forEach((x) => {
      x.drawp();
    });
  }

  init();
})();
