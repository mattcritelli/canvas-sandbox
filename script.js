var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var circleArray = [];

// c stands for context
var c = canvas.getContext('2d');

var mouse = {
  x: undefined,
  y: undefined
}
var maxRadius = 50;
var minRadius = 10;

var colorArray = [
  '#012530',
  '#28544B',
  '#ACBD86',
  '#FFD6A0',
  '#FF302C'
]

function colorBg() {
  c.fillStyle = '#1ed2f4'
  c.fillRect(0, 0, innerWidth, innerHeight)
}

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})

window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
})

// Create new circle object
function Circle(x, y, dx, dy, radius, color, fill) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = color;
  this.fill = fill;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.fill;
    c.fill();
  }

  this.update = function() {
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
      this.dx = -this.dx;
    }
    if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
      this.dy = -this.dy;
    }
    this.y += this.dy;
    this.x += this.dx;

    if(this.x - mouse.x < 50 && this.x - mouse.x > -50
      && this.y - mouse.y < 50 && this.y - mouse.y > -50
      ) {
      if(this.radius < maxRadius){
        this.radius += 1;
      }
    } else if(this.radius > this.minRadius){
      this.radius -= 1;
    }
    this.draw();
  }
}

// Use for-loop to create circles and push into array
function init() {
  circleArray = [];
  for(var i = 0; i < 1500; i++){
    var radius = Math.random() * 5 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5)*4;
    var dy = (Math.random() - 0.5)*4;
    var color = colorArray[Math.floor(Math.random()*colorArray.length)];
    var fill = colorArray[Math.floor(Math.random()*colorArray.length)];
    circleArray.push(new Circle(x, y, dx, dy, radius, color, fill))
  }
}

// Define animate function
function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight)
  colorBg();

  for(var i = 0; i < circleArray.length; i++){
    circleArray[i].update();
  }
}

init();

animate();
