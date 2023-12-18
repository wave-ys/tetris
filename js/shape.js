import cons from "./game_constants.js";
import Block from "./block.js";
import { intervalRandom, colorRandom } from "./util.js";

export default class Shape {
  constructor(context, shapeType, x, y, rotationIndex, color) {
    this.context = context;

    if (rotationIndex === null || rotationIndex === undefined) this.rotationIndex = intervalRandom(0, 3);
    else this.rotationIndex = rotationIndex;

    if (shapeType === null || shapeType === undefined) this.shapeType = intervalRandom(0, cons.shapeSamples.length - 1);
    else this.shapeType = shapeType;

    let shapeWidth = 0,
      shapeHeight = 0;
    for (let i = 0; i < 4; i++) {
      shapeWidth = Math.max(cons.shapeSamples[this.shapeType][this.rotationIndex][i * 2] + 1, shapeWidth);
      shapeHeight = Math.max(cons.shapeSamples[this.shapeType][this.rotationIndex][i * 2 + 1] + 1, shapeHeight);
    }

    this.width = shapeWidth;
    this.height = shapeHeight;

    if (x === null || x === undefined) this.x = intervalRandom(0, cons.maxUnitX() - shapeWidth );
    else this.x = x;

    if (y === null || y === undefined) this.y = cons.maxUnitY() + 4;
    else this.y = y;

    if (color === null || color === undefined) this.color = colorRandom()
    else this.color = color;

    this.blocks = new Array();
    for (let i = 0; i < 4; i++) {
      let blockX = this.x + cons.shapeSamples[this.shapeType][this.rotationIndex][i * 2];
      let blockY = this.y + cons.shapeSamples[this.shapeType][this.rotationIndex][i * 2 + 1];
      this.blocks[i] = new Block(this.context, blockX, blockY, this.color);
    }
  }

  move(relativeX, relativeY) {
    this.x += relativeX;
    this.y += relativeY;
    for (let i = 0; i < 4; i++) {
      this.blocks[i].move(relativeX, relativeY);
    }
  }

  rotate(rotationIndex) {
    if (rotationIndex === null || rotationIndex === undefined) this.rotationIndex = (this.rotationIndex + 1) % 4;
    else this.rotationIndex = rotationIndex;

    for (let i = 0; i < 4; i++) {
      this.blocks[i].unitX = this.x + cons.shapeSamples[this.shapeType][this.rotationIndex][i * 2] - 1;
      this.blocks[i].unitY = this.y + cons.shapeSamples[this.shapeType][this.rotationIndex][i * 2 + 1] - 1;
    }
  }

  draw(context) {
    if (context === null || context === undefined)
      context = this.context;

    for (let i = 0; i < 4; i++) this.blocks[i].draw(context);
  }
}
