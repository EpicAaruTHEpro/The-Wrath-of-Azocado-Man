//image variables for the characters
var azocadoImg, bombchuImg, canopusImg, derpyImg, funkydunkyImg, gefImg, kingkuffImg, siriusImg, tojiImg, caveImg, groundImg, restartImg, canopusJailed, tojiJailed, siriusJailed, thunderImg, fireImg;
var gef, derpy, kingkuff, bombchu, funkydunky, azocado, canopus, sirius, toji;
var ground, restart;
var thunder, fire;
var health = 3;
var gameState = "PLAY";

//preloads images
function preload() {
  azocadoImg = loadImage("characters/Azocado.png");
  bombchuImg = loadImage("characters/Bombchu.png");
  canopusImg = loadImage("characters/Canopus.png");
  canopusJailed = loadImage("characters/CanopusJailed.png");
  derpyImg = loadImage("characters/Derpy.png");
  funkydunkyImg = loadImage("characters/FunkyDunky.png");
  gefImg = loadImage("characters/Gef.png");
  kingkuffImg = loadImage("characters/KingKuff.png");
  siriusImg = loadImage("characters/sirius.png");
  siriusJailed = loadImage("characters/siriusJailed.png");
  tojiImg = loadImage("characters/toji.png");
  tojiJailed = loadImage("characters/tojiJailed.png");
  caveImg = loadImage("characters/cave.png");
  groundImg = loadImage("characters/ground.png");
  restartImg = loadImage("characters/restart.png");
  thunderImg = loadImage("characters/thunder.png");
  fireImg = loadImage("characters/fire.png");
}

function setup() {
  createCanvas(800,400);

  ground = createSprite(400,392, 400, 20);
  ground.addImage(groundImg);
  ground.x = camera.position.x;
  gef = createSprite(400, 150, 50, 50);
  gef.addImage(gefImg);
  gef.scale =2;
  derpy = createSprite(1000, 270, 50, 50);
  derpy.addImage(derpyImg);
  bombchu = createSprite(2000, 270, 50, 50);
  bombchu.addImage(bombchuImg);
  kingkuff = createSprite(3000, 280, 50, 50);
  kingkuff.addImage(kingkuffImg);
  kingkuff.scale = 0.38;
  azocado = createSprite(4000, 280, 50, 50);
  azocado.addImage(azocadoImg);
  azocado.scale = 0.95;
  canopus = createSprite(2100, 70, 50, 50);
  canopus.addImage(canopusJailed);
  toji = createSprite(1100, 70, 50, 50);
  toji.addImage(tojiJailed);
  sirius = createSprite(3100, 70, 50, 50);
  sirius.addImage(siriusJailed);
  restart = createSprite(camera.position.x+400, 200, 50, 50);
  restart.addImage(restartImg);
  restart.scale = 2;
  restart.visible = false;
}

function draw() {
  background(caveImg);
  camera.position.x = gef.x;
  ground.x = camera.position.x;

  if (ground.x < camera.position.x-400) {
    ground.x = camera.position.x;
  }

  if (gameState === "PLAY") {
    if (keyDown("d")) {
      gef.x+=5;
    }

    if (keyDown("a")) {
      gef.x-=5;
    }

    gef.velocityY +=1;


    if (keyDown("space") && gef.y > 250) {
      gef.velocityY = -10;
    }

    if (keyDown(UP_ARROW)) {
      thunder = createSprite(camera.position.x, 200, 30, 200);
      thunder.addImage(thunderImg);
      thunder.scale = 0.4;
    }

    if (keyDown(RIGHT_ARROW)) {
      fire = createSprite(camera.position.x+150, 280, 200, 30);
      fire.addImage(fireImg);
      fire.scale = 0.25;
    }

    if (frameCount%12 === 0) {
      //thunder.destroy();
    }

    if (gef.isTouching(derpy) && gef.y <= 260) {
      toji.addImage(tojiImg);
      console.log(derpy.x);
      //derpy.destroy();
    }

    else if (gef.isTouching(derpy) && gef.y > 260){
      health-=1;
    }

    if (gef.isTouching(kingkuff) && gef.y <= 260) {
      sirius.addImage(siriusImg);
      kingkuff.destroy();
    }

    else if (gef.isTouching(kingkuff) && gef.y > 260){
      health-=1;
    }

    if (gef.isTouching(bombchu) && gef.y <= 260) {
      canopus.addImage(canopusImg);
      bombchu.destroy();
    }

    else if (gef.isTouching(bombchu) && gef.y > 260){
      health-=1;
    }

    if (gef.isTouching(azocado) && gef.y <= 260) {
      azocado.destroy();
    }

    else if (gef.isTouching(azocado) && gef.y > 260){
      health-=1;
    }

    if (health === 0) {
      gameState = "END";
    }
  }

  else if (gameState === "END") {
    gef.x = 400;
    restart.visible = true;
  }

  if (mousePressedOver(restart) && gameState === "END") {
    
    health = 3;
    toji.addImage(tojiJailed);
    canopus.addImage(canopusJailed);
    sirius.addImage(siriusJailed);
    gameState = "PLAY";
    restart.visible = false;
  }

  gef.collide(ground);
  derpy.collide(ground);
  bombchu.collide(ground);
  kingkuff.collide(ground);
  azocado.collide(ground);
  drawSprites();
  //console.log(health);
}