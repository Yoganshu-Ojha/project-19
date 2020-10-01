var towerImg, tower;
var ghost, ghostImg;
var gameState = "play";
var doors, doors_image, door_group;
var rand;
var railings, rail_img, railing_group;
var invisible, invisible_group;

function preload() {
  towerImg = loadImage("tower.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  doors_image = loadImage("door.png");
  rail_img = loadImage("climber.png");
}

function setup() {
  createCanvas(600, 450);

  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  //spookySound.loop();

  ghost = createSprite(200, 200, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);

  railing_group = new Group();
  door_group = new Group();
  invisible_group = new Group();
}

function draw() {
  background(0);
  if (gameState === "play") {
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }

    if (keyDown("space")) {
      ghost.velocityY = -10;
    }

    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    if (tower.y > 400) {
      tower.y = 200;
    }

    if (ghost.isTouching(railing_group)) {
      ghost.velocityY = 0;
    }

    if (ghost.isTouching(invisible_group)) {
      gameState = "end";
    }

    spawnDoors();
  } //end of play state

  if (gameState == "end") {
    fill("Black");
    textSize(25);
    stroke("Red");
    text("Game Over", 300, 225);
  }
  console.log(gameState);
  drawSprites();
}

function spawnDoors() {
  if (frameCount % 400 == 0) {
    rand = Math.round(random(100, 550));
    door = createSprite(rand, -100, 30, 30);
    door.addImage("door", doors_image);
    door.velocityY = 1;
    door_group.add(door);
    ghost.depth = door.depth + 1;

    railings = createSprite(door.x, -50, 30, 10);
    railings.addImage("railing", rail_img);
    railings.velocityY = 1;
    railing_group.add(railings);

    invisible = createSprite(railings.x, -35, 100, 1);
    invisible.velocityY = 1;
    invisible_group.add(invisible);
    invisible.visible = false;
  }
}
