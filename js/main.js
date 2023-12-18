import gameState from "./game_state.js";
import cons from "./game_constants.js";

document.addEventListener("keydown", keydown, false);
function keydown(event) {
  switch (event.code) {
    case "Enter":
      gameState.init();
      break;
    case "Space":
      gameState.status = (gameState.status === cons.statusStop ? cons.statusRun : cons.statusStop);
      break;
    case "ArrowDown":
      gameState.moveShape(0, -1);
      break;
    case "ArrowLeft":
      gameState.moveShape(-1, 0);
      break;
    case "ArrowUp":
      gameState.rotateShape();
      break;
    case "ArrowRight":
      gameState.moveShape(1, 0);
      break;
  }
}

;(function () {
  function main(tFrame) {
    gameState.stopMain = window.requestAnimationFrame(main);

    gameState.update(tFrame);
    gameState.render();
  }

  main();
})();
