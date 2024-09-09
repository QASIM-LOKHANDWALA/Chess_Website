import { GlobalState } from "../data/general.js";
import { moveElement, capturePiece } from "./movements.js";
import {
  chessBoardDiv,
  getSquareById,
  containsPiece,
  whitePawnCaptureId,
  blackPawnCaptureId,
  containsOpponentPiece,
  bishopNextMoves,
  checkPossibleMoves,
  knightNextMove,
  checkPossibleKnightMoves,
} from "../helper/utils.js";
import {
  captureHighlight,
  clearHighlights,
  highlightNextMoves,
  selfHighlight,
} from "./interfaceRender.js";

const chessBoard = chessBoardDiv;

let previousSelfHighlighted = null;
let capturablePieces = [];

function BlackPawnEvents(square) {
  const squareId = square.id;
  let nextMoves = [];
  if (squareId[1] === "7") {
    nextMoves = [
      `${squareId[0]}${parseInt(squareId[1]) - 1}`,
      `${squareId[0]}${parseInt(squareId[1]) - 2}`,
    ];

    if (containsPiece(nextMoves[0])) {
      nextMoves = [];
    } else if (containsPiece(nextMoves[1])) {
      nextMoves.pop();
    }
  } else {
    nextMoves = [`${squareId[0]}${parseInt(squareId[1]) - 1}`];

    if (containsPiece(nextMoves[0])) {
      nextMoves = [];
    }
  }
  const captureSquares = blackPawnCaptureId(squareId);

  captureSquares.forEach((element) => {
    if (containsOpponentPiece(element, "WHITE")) {
      capturablePieces.push(element);
    }
  });

  highlightNextMoves(nextMoves);
  captureHighlight(capturablePieces);
  previousSelfHighlighted = square;
}

function blackBishopEvents(square) {
  const { topRightIds, topLeftIds, bottomRightIds, bottomLeftIds } =
    bishopNextMoves(square.id);
  let result = [];
  result.push(checkPossibleMoves(topRightIds));
  result.push(checkPossibleMoves(topLeftIds));
  result.push(checkPossibleMoves(bottomRightIds));
  result.push(checkPossibleMoves(bottomLeftIds));

  const nextMoves = result.flat();
  nextMoves.forEach((el) => {
    let element = getSquareById(el);
    if (containsOpponentPiece(element, "WHITE")) {
      capturablePieces.push(element);
    }
  });
  console.log(nextMoves);

  highlightNextMoves(nextMoves);
  captureHighlight(capturablePieces);
  previousSelfHighlighted = square;
}

function WhitePawnEvents(square) {
  const squareId = square.id;
  let nextMoves = [];
  if (squareId[1] === "2") {
    nextMoves = [
      `${squareId[0]}${parseInt(squareId[1]) + 1}`,
      `${squareId[0]}${parseInt(squareId[1]) + 2}`,
    ];

    if (containsPiece(nextMoves[0])) {
      nextMoves = [];
    } else if (containsPiece(nextMoves[1])) {
      nextMoves.pop();
    }
  } else {
    nextMoves = [`${squareId[0]}${parseInt(squareId[1]) + 1}`];

    if (containsPiece(nextMoves[0])) {
      nextMoves = [];
    }
  }
  const captureSquares = whitePawnCaptureId(squareId);

  captureSquares.forEach((element) => {
    if (containsOpponentPiece(element, "BLACK")) {
      capturablePieces.push(element);
    }
  });

  highlightNextMoves(nextMoves);
  captureHighlight(capturablePieces);
  previousSelfHighlighted = square;
}

function whiteBishopEvents(square) {
  const { topRightIds, topLeftIds, bottomRightIds, bottomLeftIds } =
    bishopNextMoves(square.id);
  let result = [];
  result.push(checkPossibleMoves(topRightIds));
  result.push(checkPossibleMoves(topLeftIds));
  result.push(checkPossibleMoves(bottomRightIds));
  result.push(checkPossibleMoves(bottomLeftIds));

  const nextMoves = result.flat();
  nextMoves.forEach((el) => {
    let element = getSquareById(el);
    if (containsOpponentPiece(element, "BLACK")) {
      capturablePieces.push(element);
    }
  });

  highlightNextMoves(nextMoves);
  captureHighlight(capturablePieces);
  previousSelfHighlighted = square;
}

function whiteKnightEvents(square) {
  const possibleMoves = knightNextMove(square.id);
  const availabelMoves = checkPossibleKnightMoves(possibleMoves);
  availabelMoves.forEach((element) => {
    if (containsOpponentPiece(getSquareById(element), "BLACK")) {
      capturablePieces.push(getSquareById(element));
    }
  });
  console.log("availabelMoves", availabelMoves);

  highlightNextMoves(availabelMoves);
  captureHighlight(capturablePieces);
  previousSelfHighlighted = square;
}

function blackKnightEvents(square) {
  const possibleMoves = knightNextMove(square.id);
  const availabelMoves = checkPossibleKnightMoves(possibleMoves);
  availabelMoves.forEach((element) => {
    if (containsOpponentPiece(getSquareById(element), "WHITE")) {
      capturablePieces.push(getSquareById(element));
    }
  });
  console.log("availabelMoves", availabelMoves);

  highlightNextMoves(availabelMoves);
  captureHighlight(capturablePieces);
  previousSelfHighlighted = square;
}

function setGlobalListner() {
  chessBoard.addEventListener("click", (e) => {
    const target = e.target;
    const parentDiv = target.parentNode;

    if (target.localName === "img") {
      clearHighlights(GlobalState);
      const parentId = parentDiv.id;
      const square = getSquareById(parentId);
      // console.log(square);

      if (previousSelfHighlighted === square) {
        return;
      }

      if (capturablePieces.includes(square)) {
        capturePiece(previousSelfHighlighted, square);
        capturablePieces = [];
        return;
      }
      capturablePieces = [];

      selfHighlight(square);

      if (square.piece.piece_name.includes("BLACK_PAWN")) {
        BlackPawnEvents(square);
      } else if (square.piece.piece_name.includes("WHITE_PAWN")) {
        WhitePawnEvents(square);
      } else if (square.piece.piece_name.includes("WHITE_BISHOP")) {
        whiteBishopEvents(square);
      } else if (square.piece.piece_name.includes("BLACK_BISHOP")) {
        blackBishopEvents(square);
      } else if (square.piece.piece_name.includes("WHITE_KNIGHT")) {
        whiteKnightEvents(square);
      } else if (square.piece.piece_name.includes("BLACK_KNIGHT")) {
        blackKnightEvents(square);
      }
    } else if (target.localName === "span") {
      clearHighlights(GlobalState);
      const parentId = parentDiv.id;
      const square = getSquareById(parentId);
      moveElement(previousSelfHighlighted, square);
    } else if (target.localName === "div") {
      if (target.children.length > 1) {
        const square = getSquareById(target.id);
        moveElement(previousSelfHighlighted, square);
      }
      clearHighlights(GlobalState);
    }
  });
}

export { setGlobalListner };
