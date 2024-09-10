import { GlobalState } from "../data/general.js";
// import { moveElement, capturePiece } from "./movements.js";
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
  rookNextMove,
  queenNextMoves,
  kingNextMoves,
} from "../helper/utils.js";
import {
  captureHighlight,
  clearHighlights,
  highlightNextMoves,
  selfHighlight,
} from "./interfaceRender.js";

const chessBoard = chessBoardDiv;

let current_player = "WHITE";
function togglePlayer() {
  current_player = current_player === "WHITE" ? "BLACK" : "WHITE";
}

let previousSelfHighlighted = null;
let capturablePieces = [];

// FUNCTIONS TRIGGERED WHEN A BLACK PIECE IS CLICKED
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

function blackRookEvents(square) {
  const { top, bottom, left, right } = rookNextMove(square.id);
  console.log("rook", rookNextMove(square.id));

  const availabelMoves = [];
  availabelMoves.push(checkPossibleMoves(top));
  availabelMoves.push(checkPossibleMoves(bottom));
  availabelMoves.push(checkPossibleMoves(right));
  availabelMoves.push(checkPossibleMoves(left));

  console.log(availabelMoves);

  const nextMoves = availabelMoves.flat();
  nextMoves.forEach((element) => {
    let el = getSquareById(element);
    if (containsOpponentPiece(el, "WHITE")) {
      capturablePieces.push(el);
    }
  });

  highlightNextMoves(nextMoves);
  captureHighlight(capturablePieces);
  previousSelfHighlighted = square;
}

function blackQueenEvents(square) {
  const {
    top,
    bottom,
    left,
    right,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  } = queenNextMoves(square.id);
  const moves = [
    top,
    bottom,
    left,
    right,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  ];
  const flatMoves = moves.flat();
  flatMoves.forEach((element) => {
    let el = getSquareById(element);
    if (containsOpponentPiece(el, "WHITE")) {
      capturablePieces.push(el);
    }
  });

  highlightNextMoves(flatMoves);
  captureHighlight(capturablePieces);
  previousSelfHighlighted = square;
}

function blackKingEvents(square) {
  const {
    top,
    bottom,
    left,
    right,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  } = kingNextMoves(square.id);
  const moves = [
    top,
    bottom,
    left,
    right,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  ];
  const flatMoves = moves.flat();
  flatMoves.forEach((element) => {
    let el = getSquareById(element);
    if (containsOpponentPiece(el, "WHITE")) {
      capturablePieces.push(el);
    }
  });

  highlightNextMoves(flatMoves);
  captureHighlight(capturablePieces);
  previousSelfHighlighted = square;
}

// FUNCTIONS TRIGGERED WHEN A WHITE PIECE IS CLICKED
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

function whiteRookEvents(square) {
  const { top, bottom, left, right } = rookNextMove(square.id);
  console.log("rook", rookNextMove(square.id));

  const availabelMoves = [];
  availabelMoves.push(checkPossibleMoves(top));
  availabelMoves.push(checkPossibleMoves(bottom));
  availabelMoves.push(checkPossibleMoves(right));
  availabelMoves.push(checkPossibleMoves(left));

  console.log(availabelMoves);

  const nextMoves = availabelMoves.flat();
  nextMoves.forEach((element) => {
    let el = getSquareById(element);
    if (containsOpponentPiece(el, "BLACK")) {
      capturablePieces.push(el);
    }
  });

  highlightNextMoves(nextMoves);
  captureHighlight(capturablePieces);
  previousSelfHighlighted = square;
}

function whiteQueenEvents(square) {
  const {
    top,
    bottom,
    left,
    right,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  } = queenNextMoves(square.id);
  const moves = [
    top,
    bottom,
    left,
    right,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  ];
  const flatMoves = moves.flat();
  flatMoves.forEach((element) => {
    let el = getSquareById(element);
    if (containsOpponentPiece(el, "BLACK")) {
      capturablePieces.push(el);
    }
  });

  highlightNextMoves(flatMoves);
  captureHighlight(capturablePieces);
  previousSelfHighlighted = square;
}

function whiteKingEvents(square) {
  const {
    top,
    bottom,
    left,
    right,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  } = kingNextMoves(square.id);
  const moves = [
    top,
    bottom,
    left,
    right,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  ];
  const flatMoves = moves.flat();
  flatMoves.forEach((element) => {
    let el = getSquareById(element);
    if (containsOpponentPiece(el, "BLACK")) {
      capturablePieces.push(el);
    }
  });

  highlightNextMoves(flatMoves);
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
      console.log("piece Clicked", square);

      if (previousSelfHighlighted === square) {
        previousSelfHighlighted = null;
        capturablePieces = [];
        return;
      }

      if (capturablePieces.includes(square)) {
        capturePiece(previousSelfHighlighted, square);
        capturablePieces = [];
        return;
      }
      capturablePieces = [];

      selfHighlight(square);

      checkSelected(square);
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

function checkSelected(square) {
  if (square.piece.piece_name.includes("BLACK_PAWN")) {
    if (current_player === "BLACK") BlackPawnEvents(square);
  } else if (square.piece.piece_name.includes("WHITE_PAWN")) {
    if (current_player === "WHITE") WhitePawnEvents(square);
  } else if (square.piece.piece_name.includes("WHITE_BISHOP")) {
    if (current_player === "WHITE") whiteBishopEvents(square);
  } else if (square.piece.piece_name.includes("BLACK_BISHOP")) {
    if (current_player === "BLACK") blackBishopEvents(square);
  } else if (square.piece.piece_name.includes("WHITE_KNIGHT")) {
    if (current_player === "WHITE") whiteKnightEvents(square);
  } else if (square.piece.piece_name.includes("BLACK_KNIGHT")) {
    if (current_player === "BLACK") blackKnightEvents(square);
  } else if (square.piece.piece_name.includes("WHITE_ROOK")) {
    if (current_player === "WHITE") whiteRookEvents(square);
  } else if (square.piece.piece_name.includes("BLACK_ROOK")) {
    if (current_player === "BLACK") blackRookEvents(square);
  } else if (square.piece.piece_name.includes("WHITE_QUEEN")) {
    if (current_player === "WHITE") whiteQueenEvents(square);
  } else if (square.piece.piece_name.includes("BLACK_QUEEN")) {
    if (current_player === "BLACK") blackQueenEvents(square);
  } else if (square.piece.piece_name.includes("WHITE_KING")) {
    if (current_player === "WHITE") whiteKingEvents(square);
  } else if (square.piece.piece_name.includes("BLACK_KING")) {
    if (current_player === "BLACK") blackKingEvents(square);
  }
}

function moveElement(start, end) {
  togglePlayer();
  start.piece.current_position = end.id;
  end.piece = start.piece;
  start.piece = null;
  document.querySelector("#" + start.id + " img").remove();
  const destination = document.getElementById(end.id);
  const image = document.createElement("img");
  image.src = end.piece.img;
  image.classList.add("piece");
  destination.appendChild(image);
}

function capturePiece(start, end) {
  togglePlayer();
  console.log("capturePiece", start, end);
  let removal = document.querySelector(`#${start.id} img`);
  removal.remove();
  removal = document.querySelector(`#${end.id} img`);
  removal.remove();
  end.piece = start.piece;
  end.piece.current_position = end.id;

  start.piece = null;

  const image = document.createElement("img");
  image.classList.add("piece");
  image.src = end.piece.img;
  document.getElementById(end.id).appendChild(image);
}

export { setGlobalListner };
