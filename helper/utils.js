import { GlobalState } from "../data/general.js";

const chessBoardDiv = document.querySelector("#chess-board");

function getSquareById(id) {
  let found = null;
  GlobalState.forEach((row) => {
    row.forEach((element) => {
      if (element.id === id) {
        found = element;
      }
    });
  });
  return found;
}

function containsPiece(id) {
  const square = getSquareById(id);
  if (square.piece) {
    return true;
  } else {
    return false;
  }
}

function containsOpponentPiece(square, color) {
  if (square.piece) {
    return square.piece.piece_name.includes(color);
  } else {
    return false;
  }
}

function createHighlight() {
  const highlight = document.createElement("span");
  highlight.classList.add("highlight");
  return highlight;
}

function whitePawnCaptureId(id) {
  let col = id[0].charCodeAt(0);
  let row = id[1];

  if (col === 97) {
    return [
      getSquareById(`${String.fromCharCode(col + 1)}${parseInt(row) + 1}`),
    ];
  } else if (col === 104) {
    return [
      getSquareById(`${String.fromCharCode(col - 1)}${parseInt(row) + 1}`),
    ];
  } else {
    return [
      getSquareById(`${String.fromCharCode(col - 1)}${parseInt(row) + 1}`),
      getSquareById(`${String.fromCharCode(col + 1)}${parseInt(row) + 1}`),
    ];
  }
}

function blackPawnCaptureId(id) {
  let col = id[0].charCodeAt(0);
  let row = id[1];

  if (col === 97) {
    return [
      getSquareById(`${String.fromCharCode(col + 1)}${parseInt(row) - 1}`),
    ];
  } else if (col === 104) {
    return [
      getSquareById(`${String.fromCharCode(col - 1)}${parseInt(row) - 1}`),
    ];
  } else {
    return [
      getSquareById(`${String.fromCharCode(col - 1)}${parseInt(row) - 1}`),
      getSquareById(`${String.fromCharCode(col + 1)}${parseInt(row) - 1}`),
    ];
  }
}

export {
  getSquareById,
  containsPiece,
  createHighlight,
  whitePawnCaptureId,
  blackPawnCaptureId,
  containsOpponentPiece,
  chessBoardDiv,
};
