import { createBoard, GlobalState } from "./data/general.js";
import { initGame } from "./renderer/interfaceRender.js";
import { setGlobalListner } from "./renderer/main.js";

const squareMap = {};

createBoard();
function fillMap() {
  GlobalState.flat().forEach((element) => {
    squareMap[element.id] = element;
  });
}
fillMap();
initGame(GlobalState);
setGlobalListner();

export { squareMap };
