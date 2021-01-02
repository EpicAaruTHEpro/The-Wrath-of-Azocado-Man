//image variables for the characters
var azocadoImg, bombchuImg, canopusImg, derpyImg, funkydunkyImg, gefImg, kingkuffImg, siriusImg, tojiImg, caveImg, groundImg, restartImg, canopusJailed, tojiJailed, siriusJailed, thunderImg, fireImg, waterImg;
//variables for the sounds
var hitSound, gameMusic, deathSound;
//variables for the characters
var gef, derpy, kingkuff, bombchu, funkydunky, azocado, canopus, sirius, toji;
//variables for game elements
var ground, restart;
var thunder, fire, water, fireGroup, thunderGroup, waterGroup;
//health bar variable
var health = 3;
//gamestate variable
var gameState = "PLAY";
//variable for progression (how many elements player has) 
var count = 0;
//variables for the number of times a key is pressed
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

//setup function
function setup() {
  //creates canvas
  createCanvas(800,400);

  //creates the ground and makes it follow the camera
  ground = createSprite(400,392, 400, 20);
  ground.addImage(groundImg);
  ground.x = camera.position.x;
  //creates the main player, gef
  gef = createSprite(400, 150, 50, 50);
  gef.addImage(gefImg);
  gef.scale =2;
  //creates a boss, derpy
  derpy = createSprite(1000, 270, 50, 50);
  derpy.addImage(derpyImg);
  //creates a boss, bombchu
  bombchu = createSprite(2000, 270, 50, 50);
  bombchu.addImage(bombchuImg);
  //creates a boss, king kuff
  kingkuff = createSprite(3000, 280, 50, 50);
  kingkuff.addImage(kingkuffImg);
  kingkuff.scale = 0.38;
  //creates the villain, azocado man
  azocado = createSprite(4000, 280, 50, 50);
  azocado.addImage(azocadoImg);
  azocado.scale = 0.95;
  //creates a star ally, canopus
  canopus = createSprite(2100, 70, 50, 50);
  canopus.addImage(canopusJailed);
  //creates a star ally, toji
  toji = createSprite(1100, 70, 50, 50);
  toji.addImage(tojiJailed);
  //creates a star ally, sirius
  sirius = createSprite(3100, 70, 50, 50);
  sirius.addImage(siriusJailed);
  //creates restart button
  restart = createSprite(camera.position.x+400, 200, 50, 50);
  restart.addImage(restartImg);
  restart.scale = 2;
  restart.visible = false;
  //creates groups for the elemental powers
  fireGroup = new Group();
  thunderGroup = new Group();
  waterGroup = new Group();
  //plays the game music
  gameMusic.play();
}

