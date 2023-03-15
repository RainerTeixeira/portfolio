
// initializing variables
let pause = false;
let retry = false;
let isGameOver = false;
let drawInstructions = true;
let boardLength, gameHeight, scoreHeight;
let snake;
let foodLoc;
let grid;
let res = 20;

// initializing sprites
let imgSnake, imgScore, imgInstructions, imgFood, imgGameOver, imgYouWon;
let imgNums = [];
let imgHead = [];
let imgBody = [];

// loads sprites and assets
// https://drive.google.com/thumbnail?id=1riPRq-TK5M_16SnB0pd_c6Hl1yDF_0ZL
function preload() {
  imgSnake = loadImage("https://i.imgur.com/VJvXfO7.png");
  imgScore = loadImage("https://i.imgur.com/bjbsZsM.png");
  imgInstructions = loadImage("https://i.imgur.com/2A5aBcw.png");
  imgGameOver = loadImage("https://i.imgur.com/PCU2wUy.png");
  imgYouWon = loadImage("https://i.imgur.com/0EBJbv0.png");
  
  imgNums.push(loadImage("https://i.imgur.com/ldiaA0f.png"));
  imgNums.push(loadImage("https://i.imgur.com/J2C8Cg9.png"));
  imgNums.push(loadImage("https://i.imgur.com/9GyEBjI.png"));
  imgNums.push(loadImage("https://i.imgur.com/Laykcyw.png"));
  imgNums.push(loadImage("https://i.imgur.com/wuZivER.png"));
  imgNums.push(loadImage("https://i.imgur.com/BICE1pN.png"));
  imgNums.push(loadImage("https://i.imgur.com/Ugs5Wua.png"));
  imgNums.push(loadImage("https://i.imgur.com/7cRhiyW.png"));
  imgNums.push(loadImage("https://i.imgur.com/LZg7gOu.png"));
  imgNums.push(loadImage("https://i.imgur.com/qtBsZmA.png"));
}

function setup() {
  // assigning sprites from the sprite sheet
  // food
  imgFood = imgSnake.get(160, 240, 80, 80);
  // head
  for (let i = 0; i < 4; i++) {
    imgHead.push(imgSnake.get(i * 80, 0, 80, 80))
  }
  // body
  for (let i = 0; i < 2; i++) {
    imgBody.push(imgSnake.get(i * 80, 240, 80, 80))
  }
  // corners
  for (let i = 0; i < 4; i++) {
    imgBody.push(imgSnake.get(i * 80, 160, 80, 80))
  }
  // tail
  for (let i = 0; i < 4; i++) {
    imgBody.push(imgSnake.get(i * 80, 80, 80, 80))
  }

  // making the canvas size suitable for an integer number of divisions
  boardLength = floor(windowHeight / res) - 1;
  if (boardLength % 2 !== 1) boardLength--;
  boardLength *= res;
  gameHeight = boardLength - 2 * res;
  // we remove the area where the score appears from the playable height
  scoreHeight = boardLength - gameHeight;
  pixelDensity(1);
  noSmooth()
  // the speed
  frameRate(8);
  createCanvas(boardLength, boardLength);
  background("#b8c2b9");
  snake = new Snake();
  drawGrid();
  createFood();
  // draws the instructions
  imageMode(CORNERS);
  image(imgInstructions, res, gameHeight / 2 - (boardLength / 350) * res, boardLength - res, gameHeight / 2 + (boardLength / 350) * res);
}

function draw() {
  checkKey();
  if (retry) {
    snake = new Snake();
    drawGrid();
    createFood();
    retry = false;
  }
  if (!pause && !isGameOver) {
    background("#b8c2b9");
    noStroke();
    fill("#7c8477");
    rect(0, gameHeight, boardLength, scoreHeight)
    drawGrid();
    snake.update();
    updateFood();
    renderFood();
    snake.render();
    drawText();
    checkWin();
  }
  if (drawInstructions) {
    // draws the instructions
    imageMode(CORNERS);
    image(imgInstructions, res, boardLength / 4 - 2 * res, boardLength - res, boardLength / 4 + 4 * res);
  }
}

/**
 * draws the background grid.
 * and it also fills the grid array for later food location calculations.
 */
function drawGrid() {
  grid = [];
  for (let y = 0; y < gameHeight; y += res) {
    for (let x = 0; x < width; x += res) {
      grid.push(createVector(x, y));
      stroke("#bdc7be");
      noFill();
      rect(x, y, res, res);
    }
  }
}

/**
 * draws the score text.
 */
