import cons from "./game_constants.js";
import {colorRandom} from "./util.js"

export default class Block {
  constructor(context, unitX, unitY, color) {
    this.context = context;
    this.unitX = unitX;
    this.unitY = unitY;

    if (color === undefined || color === null) {
      this.color = colorRandom();
    } else this.color = color;
  }

  draw(context) {
    if (context === null || context === undefined)
      context = this.context;

    context.save();
    context.lineWidth = cons.blockBorderWidth;
    context.strokeStyle = cons.blockBorderColor;
    context.fillStyle = this.color;
    context.fillRect(this.unitX * cons.blockWidth, this.unitY * cons.blockHeight,
      cons.blockWidth, cons.blockHeight);
    context.strokeRect(this.unitX * cons.blockWidth, this.unitY * cons.blockHeight,
        cons.blockWidth, cons.blockHeight);
    context.restore();
  }

  move(relativeX, relativeY) {
    this.unitX += relativeX;
    this.unitY += relativeY;
  }
}