//draw function where everything repeats
function draw() {
  //displays the background as the cave image
  background(caveImg);
  //sets the camera position to gef position and ground position to camera position
  camera.position.x = gef.x;
  ground.x = camera.position.x;

  //loops ground if its x value is less than camera.position.x-400
  if (ground.x < camera.position.x-400) {
    ground.x = camera.position.x;
  }

  //gamestate play condition
  if (gameState === "PLAY") {
    //moves gef left and right with the d and a arrow keys
    if (keyDown("d")) {
      gef.x+=5;
    }

    if (keyDown("a")) {
      gef.x-=5;
    }

    //gravity on gef
    gef.velocityY +=1;

    

    //makes gef jump if space bar is pressed and gef is on the ground
    if (keyDown("space") && gef.y > 250) {
      gef.velocityY = -10;
    }

    //makes gef use his thunder power if he presses up arrow key and he has unlocked it
    if (keyDown(UP_ARROW) && count>2) {
      if (frameCount%50 === 0) {
        thunder = createSprite(camera.position.x+100, 200, 30, 200);
        thunder.addImage(thunderImg);
        thunder.scale = 0.4;
        thunder.lifetime = 20;
        thunderGroup.add(thunder);
      }
    }

    //makes gef use his fire power if he presses right arrow key and he has unlocked it
    if (keyDown(RIGHT_ARROW) && count>0) {
      if (frameCount%40 === 0) {
        fire = createSprite(camera.position.x+150, 280, 200, 30);
        fire.addImage(fireImg);
        fire.scale = 0.25;
        fire.lifetime = 20;
        fireGroup.add(fire);
      }
    }

    //makes gef use his water power if he presses down arrow key and he has unlocked it
    if (keyDown(DOWN_ARROW) && count >1) {
      if (frameCount%40 === 0) {
        water = createSprite(camera.position.x+150, 270, 40, 200);
        water.addImage(waterImg);
        water.scale = 0.3;
        water.lifetime = 20;
        waterGroup.add(water);
      }
    }

    //frees toji, displays a message, and unlocks fire power if gef jumps on derpy
    if (gef.isTouching(derpy) && gef.y <= 260) {
      toji.addImage(tojiImg);
      //destroys derpy
      derpy.destroy();
      Swal.fire(
        'Good job!',
        'You freed Toji!',
        'success'
      )
      //unlocks fire power
      count = 1;
      //plays hit sound
      hitSound.play();
    }

    //kills gef if he touches derpy on the ground
    else if (gef.isTouching(derpy) && gef.y > 260){
      health-=1;
    }

    //frees sirius, displays a message, and unlocks thunder power if gef jumps on king kuff
    if (gef.isTouching(kingkuff) && gef.y <= 260) {
      sirius.addImage(siriusImg);
      //destroys king kuff
      kingkuff.destroy();
      Swal.fire(
        'Good job!',
        'You freed Sirius!',
        'success'
      )
      //unlocks thunder
      count = 3;
      //plays hit sound
      hitSound.play();
    }

    //kills gef if he touches king kuff on the ground
    else if (gef.isTouching(kingkuff) && gef.y > 260){
      health-=1;
    }

    //frees canopus, displays a message, and unlocks water power if gef jumps on bombchu
    if (gef.isTouching(bombchu) && gef.y <= 260) {
      canopus.addImage(canopusImg);
      //destroys bombchu
      bombchu.destroy();
      Swal.fire(
        'Good job!',
        'You freed Canopus!',
        'success'
      )
      //unlocks water
      count = 2;
      //plays hit sound
      hitSound.play();
    }

    //kills gef if he touches bombchu on the ground
    else if (gef.isTouching(bombchu) && gef.y > 260){
      health-=1;
    }

    //damages azocado if gef jumps on azocado
    if (gef.isTouching(azocado) && gef.y <= 260 && spaceNum === 0) {
      //damage variable for jump increased
      spaceNum=1;
      //plays hit sound
      hitSound.play();
    }

    //kills gef if he touches azocado man on the ground and azocado man has not been damaged at all
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

    //frees sirius, displays a message, and unlocks thunder power if gef burns king kuff
    if (fireGroup.isTouching(kingkuff)) {
      sirius.addImage(siriusImg);
      //destroys king kuff
      kingkuff.destroy();
      Swal.fire(
        'Good job!',
        'You freed Sirius!',
        'success'
      )
      //plays hit sound
      hitSound.play();
      //unlocks thunder
      count = 3;
    }

    if (thunderGroup.isTouching(kingkuff)) {
      sirius.addImage(siriusImg);
      kingkuff.destroy();
    }

    //frees sirius, displays a message, and unlocks thunder power if gef water sprays king kuff
    if (waterGroup.isTouching(kingkuff)) {
      sirius.addImage(siriusImg);
      //destroys king kuff
      kingkuff.destroy();
      Swal.fire(
        'Good job!',
        'You freed Sirius!',
        'success'
      )
      //plays hit sound
      hitSound.play();
      //unlocks thunder
      count = 3;
    }

    //frees canopus, displays a message, and unlocks water power if gef burns bombchu
    if (fireGroup.isTouching(bombchu)) {
      canopus.addImage(canopusImg);
      //destroys bombchu
      bombchu.destroy();
      Swal.fire(
        'Good job!',
        'You freed Canopus!',
        'success'
      )
      //plays hit sound
      hitSound.play();
      //unlocks water
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

    //damages azocado man if gef shocks azocado man
    if (thunderGroup.isTouching(azocado) && upNum === 0) {
      //damage variable for thunder increased
      upNum=1;
      //plays hit sound
      hitSound.play();
    }

    //damages azocado man if gef burns azocado man
    if (fireGroup.isTouching(azocado) && rightNum === 0) {
      //damage variable for fire increased
      rightNum=1;
      //plays hit sound
      hitSound.play();
    }

    //damages azocado man if he water sprays azocado man
    if (waterGroup.isTouching(azocado) && downNum === 0) {
      //damage variable for water increased
      downNum=1;
      //plays hit sound
      hitSound.play();
    }

    //kills azocado man if he has been hit by all the powers and it saves the world
    if (spaceNum+downNum+rightNum+upNum === 4 && gameState === "PLAY") {
      Swal.fire(
        'Good job!',
        'You saved the world!',
        'success'
      )
      //sets gamestate to end
      gameState = "END";
      //destroys azocado man
      azocado.destroy();
    }

    //sets gamestate to end if gef dies
    if (health === 0) {
      //stops game music and plays death sound
      gameMusic.stop();
      deathSound.play();
      //sets gamestate to end
      gameState = "END";
    }
  }

  //resets gef's position if gamestate is equal to end
  else if (gameState === "END") {
    //stops game music
    gameMusic.stop();
    //resets gef's position
    gef.x = 400;
    //displays restart button
    restart.visible = true;
  }

  //game reset conditional
  if (mousePressedOver(restart) && gameState === "END") {
    //stops death sound and plays game music
    deathSound.stop();
    gameMusic.play();
    //resets gef's health, powers, and azocado damages
    health = 3;
    count = 0;
    spaceNum = 0;
    downNum = 0;
    rightNum = 0;
    upNum = 0;
    //recreates enemy sprites
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
    //rejails star allies
    toji.addImage(tojiJailed);
    canopus.addImage(canopusJailed);
    sirius.addImage(siriusJailed);
    //sets gamestate to play
    gameState = "PLAY";
    //hides restart button
    restart.visible = false;
  }

  //collides all the characters on the ground
  gef.collide(ground);
  derpy.collide(ground);
  bombchu.collide(ground);
  kingkuff.collide(ground);
  azocado.collide(ground);
  //draws all the sprites
  drawSprites();
}