function drawText() {
  imageMode(CORNER);
  image(imgScore, res, (gameHeight + scoreHeight / 5), imgScore.width * 200 / boardLength, imgScore.height * 200 / boardLength);
  let score = snake.body.length - 1;
  score = String(score).split('');
  score = score.map(item => imgNums[parseInt(item)]);
  for (let i = 0; i < score.length; i++) {
    img = score[i];
    image(img, i * (res / 1.4) + res + imgScore.width * 200 / boardLength, (gameHeight + scoreHeight / 5), img.width * 200 / boardLength, img.height * 200 / boardLength)
  }
}

/**
 * creates the food location.
 * it checks the grid to avoid adding food in a place that contain a part of the snake
 */
function createFood() {
  let col = boardLength / res;
  for (let i = 0; i < snake.body.length; i++) {
    let x = snake.body[i].x / res;
    let y = snake.body[i].y / res;
    let index = x + y * col;
    grid[index] = null;
  }
  grid = grid.filter(item => item !== null);
  let r = floor(random(grid.length));
  foodLoc = grid[r];
}

/**
 * updates the food location.
 */
function updateFood() {
  if (snake.body[0].x === foodLoc.x && snake.body[0].y === foodLoc.y) {
    snake.grow();
    createFood();
  }
}

/**
 * draws the food.
 */
function renderFood() {
  imageMode(CORNER);
  image(imgFood, foodLoc.x, foodLoc.y, res, res);
}

/**
 * shows the game over text.
 */
function gameOver() {
  imageMode(CORNERS);
  image(imgGameOver, res, gameHeight / 2 - (boardLength / 350) * res, boardLength - res, gameHeight / 2 + (boardLength / 350) * res);
  isGameOver = true;
}


/**
 * checks if there is no more available places in the grid.
 */
function checkWin() {
  if ((((boardLength) / res) * (gameHeight / res)) - snake.body.length <= 2) {
    imageMode(CORNERS);
    image(imgYouWon, res, gameHeight / 2 - (boardLength / 350) * res, boardLength - res, gameHeight / 2 + (boardLength / 350) * res);
    noLoop()
  }
}

/**
 * keys event listeners.
 */
function checkKey() {
  if (keyIsDown(RIGHT_ARROW)) {
    snake.dir.x = (snake.dir.x !== -res) ? res : -res;
    snake.dir.y = 0;
    pause = false;
    drawInstructions = false;
  } else if (keyIsDown(LEFT_ARROW)) {
    snake.dir.x = (snake.dir.x !== res) ? -res : res;
    snake.dir.y = 0;
    pause = false;
    drawInstructions = false;
  } else if (keyIsDown(DOWN_ARROW)) {
    snake.dir.x = 0;
    snake.dir.y = (snake.dir.y !== -res) ? res : -res;
    pause = false;
    drawInstructions = false;
  } else if (keyIsDown(UP_ARROW)) {
    snake.dir.x = 0;
    snake.dir.y = (snake.dir.y !== res) ? -res : res;
    pause = false;
    drawInstructions = false;
  } else if (keyIsDown(32)) {
    pause = !pause;
  } else if (keyIsDown(ENTER)) {
    pause = false;
    retry = !retry;
    isGameOver = false;
    drawInstructions = true;
  }
}

class Snake {
  constructor() {
    this.x = floor(floor(boardLength / 2) / res);
    this.y = floor(floor(gameHeight / 2) / res);
    this.x *= res;
    this.y *= res;
    this.location = createVector(this.x, this.y);
    this.dir = createVector(0, 0);
    this.body = [this.location];
    this.bodyLength = 0;
  }

  /**
  * update snake location and check for borders.
  */
  update() {
    this.updateBody();
    this.body[0].add(this.dir.copy());
    this.bordersCheck()

  }

  /**
   * change the position for every part of the body to make the snake move.
   */
  updateBody() {
    if (this.body.length > 0) {
      for (let i = this.body.length - 1; i >= 1; i--) {
        this.body[i] = this.body[i - 1].copy();
      }
    }
  }

  /**
   * give one more length unit to the snake.
   */
  grow() {
    if (this.body.length == 1) {
      this.body.push(p5.Vector.sub(this.body[this.body.length - 1].copy(), this.dir));
    } else {
      let tailDir = p5.Vector.sub(this.body[this.body.length - 2].copy(), (this.body[this.body.length - 1].copy()))
      this.body.push(p5.Vector.sub(this.body[this.body.length - 1].copy(), tailDir));
    }
  }

