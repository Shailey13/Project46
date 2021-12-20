//variables
var bg_img;
var earth, shooter, alienShip;
var earth_img, shooter_img, alienShip_img, enemyShip_img;
var enemyShip;
var life = 3;
var score = 0;
var bullet;
var enemyShipGroup, bulletGroup;
var heart1, heart2, heart3;
var heart1_img, heart2_img, heart3_img;
var gameOver, gameOver_img;
var gameState = "play";

//images
function preload() {
  bg_img = loadImage("spacebg.png");
  earth_img = loadImage("earth.png");
  shooter_img = loadImage("shooter.png");
  enemyShip_img = loadImage("enemyShip.png");
  bullet_img = loadImage("bullet.png");
  heart1_img = loadImage("heart_1.png");
  heart2_img = loadImage("heart_2.png");
  heart3_img = loadImage("heart_3.png");
  gameOver_img = loadImage("gameOver.png");
}

//creating sprites/ playing window
function setup() {
  createCanvas(windowWidth, windowHeight);

  earth = createSprite(-100, 300, 20, 100);
  earth.addImage(earth_img);
  earth.scale = 3;

  shooter = createSprite(200, 300, 50, 50);
  shooter.addImage(shooter_img);
  shooter.scale = 0.5;

  heart1 = createSprite(1100, 50, 50, 50);
  heart1.addImage(heart1_img);
  heart1.scale = 0.4;
  heart1.visible = false;

  heart2 = createSprite(1100, 50, 50, 50);
  heart2.addImage(heart2_img);
  heart2.scale = 0.4;
  heart2.visible = false;

  heart3 = createSprite(1100, 50, 50, 50);
  heart3.addImage(heart3_img);
  heart3.scale = 0.4;
  //heart3.visible = false;

  gameOver = createSprite(windowWidth/2, windowHeight/2, 50, 50);
  gameOver.addImage(gameOver_img);
  gameOver.visible = false;

  enemyShipGroup = new Group();
  bulletGroup = new Group();
}

function draw() {
  background(bg_img);  
  
  if (gameState == "play") {

    textSize(30);
    fill("");
    text("Score: "+score, 50, 50);
//keyFunctions
  if (keyDown(UP_ARROW)) {
    shooter.y = shooter.y - 5;
  }
  if (keyDown(DOWN_ARROW)) {
    shooter.y = shooter.y + 5;
  }

  if (keyDown(RIGHT_ARROW)) {
    ammunition();
  }

  //controlling shooter movement
  if (shooter.y <= 0 || shooter.y >=560) {
    if (shooter.y <=0) {
      shooter.y = 0;
    }
    if (shooter.y >=560) {
      shooter.y = 560;
    }
  }

  //console.log(life);

  spawnEnemyShips();

  if (enemyShipGroup.isTouching(shooter)) {
    life = life - 1;
    shooter.x = 200;
    shooter.y = 300;
  }
  if (bulletGroup.isTouching(enemyShipGroup)) {
    score = score + 50;
    bulletGroup.destroyEach();
    enemyShipGroup.destroyEach();
  }



  if (life == 2) {
    heart3.visible = false;
    heart2.visible = true;
  }

  if (life == 1) {
    heart2.visible = false;
    heart1.visible = true;
  }

  if (life == 0) {
    heart1.visible = false;
    gameOver.visible = true;
    gameState = "lost";

  }

  if (score == 500) {

    gameState = "won"
  }

}
  drawSprites();


}

//creating enemyShips @ rando pos
function spawnEnemyShips() {
  if (frameCount % 60 == 0) {
    enemyShip = createSprite(1100, random(50, 550), 40, 40);
    enemyShip.addImage(enemyShip_img);
    enemyShip.scale = 0.187;
    enemyShip.velocityX = -5
    enemyShip.lifetime = 400;
    enemyShipGroup.add(enemyShip);
  
  }
}

//creating bullet @ shooter pos
function ammunition() {
  bullet = createSprite(shooter.x, shooter.y);
  bullet.addImage(bullet_img);
  bullet.velocityX = 6;
  bullet.scale = 0.07;
  bulletGroup.add(bullet);
}