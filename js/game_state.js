import cons from "./game_constants.js";
import Block from "./block.js";
import Shape from "./shape.js";

class GameState {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.nextShapeCanvas = document.getElementById("nextShape");
    this.scoreElement = document.getElementById("score");

    this.canvas.width = cons.stageWidth + cons.blockBorderWidth;
    this.canvas.height = cons.stageHeight + cons.blockBorderWidth;
    this.nextShapeCanvas.width = 6 * cons.blockWidth;
    this.nextShapeCanvas.height = 6 * cons.blockHeight;

    this.context = this.canvas.getContext("2d");
    this.nextShapeContext = this.nextShapeCanvas.getContext("2d");

    this.init();
  }

  init() {
    this.map = new Array();
    for (let i = 0; i <= cons.maxUnitY(); i++) {
      this.map[i] = new Array();
      for (let j = 0; j <= cons.maxUnitX(); j++) this.map[i][j] = null;
    }

    this.lastTime = 0;
    this.status = cons.statusStop;
    this.holdShape = new Shape(this.context);
    this.nextShape = new Shape(this.context);
    this.score = 0;
    this.scoreElement.innerHTML = this.score;
  }

  render() {
    this.context.save();

    this.context.fillStyle = cons.stateColor;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.translate(1, cons.stageHeight);
    this.context.scale(1, -1);

    for (let i = 0; i < this.map.length; i++)
      for (let j = 0; j < this.map[i].length; j++) {
        if (this.map[i][j] !== undefined && this.map[i][j] !== null) {
          this.map[i][j].unitX = j;
          this.map[i][j].unitY = i;
          this.map[i][j].draw();
        }
      }
    this.holdShape.draw();
    this.context.restore();

    this.nextShapeContext.save();
    this.nextShapeContext.fillStyle = cons.stateColor;
    this.nextShapeContext.fillRect(0, 0,
      this.nextShapeCanvas.width, this.nextShapeCanvas.height);

    this.nextShapeContext.translate((this.nextShapeCanvas.width - this.nextShape.width * cons.blockWidth) / 2, (this.nextShapeCanvas.height + this.nextShape.height * cons.blockHeight) / 2);
    this.nextShapeContext.scale(1, -1);

    let tmpShape = new Shape(this.nextShapeContext, this.nextShape.shapeType, 0, 0, this.nextShape.rotationIndex, this.nextShape.color);
    tmpShape.draw();
    this.nextShapeContext.restore();
  }

  update(tFrame) {
    if (this.status === cons.statusAfterTransform) {
      this.lastTime = tFrame;
      this.status = cons.statusRun;
      return;
    }

    if (tFrame - this.lastTime < cons.frameInterval) return;

    this.lastTime = tFrame;

    switch (this.status) {
      case cons.statusStop:
        return;
      case cons.statusCreateNew:
        this.holdShape = this.nextShape;
        this.nextShape = new Shape(this.context);
        this.status = cons.statusRun;
        this._detectCover();
        break;
      case cons.statusRun:
        if (this._judgeGameOver()) {
          this.status = cons.statusStop;
          alert("Game over!");
        }
        if (this._detectCollision(0, -1)) {
          this._placeShape();
          this.status = cons.statusCreateNew;
        } else this.holdShape.move(0, -1);
        break;
      default:
        break;
    }
  }

  _judgeGameOver() {
    if (this.map[this.map.length - 1].some((currentValue) => currentValue != null))
      return true;
    return false;
  }

  _placeShape() {
    for (let i = 0; i < 4; i++) {
      let block = this.holdShape.blocks[i];
      this.map[block.unitY][block.unitX] = block;
    }
  }

  _detectCollision(relativeX, relativeY, shape) {
    if (shape === undefined || shape === null) shape = this.holdShape;

    for (let i = 0; i < 4; i++) {
      let block = shape.blocks[i];
      if (block.unitX + relativeX > cons.maxUnitX() || block.unitX + relativeX < 0) return true;
      if (block.unitY + relativeY < 0) return true;
      if (block.unitY + relativeY > cons.maxUnitY()) continue;
      if (this.map[block.unitY + relativeY][block.unitX + relativeX] != null) return true;
    }
    return false;
  }

  _detectCover() {
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i].every((currentValue) => (currentValue != null))) {
        this.map.splice(i, 1);
        this.score += cons.maxUnitX() + 1;
        this.scoreElement.innerHTML = this.score;
        i--;
      }
    }

    for (let i = this.map.length; i <= cons.maxUnitY(); i++) {
      this.map[i] = new Array();
      for (let j = 0; j <= cons.maxUnitX(); j++) this.map[i][j] = null;
    }
  }

  moveShape(relativeX, relativeY) {
    if (this._detectCollision(relativeX, relativeY)) return;

    this.holdShape.move(relativeX, relativeY);
    this.status = cons.statusAfterTransform;
  }

  rotateShape() {
    let changedShape = new Shape(this.context, this.holdShape.shapeType, this.holdShape.x, this.holdShape.y, this.holdShape.rotationIndex, this.holdShape.color);

    changedShape.rotate();
    if (this._detectCollision(0, 0, changedShape) == false)
      this.holdShape = changedShape;
      this.status = cons.statusAfterTransform;
  }
}

const gameState = new GameState();
export default gameState;
