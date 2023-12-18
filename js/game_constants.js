const gameConstants = {
  stageWidth: 450,
  stageHeight: 500,
  stateColor: "#F8D9C9",

  blockWidth: 25,
  blockHeight: 25,
  blockBorderWidth: 2,
  blockBorderColor: "#21363E",

  maxUnitX() {
    return this.stageWidth / this.blockWidth - 1;
  },
  maxUnitY() {
    return this.stageHeight / this.blockHeight - 1;
  },

  frameInterval: 300, // 帧间隔，单位为毫秒

  statusStop: 0,
  statusRun: 1,
  statusCreateNew: 2,
  statusAfterTransform: 3,

  shapeSamples: [
    [
      [0, 0, 1, 0, 1, 1, 1, 2],
      [0, 1, 1, 1, 2, 1, 2, 0],
      [0, 0, 0, 1, 0, 2, 1, 2],
      [0, 0, 1, 0, 2, 0, 0, 1],
    ],
    [
      [0, 0, 0, 1, 0, 2, 1, 0],
      [0, 0, 1, 0, 2, 0, 2, 1],
      [0, 2, 1, 0, 1, 1, 1, 2],
      [0, 0, 0, 1, 1, 1, 2, 1],
    ],
    [
      [0, 0, 1, 0, 1, 1, 2, 1],
      [1, 0, 1, 1, 0, 1, 0, 2],
      [0, 0, 1, 0, 1, 1, 2, 1],
      [1, 0, 1, 1, 0, 1, 0, 2],
    ],
    [
      [0, 1, 1, 0, 1, 1, 2, 0],
      [0, 0, 0, 1, 1, 1, 1, 2],
      [0, 1, 1, 0, 1, 1, 2, 0],
      [0, 0, 0, 1, 1, 1, 1, 2],
    ],
    [
      [0, 0, 1, 0, 0, 1, 1, 1],
      [0, 0, 1, 0, 0, 1, 1, 1],
      [0, 0, 1, 0, 0, 1, 1, 1],
      [0, 0, 1, 0, 0, 1, 1, 1],
    ],
    [
      [0, 1, 1, 1, 2, 1, 1, 0],
      [0, 0, 0, 1, 0, 2, 1, 1],
      [0, 0, 1, 0, 2, 0, 1, 1],
      [1, 0, 1, 1, 0, 1, 1, 2],
    ],
    [
      [0, 0, 1, 0, 2, 0, 3, 0],
      [0, 0, 0, 1, 0, 2, 0, 3],
      [0, 0, 1, 0, 2, 0, 3, 0],
      [0, 0, 0, 1, 0, 2, 0, 3],
    ],
  ],
};

export default gameConstants;
