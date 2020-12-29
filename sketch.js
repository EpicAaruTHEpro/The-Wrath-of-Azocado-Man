//image variables for the characters
var azocadoImg, bombchuImg, canopusImg, derpyImg, funkydunkyImg, gefImg, kingkuffImg, siriusImg, tojiImg, caveImg, groundImg, restartImg, canopusJailed, tojiJailed, siriusJailed, thunderImg, fireImg, waterImg;
var hitSound, gameMusic, deathSound;
var gef, derpy, kingkuff, bombchu, funkydunky, azocado, canopus, sirius, toji;
var ground, restart;
var thunder, fire, water, fireGroup, thunderGroup, waterGroup;
var health = 3;
var gameState = "PLAY";
var count = 0;
var spaceNum = 0;
var downNum = 0;
var rightNum = 0;
var upNum = 0;

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
  waterImg = loadImage("characters/water.png");
  gameMusic = loadSound("characters/OST.mp3");
  hitSound = loadSound("characters/HIT.mp3");
  deathSound = loadSound("characters/GAMEOVER.mp3");
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
  fireGroup = new Group();
  thunderGroup = new Group();
  waterGroup = new Group();
  gameMusic.play();
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

    if (keyDown(UP_ARROW) && count>2) {
      if (frameCount%50 === 0) {
        thunder = createSprite(camera.position.x+100, 200, 30, 200);
        thunder.addImage(thunderImg);
        thunder.scale = 0.4;
        thunder.lifetime = 20;
        thunderGroup.add(thunder);
      }
    }

    if (keyDown(RIGHT_ARROW) && count>0) {
      if (frameCount%40 === 0) {
        fire = createSprite(camera.position.x+150, 280, 200, 30);
        fire.addImage(fireImg);
        fire.scale = 0.25;
        fire.lifetime = 20;
        fireGroup.add(fire);
      }
    }

    if (keyDown(DOWN_ARROW) && count >1) {
      if (frameCount%40 === 0) {
        water = createSprite(camera.position.x+150, 270, 40, 200);
        water.addImage(waterImg);
        water.scale = 0.3;
        water.lifetime = 20;
        waterGroup.add(water);
      }
    }

    //console.log(count);

    if (gef.isTouching(derpy) && gef.y <= 260) {
      toji.addImage(tojiImg);
      //console.log(derpy.x);
      derpy.destroy();
      Swal.fire(
        'Good job!',
        'You freed Toji!',
        'success'
      )
      count = 1;
      hitSound.play();
    }

    else if (gef.isTouching(derpy) && gef.y > 260){
      health-=1;
    }

    if (gef.isTouching(kingkuff) && gef.y <= 260) {
      sirius.addImage(siriusImg);
      kingkuff.destroy();
      Swal.fire(
        'Good job!',
        'You freed Sirius!',
        'success'
      )
      count = 3;
      hitSound.play();
    }

    else if (gef.isTouching(kingkuff) && gef.y > 260){
      health-=1;
    }

    if (gef.isTouching(bombchu) && gef.y <= 260) {
      canopus.addImage(canopusImg);
      bombchu.destroy();
      Swal.fire(
        'Good job!',
        'You freed Canopus!',
        'success'
      )
      count = 2;
      hitSound.play();
    }

    else if (gef.isTouching(bombchu) && gef.y > 260){
      health-=1;
    }

    if (gef.isTouching(azocado) && gef.y <= 260 && spaceNum === 0) {
      //azocado.destroy();
      //console.log(spaceNum);
      spaceNum=1;
      
      hitSound.play();
    }

    else if (gef.isTouching(azocado) && gef.y > 260 && spaceNum === 0 && downNum === 0 && rightNum === 0 && upNum === 0){
      health-=1;
    }

    if (fireGroup.isTouching(derpy)) {
      toji.addImage(tojiImg);
      derpy.destroy();
    }

    if (thunderGroup.isTouching(derpy)) {
      toji.addImage(tojiImg);
      derpy.destroy();
    }

    if (waterGroup.isTouching(derpy)) {
      toji.addImage(tojiImg);
      derpy.destroy();
    }

    if (fireGroup.isTouching(kingkuff)) {
      sirius.addImage(siriusImg);
      kingkuff.destroy();
      Swal.fire(
        'Good job!',
        'You freed Sirius!',
        'success'
      )
      hitSound.play();
      count = 3;
    }

    if (thunderGroup.isTouching(kingkuff)) {
      sirius.addImage(siriusImg);
      kingkuff.destroy();
    }

    if (waterGroup.isTouching(kingkuff)) {
      sirius.addImage(siriusImg);
      kingkuff.destroy();
      Swal.fire(
        'Good job!',
        'You freed Sirius!',
        'success'
      )
      hitSound.play();
      count = 3;
    }

    if (fireGroup.isTouching(bombchu)) {
      canopus.addImage(canopusImg);
      bombchu.destroy();
      Swal.fire(
        'Good job!',
        'You freed Canopus!',
        'success'
      )
      hitSound.play();
      count = 2;
    }

    if (thunderGroup.isTouching(bombchu)) {
      canopus.addImage(canopusImg);
      bombchu.destroy();
    }

    if (waterGroup.isTouching(bombchu)) {
      canopus.addImage(canopusImg);
      bombchu.destroy();
    }

    if (thunderGroup.isTouching(azocado) && upNum === 0) {
      //azocado.destroy();
      upNum=1;
      
      hitSound.play();
    }

    if (fireGroup.isTouching(azocado) && rightNum === 0) {
      //azocado.destroy();
      rightNum=1;
      
      hitSound.play();
    }

    if (waterGroup.isTouching(azocado) && downNum === 0) {
      //azocado.destroy();
      downNum=1;
      
      hitSound.play();
    }

    if (spaceNum+downNum+rightNum+upNum === 4 && gameState === "PLAY") {
      Swal.fire(
        'Good job!',
        'You saved the world!',
        'success'
      )
      gameState = "END";
      azocado.destroy();
    }

    if (health === 0) {
      gameMusic.stop();
      deathSound.play();
      gameState = "END";
    }
  }

  else if (gameState === "END") {
    gameMusic.stop();
    gef.x = 400;
    restart.visible = true;
  }

  if (mousePressedOver(restart) && gameState === "END") {
    deathSound.stop();
    gameMusic.play();
    health = 3;
    count = 0;
    spaceNum = 0;
    downNum = 0;
    rightNum = 0;
    upNum = 0;
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

function keyPressed() {
  
}