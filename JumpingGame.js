var player;
var obstacle;
var obstacles = [];

var curScore = 0;
var maxScore = 0;

function setup() {
  createCanvas(400, 400);
  colorMode(RGB, 255);
  player = new Player(width/2, height/2);
}

function draw() {
  background(51);
  stroke(255, 255, 255);
  line(0, height/2, width, height/2);
  noStroke();
  
  var r = random(100);
  if(r > 98){
    obstacles.push(new Obstacle());
  }
  
  player.update();
  
  for(var i = obstacles.length - 1; i >= 0; i--){
    if(obstacles[i].x <= -obstacles[i].w){
      if(!obstacles[i].hit)
        curScore++;
      obstacles.splice(i, 1);
    }
  }
  
  fill(255, 255, 255);
  textSize(32);
  text("Current Score: " + curScore, 10, 34);
  if(curScore > maxScore)
    maxScore = curScore;
  text("Max Score: " + maxScore, 10, height - 34);
  
  for(var i = 0; i < obstacles.length; i++){
    obstacles[i].update();
    if(((player.x > obstacles[i].x && player.x < (obstacles[i].x + obstacles[i].w)) || ((player.x + player.w > obstacles[i].x && (player.x + player.w) < (obstacles[i].x + obstacles[i].w)))) && (player.y > (obstacles[i].y - obstacles[i].h))){
      if(!obstacles[i].hit){
        curScore--;
        obstacles[i].hit = true;
        obstacles[i].c = color(255, 0, 0);
      }
    }
  }
  
  if(keyIsDown(32))
    player.jump();
  if(keyIsDown(37) || keyIsDown(65))
    player.xv = -player.speed;
  if(keyIsDown(39) || keyIsDown(68))
    player.xv = player.speed;
}

function Obstacle(){
  this.c = color(255, 255, 255);
  this.x = width;
  this.y = height/2;
  this.xv = random(2,4);
  this.yv = 0;
  this.w = 20;
  this.h = 20;
  this.gravity = 1;
  this.grounded = true;
  this.hit = false;
  
  this.update = function(){
    this.x -= this.xv;
    this.y -= this.yv;
    fill(this.c);
    rect(this.x, this.y - this.h, this.w, this.h);
    fill(255, 255, 255);
  }
}

function Player(x, y){
  this.x = x;
  this.y = y;
  this.xv = 0;
  this.yv = 0;
  this.w = 20;
  this.h = 40;
  this.speed = 4;
  this.gravity = 1;
  this.grounded = true;
  
  this.jump = function(){
    if(this.grounded){
      this.yv += 11;
      this.grounded = false;
    }
  }
  
  this.update = function(){
    this.x += this.xv;
    this.x = constrain(this.x, 0, width - this.w);
    this.y -= this.yv;
    if(!this.grounded)
      this.yv -= this.gravity;
    if(this.y > (height/2)){
      this.yv = 0;
      this.y = height/2;
      this.grounded = true;
    }
    this.xv = 0;
    rect(this.x, this.y - this.h, this.w, this.h);
  }
}