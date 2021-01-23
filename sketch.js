var jungleImage, jungle;
var monkey , monkey_running;
var banana ,bananaImage,bananaGroup;
var obstacle, obstacleImage,obstacleGroup;
var bananaGroup, obstacleGroup;
var invisibleGround;
var score;

function preload(){
  
jungleImage = loadImage("jungle.jpg");
  
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 canvas = createCanvas(displayWidth-20,displayHeight-30);

jungle = createSprite(displayWidth-300,displayHeight-10,displayWidth+100,displayHeight);
jungle.addImage(jungleImage);
jungle.scale = 2;
jungle.velocityX = -6;

monkey = createSprite(50,400,50,50);
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.2;
  
invisibleGround = createSprite(50,450,400,10);
invisibleGround.visible = false;

bananaGroup = new Group();
obstacleGroup = new Group();

score = 0;
  
}


function draw() {
  
if(jungle.x<0){
jungle.x = jungle.width/2;
}

monkey.collide(invisibleGround);

if(keyDown("space")&& monkey.y>100) {
monkey.velocityY = -13;
}

monkey.velocityY = monkey.velocityY + 0.8;

spawnBananas();
spawnObstacles();

if(bananaGroup.isTouching(monkey)){
score = score+2;
bananaGroup.destroyEach();
}

switch(score){
case 10: monkey.scale = 0.12;
break;
case 20: monkey.scale = 0.14;
break;
case 30: monkey.scale = 0.16;
break;
case 40: monkey.scale = 0.18;
default: break;
}

text("score"+score, 400,50);

if(monkey.isTouching(obstacleGroup)){
textSize(50);
fill("black");
text("GAME OVER!",400,400);
}
  
  drawSprites();
}

function spawnBananas(){
  
if(frameCount % 80 === 0){
banana = createSprite(200,240,10,10);
banana.y = Math.round(random(120,200));
banana.addImage(bananaImage);
banana.scale = 0.1;
banana.velocityX = -5;
banana.lifetime = 150;
  
banana.depth = monkey.depth;
monkey.depth = monkey.depth + 1;

bananaGroup.add(banana);
  
}
}

function spawnObstacles(){
if(frameCount % 100 === 0){
obstacle = createSprite(300,400,10,10);
obstacle.velocityX = -6;
obstacle.addImage(obstacleImage);
obstacle.scale = 0.2; 
obstacle.x = Math.round(random(120,200));   
obstacle.lifetime = 80;

obstacleGroup.add(obstacle);
}
}