  /**
   * checks the borders to make the snake wrap.
   */
  bordersCheck() {
    if (this.body[0].x < 0) {
      this.body[0].x = boardLength - res;
    } else if (this.body[0].x >= boardLength) {
      this.body[0].x = 0;
    } else if (this.body[0].y < 0) {
      this.body[0].y = gameHeight - res;
    } else if (this.body[0].y >= gameHeight) {
      this.body[0].y = 0;
    }
  }

  /**
   * checks for self intersections"game over".
   */
  crashCheck() {
    if (this.body.length > 0) {
      for (let i = 1; i < this.body.length; i++) {
        if (this.body[0].x === this.body[i].x && this.body[0].y === this.body[i].y) {
          gameOver();
        }
      }
    }
  }

  /**
   * render different part of the snake
   */
  render() {
    for (let i = 0; i < this.body.length; i++) {
      let rec = this.body[i];
      let body = this.body;
      if (i === 0) {
        // the head part
        let hdImg;
        if (this.dir.x === 0 && this.dir.y === -res) {
          hdImg = imgHead[0];
        } else if (this.dir.x === 0 && this.dir.y === res) {
          hdImg = imgHead[1];
        } else if (this.dir.x === res && this.dir.y === 0) {
          hdImg = imgHead[2];
        } else if (this.dir.x === -res && this.dir.y === 0) {
          hdImg = imgHead[3];
        } else {
          hdImg = imgHead[0];
        }
        image(hdImg, rec.x, rec.y, res, res);
      } else if (i === body.length - 1 && body.length > 1) {
        // the tail part
        let tlImg = createImage(80, 80);
        if (body[i - 1].y - body[i].y === res || body[i - 1].y - body[i].y === -gameHeight + res) {
          tlImg = imgBody[6];
        } else if (body[i].y - body[i - 1].y === res || body[i].y - body[i - 1].y === -gameHeight + res) {
          tlImg = imgBody[7];
        } else if (body[i].x - body[i - 1].x === res || body[i].x - body[i - 1].x === -boardLength + res) {
          tlImg = imgBody[8];
        } else if (body[i - 1].x - body[i].x === res || body[i - 1].x - body[i].x === -boardLength + res) {
          tlImg = imgBody[9];
        }
        image(tlImg, rec.x, rec.y, res, res);
      } else {
        let bdImg = createImage(80, 80);
        // horizontal and vertical parts
        if (body[i].x === body[i - 1].x && body[i].x === body[i + 1].x) {
          bdImg = imgBody[0];
        } else if (body[i].y === body[i - 1].y && body[i].y === body[i + 1].y) {
          bdImg = imgBody[1];
        } else {
          // corners parts
          if (body.length >= 3) {
            let dirPrevX = body[i - 1].x % boardLength - body[i].x % boardLength;
            let dirPrevY = body[i - 1].y % gameHeight - body[i].y % gameHeight;
            let dirAfterX = body[i + 1].x % boardLength - body[i].x % boardLength;
            let dirAfterY = body[i + 1].y % gameHeight - body[i].y % gameHeight;
            if (dirPrevX === res && dirAfterY === res || dirPrevY === res && dirAfterX === res ||
              dirPrevX === res && dirAfterY === -gameHeight + res || dirPrevY === res && dirAfterX === -boardLength + res ||
              dirPrevY === -gameHeight + res && dirAfterX === res || dirPrevX === -boardLength + res && dirAfterY === res) {
              bdImg = imgBody[2];
            } else if (dirPrevY === res && dirAfterX === -res || dirPrevX === -res && dirAfterY === res ||
              dirPrevX === -res && dirAfterY === -gameHeight + res || dirPrevY === res && dirAfterX === boardLength - res ||
              dirPrevY === -gameHeight + res && dirAfterX === -res || dirPrevX === boardLength - res && dirAfterY === res) {
              bdImg = imgBody[3];
            } else if (dirPrevY === -res && dirAfterX === res || dirPrevX === res && dirAfterY === -res ||
              dirPrevX === res && dirAfterY === gameHeight - res || dirPrevY === -res && dirAfterX === -boardLength + res ||
              dirPrevY === gameHeight - res && dirAfterX === res || dirPrevX === -boardLength + res && dirAfterY === -res) {
              bdImg = imgBody[4];
            } else if (dirPrevY === -res && dirAfterX === -res || dirPrevX === -res && dirAfterY === -res ||
              dirPrevX === -res && dirAfterY === gameHeight - res || dirPrevY === -res && dirAfterX === boardLength - res ||
              dirPrevY === gameHeight - res && dirAfterX === -res || dirPrevX === boardLength - res && dirAfterY === -res) {
              bdImg = imgBody[5];
            }
          }
        }
        image(bdImg, rec.x, rec.y, res, res);
      }
    }
    this.crashCheck();
  }
}