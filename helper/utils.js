import { GlobalState } from "../data/general.js";
import { squareMap } from "../index.js";

const chessBoardDiv = document.querySelector("#chess-board");

function getSquareById(id) {
  return squareMap[id];
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

function bishopNextMoves(squareId) {
  function topRightIds(sqId) {
    let array = [];
    let id = sqId;

    while (id[0] != "a" && id[1] != "8") {
      const col = String.fromCharCode(id[0].charCodeAt(0) - 1);
      const row = Number(id[1]) + 1;
      id = `${col}${row}`;

      array.push(id);
    }
    return array;
  }

  function topLeftIds(sqId) {
    let array = [];
    let id = sqId;

    while (id[0] != "h" && id[1] != "8") {
      const col = String.fromCharCode(id[0].charCodeAt(0) + 1);
      const row = Number(id[1]) + 1;
      id = `${col}${row}`;

      array.push(id);
    }
    return array;
  }

  function bottomRightIds(sqId) {
    let array = [];
    let id = sqId;

    while (id[0] != "a" && id[1] != "1") {
      const col = String.fromCharCode(id[0].charCodeAt(0) - 1);
      const row = Number(id[1]) - 1;
      id = `${col}${row}`;

      array.push(id);
    }
    return array;
  }

  function bottomLeftIds(sqId) {
    let array = [];
    let id = sqId;

    while (id[0] != "h" && id[1] != "1") {
      const col = String.fromCharCode(id[0].charCodeAt(0) + 1);
      const row = Number(id[1]) - 1;
      id = `${col}${row}`;

      array.push(id);
    }
    return array;
  }

  return {
    topRightIds: topRightIds(squareId),
    topLeftIds: topLeftIds(squareId),
    bottomRightIds: bottomRightIds(squareId),
    bottomLeftIds: bottomLeftIds(squareId),
  };
}

function knightNextMove(squareId) {
  const col = squareId[0].charCodeAt(0);
  const row = Number(squareId[1]);

  const topRight = `${String.fromCharCode(col - 1)}${row + 2}`;
  const topLeft = `${String.fromCharCode(col + 1)}${row + 2}`;
  const bottomLeft = `${String.fromCharCode(col - 1)}${row - 2}`;
  const bottomRight = `${String.fromCharCode(col + 1)}${row - 2}`;
  const leftUp = `${String.fromCharCode(col - 2)}${row + 1}`;
  const leftDown = `${String.fromCharCode(col - 2)}${row - 1}`;
  const rightUp = `${String.fromCharCode(col + 2)}${row + 1}`;
  const rightDown = `${String.fromCharCode(col + 2)}${row - 1}`;

  const array = [
    topRight,
    topLeft,
    bottomRight,
    bottomLeft,
    leftUp,
    leftDown,
    rightUp,
    rightDown,
  ];

  const result = [];

  array.forEach((element) => {
    if (getSquareById(element)) {
      result.push(element);
    }
  });

  console.log(result);
  return result;
}

function checkPossibleKnightMoves(array) {
  const result = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (containsPiece(element)) {
      const square = getSquareById(element);
      if (
        containsOpponentPiece(square, square.piece.piece_name.substring(0, 5))
      ) {
        result.push(element);
      }
    } else {
      result.push(element);
    }
  }
  return result;
}

function checkPossibleMoves(array) {
  const result = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (containsPiece(element)) {
      const square = getSquareById(element);
      if (
        containsOpponentPiece(square, square.piece.piece_name.substring(0, 5))
      ) {
        result.push(element);
      }
      break;
    } else {
      result.push(element);
    }
  }
  return result;
}

export {
  getSquareById,
  containsPiece,
  createHighlight,
  whitePawnCaptureId,
  blackPawnCaptureId,
  bishopNextMoves,
  knightNextMove,
  containsOpponentPiece,
  checkPossibleMoves,
  checkPossibleKnightMoves,
  chessBoardDiv,
};
