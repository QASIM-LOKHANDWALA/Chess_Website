import { GlobalState } from "../data/general.js";
import { openModal } from "../helper/promotionModal.js";
// import { moveElement, capturePiece } from "./movements.js";
// import {
//   isKingInCheck,
//   isCheckmate,
//   wouldMoveResultInCheck,
//   checkGameState,
// } from "../helper/checkAndCheckmate.js";
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
  previousMovesRender,
  selfHighlight,
} from "./interfaceRender.js";

const turnSpan = document.querySelector(".turn-span");

const chessBoard = chessBoardDiv;

let current_player = "WHITE";
function togglePlayer() {
  const color = current_player === "WHITE" ? "BLACK" : "WHITE";
  current_player = color;
  turnSpan.innerHTML = color;
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

  highlightPieces(nextMoves, capturablePieces, square);
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

  highlightPieces(nextMoves, capturablePieces, square);
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

  highlightPieces(availabelMoves, capturablePieces, square);
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

  highlightPieces(nextMoves, capturablePieces, square);
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

  highlightPieces(flatMoves, capturablePieces, square);
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

  highlightPieces(flatMoves, capturablePieces, square);
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

  highlightPieces(nextMoves, capturablePieces, square);
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

  highlightPieces(nextMoves, capturablePieces, square);
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

  highlightPieces(availabelMoves, capturablePieces, square);
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

  highlightPieces(nextMoves, capturablePieces, square);
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

  highlightPieces(flatMoves, capturablePieces, square);
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

  highlightPieces(flatMoves, capturablePieces, square);
}

function setGlobalListner() {
  chessBoard.addEventListener("click", (e) => {
    const target = e.target;
    const parentDiv = target.parentNode;

    if (target.localName === "img") {
      clearHighlights(GlobalState);
      const parentId = parentDiv.id;
      const square = getSquareById(parentId);
      if (!square) {
        throw new Error("invalid square");
      }

      if (previousSelfHighlighted === square) {
        console.log(
          "previousSelfHighlighted ********************************************",
          previousSelfHighlighted
        );

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
      capturablePieces = [];
    } else if (target.localName === "div") {
      if (target.children.length > 1) {
        const square = getSquareById(target.id);
        moveElement(previousSelfHighlighted, square);
      } else {
        previousSelfHighlighted = null;
      }
      clearHighlights(GlobalState);
      capturablePieces = [];
    }
  });
}

function checkSelected(square) {
  // if (isKingInCheck(current_player)) {
  //   alert(`${current_player} is in check! You must move out of check.`);
  // }
  console.log("checkSelected-----------------", square);

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

function checkPromotion(square, id) {
  console.log("checkPromotion for ", square);

  return square.id[1] === id;
}

function moveElement(start, end) {
  // if (wouldMoveResultInCheck(start, end, current_player)) {
  //   alert("This move would put your king in check!");
  //   return;
  // }

  start.piece.current_position = end.id;
  end.piece = start.piece;
  start.piece = null;
  document.querySelector("#" + start.id + " img").remove();
  const destination = document.getElementById(end.id);
  const image = document.createElement("img");
  image.src = end.piece.img;
  image.classList.add("piece");
  destination.appendChild(image);
  previousMovesRender(start, end, current_player);
  // checkGameState();
  if (current_player === "WHITE" && end.piece.piece_name === "WHITE_PAWN") {
    if (checkPromotion(end, "8")) {
      openModal("white", end);
    }
  } else if (
    current_player === "BLACK" &&
    end.piece.piece_name === "BLACK_PAWN"
  ) {
    if (checkPromotion(end, "1")) {
      openModal("black", end);
    }
  }
  togglePlayer();
}

function capturePiece(start, end) {
  // if (wouldMoveResultInCheck(start, end, current_player)) {
  //   alert("This move would put your king in check!");
  //   return;
  // }

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
  previousMovesRender(start, end, current_player);
  // checkGameState();
  if (current_player === "WHITE" && end.piece.piece_name === "WHITE_PAWN") {
    if (checkPromotion(end, "8")) {
      openModal("white", end);
    }
  } else if (
    current_player === "BLACK" &&
    end.piece.piece_name === "BLACK_PAWN"
  ) {
    if (checkPromotion(end, "1")) {
      openModal("black", end);
    }
  }
  togglePlayer();
}

function highlightPieces(nextMoves, capturablePieces, square) {
  highlightNextMoves(nextMoves);
  captureHighlight(capturablePieces);
  previousSelfHighlighted = square;
}

export { setGlobalListner, current_player };
