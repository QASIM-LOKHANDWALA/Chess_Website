import { createBoard, GlobalState } from "./data/general.js";
import { initGame } from "./renderer/interfaceRender.js";
import { setGlobalListner } from "./renderer/main.js";

createBoard();
initGame(GlobalState);
setGlobalListner();
