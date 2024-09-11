// Import necessary functions and variables
// import { GlobalState, current_player } from "./general.js";
import { GlobalState } from "../data/general.js";
import { current_player } from "../renderer/main.js";
import { getSquareById, containsOpponentPiece } from "./utils.js";
// import { getSquareById, containsOpponentPiece } from "./utils.js";
import {
  whitePawnCaptureId,
  blackPawnCaptureId,
  bishopNextMoves,
  knightNextMove,
  rookNextMove,
  queenNextMoves,
  kingNextMoves,
} from "./utils.js";

// Function to get all possible moves for a piece
function getAllPossibleMoves(piece, square) {
  switch (piece.piece_name) {
    case "WHITE_PAWN":
    case "BLACK_PAWN":
      return getPawnMoves(piece, square);
    case "WHITE_BISHOP":
    case "BLACK_BISHOP":
      return getBishopMoves(square);
    case "WHITE_KNIGHT":
    case "BLACK_KNIGHT":
      return getKnightMoves(square);
    case "WHITE_ROOK":
    case "BLACK_ROOK":
      return getRookMoves(square);
    case "WHITE_QUEEN":
    case "BLACK_QUEEN":
      return getQueenMoves(square);
    case "WHITE_KING":
    case "BLACK_KING":
      return getKingMoves(square);
  }
}

// Helper functions to get moves for each piece type
function getPawnMoves(piece, square) {
  const captureSquares = piece.piece_name.includes("WHITE")
    ? whitePawnCaptureId(square.id)
    : blackPawnCaptureId(square.id);
  return captureSquares.filter((sq) =>
    containsOpponentPiece(sq, piece.piece_name.substring(0, 5))
  );
}

function getBishopMoves(square) {
  const { topRightIds, topLeftIds, bottomRightIds, bottomLeftIds } =
    bishopNextMoves(square.id);
  return [...topRightIds, ...topLeftIds, ...bottomRightIds, ...bottomLeftIds];
}

function getKnightMoves(square) {
  return knightNextMove(square.id);
}

function getRookMoves(square) {
  const { top, bottom, left, right } = rookNextMove(square.id);
  return [...top, ...bottom, ...left, ...right];
}

function getQueenMoves(square) {
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
  return [
    ...top,
    ...bottom,
    ...left,
    ...right,
    ...topLeft,
    ...topRight,
    ...bottomLeft,
    ...bottomRight,
  ];
}

function getKingMoves(square) {
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
  return [
    ...top,
    ...bottom,
    ...left,
    ...right,
    ...topLeft,
    ...topRight,
    ...bottomLeft,
    ...bottomRight,
  ];
}

// Function to check if a king is in check
function isKingInCheck(color) {
  const kingSquare = findKing(color);
  const opponentColor = color === "WHITE" ? "BLACK" : "WHITE";

  for (const row of GlobalState) {
    for (const square of row) {
      if (square.piece && square.piece.piece_name.startsWith(opponentColor)) {
        const moves = getAllPossibleMoves(square.piece, square);
        if (moves.includes(kingSquare.id)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Function to find the king's square
function findKing(color) {
  for (const row of GlobalState) {
    for (const square of row) {
      if (square.piece && square.piece.piece_name === `${color}_KING`) {
        return square;
      }
    }
  }
}

// Function to check if a move would put the player's own king in check
function wouldMoveResultInCheck(startSquare, endSquare, color) {
  // Temporarily make the move
  const originalEndPiece = endSquare.piece;
  endSquare.piece = startSquare.piece;
  startSquare.piece = null;

  const inCheck = isKingInCheck(color);

  // Undo the move
  startSquare.piece = endSquare.piece;
  endSquare.piece = originalEndPiece;

  return inCheck;
}

// Function to check if it's checkmate
function isCheckmate(color) {
  if (!isKingInCheck(color)) {
    return false;
  }

  for (const row of GlobalState) {
    for (const startSquare of row) {
      if (startSquare.piece && startSquare.piece.piece_name.startsWith(color)) {
        const moves = getAllPossibleMoves(startSquare.piece, startSquare);
        for (const moveId of moves) {
          const endSquare = getSquareById(moveId);
          if (!wouldMoveResultInCheck(startSquare, endSquare, color)) {
            return false;
          }
        }
      }
    }
  }
  return true;
}

// Function to check for check and checkmate after each move
function checkGameState() {
  const opponentColor = current_player === "WHITE" ? "BLACK" : "WHITE";

  if (isKingInCheck(opponentColor)) {
    if (isCheckmate(opponentColor)) {
      alert(`Checkmate! ${current_player} wins!`);
      // Implement game end logic here
    } else {
      alert(`${opponentColor} is in check!`);
    }
  }
}

// Export the functions to be used in the main game logic
export { isKingInCheck, isCheckmate, wouldMoveResultInCheck, checkGameState };
