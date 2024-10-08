import { GlobalState } from "../data/general.js";
import {
  chessBoardDiv,
  createHighlight,
  getSquareById,
} from "../helper/utils.js";

const chessBoard = chessBoardDiv;

function initGame(data) {
  data.forEach((row) => {
    const elements = generateRow(row);
    chessBoard.appendChild(elements);
  });
  renderPieces(data);
}

function createLabel(id) {
  const label = document.createElement("p");
  label.textContent = id.toUpperCase();
  label.classList.add("label");
  return label;
}

function createSquare(element) {
  const square = document.createElement("div");
  square.id = element.id;
  square.classList.add("square", element.color);
  square.appendChild(createLabel(element.id));
  return square;
}

function generateRow(array) {
  const row = document.createElement("div");
  row.classList.add("row");
  array.forEach((element) => {
    const square = createSquare(element);
    row.appendChild(square);
  });
  return row;
}

function renderPieces(data) {
  data.forEach((row) => {
    row.forEach((element) => {
      if (element.piece) {
        const image = document.createElement("img");
        image.src = element.piece.img;
        image.classList.add("piece");
        document.getElementById(element.id).appendChild(image);
      }
    });
  });
}

function highlightNextMoves(array) {
  // console.log("check", array);

  array.forEach((element) => {
    getSquareById(element).highlighted = true;
    const square = document.getElementById(element);
    square.appendChild(createHighlight());
  });
}

function clearHighlights(data) {
  data.forEach((row) => {
    row.forEach((element) => {
      if (element.highlighted) {
        element.highlighted = false;
        console.dir(document.getElementById(element.id));
        document.querySelector("#" + element.id + " .highlight").remove();
      }
      if (element.selfHighlighted) {
        element.selfHighlighted = false;
        console.dir(document.getElementById(element.id));
        document.getElementById(element.id).classList.remove("self-highlight");
      }
      if (element.captureHighlighted) {
        element.captureHighlighted = false;
        console.dir(document.getElementById(element.id));
        document
          .getElementById(element.id)
          .classList.remove("capture-highlight");
      }
    });
  });
}

function selfHighlight(square) {
  const { id } = square;
  document.getElementById(id).classList.add("self-highlight");
  square.selfHighlighted = true;
}

function captureHighlight(array) {
  array.forEach((element) => {
    element.captureHighlighted = true;
    const square = document.getElementById(element.id);
    square.classList.add("capture-highlight");
  });
}

function previousMovesRender(from, to, current_player) {
  const ul = document.getElementById("previous-moves");
  const list_item = document.createElement("li");
  list_item.classList.add(current_player);
  const id1 = document.createElement("span");
  id1.innerText = from.id;
  const id2 = document.createElement("span");
  id2.innerText = to.id;
  list_item.appendChild(id1);
  list_item.appendChild(id2);
  ul.insertBefore(list_item, ul.firstChild);
}

export {
  initGame,
  highlightNextMoves,
  clearHighlights,
  selfHighlight,
  captureHighlight,
  previousMovesRender,
};
