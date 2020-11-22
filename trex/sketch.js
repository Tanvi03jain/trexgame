var trex;
var trex_animation;
var trex_collided;
var ground;
var g2;
var gImage
var edge
var cloud, cloudGroup,cImage;
var obstacle1, obstacle2, obstacle3, obstacle4,obstacle5, obstacle6;
var obstacle, obstacleGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, goImage;
var restart , rImage;

function preload()
{
  trex_animation = loadAnimation("trex1.png","trex3.png","trex4.png");
  gImage = loadImage("ground2.png");
  cImage =loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  goImage = loadImage("gameOver.png");
  rImage = loadImage("restart.png");
  trex_collided = loadAnimation("trex_collided.png");
}

function setup()
{
  createCanvas(600,200);
  trex = createSprite(200,150,30,30);
  trex.addAnimation ("running",trex_animation);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  ground = createSprite(200,180,800,20);
  ground.addImage("ground",gImage);
  ground.x= ground.width/2;
  g2 = createSprite(200,190,400,20);
  g2.visible = false;
  edge = createEdgeSprites();
  obstacleGroup = createGroup();
  cloudGroup = createGroup();
  gameOver = createSprite(300,110,20,20);
  gameOver.addImage(goImage);
  gameOver.visible = false;
  gameOver.scale = 0.5;
  restart = createSprite(300,140,20,20);
  restart.addImage(rImage);
  restart.visible = false;
}

function draw()
{
  background("white");
  console.log(trex.y)
  
  if(gameState === 1)
    {
  if (keyDown("space") && trex.y >= 147)
  {
trex.velocityY = -10;
  }
  trex.velocityY = trex.velocityY + 0.5
  
  trex.collide(g2);
  
   ground.velocityX = -3;
  if (ground.x<0)
  {
    ground.x = ground.width/2;
  }
  
  score = score + Math.round(getFrameRate()/60);
  
  spawnCloud();
  spawnObstacle();
  if(obstacleGroup.isTouching(trex))
    {
      gameState = 0;
    }
    }
  if(gameState === 0)
    {
      trex.velocityY = 0;
      ground.velocityX = 0;
      cloudGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
      cloudGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
      gameOver.visible = true;
      restart.visible = true;
      trex.changeAnimation("collided",trex_collided)
    }
  
  if(mousePressedOver(restart))
    {
      reset();
    }
  text("score :"+ score,520,50);
  drawSprites();
  
}

function spawnCloud()
{
  if (World.frameCount% 60 === 0)
   { 
  cloud = createSprite(600,random(80,120),20,20);
  cloud.addImage(cImage);
  cloud.scale = 0.5;
  cloud.velocityX = -2;
  cloud.lifetime = 300;
  cloudGroup.add(cloud);
  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1;
   }
}

function spawnObstacle()
{
  if (World.frameCount% 80 === 0)
    {
      obstacle = createSprite(600,160,20,20);
      obstacle.velocityX = -2;
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
      obstacleGroup.add(obstacle);
      var r = Math.round(random(1,6));
      switch(r)
        {
          case 1: obstacle.addImage(obstacle1);
          break;
          case 2: obstacle.addImage(obstacle2);
          break;
          case 3: obstacle.addImage(obstacle3);
          break;
          case 4: obstacle.addImage(obstacle4);
          break;
          case 5: obstacle.addImage(obstacle5);
          break;
          case 6: obstacle.addImage(obstacle6);
          break;
          default: break;
        }
    }
}

function reset()
{
  gameState = 1;
  obstacleGroup.destroyEach();
  gameOver.visible = false;
  cloudGroup.destroyEach();
  restart.visible = false;
  trex.changeAnimation("running",trex_animation);
  score = 0;
}