import {
  BlackBishop,
  BlackKing,
  BlackKnight,
  BlackPawn,
  BlackQueen,
  BlackRook,
  WhiteBishop,
  WhiteKing,
  WhiteKnight,
  WhitePawn,
  WhiteQueen,
  WhiteRook,
} from "./pieces.js";

const GlobalState = [];

function Square(color, id, piece) {
  return {
    color,
    id,
    highlighted: false,
    selfHighlighted: false,
    captureHighlighted: false,
    piece,
  };
}

function createBoard() {
  const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
  function getRow(row_number) {
    const array = [];
    if (row_number % 2 == 0) {
      columns.forEach((element, index) => {
        array.push(
          Square(index % 2 == 0 ? "black" : "white", element + row_number, null)
        );
      });
    } else {
      columns.forEach((element, index) => {
        array.push(
          Square(index % 2 == 0 ? "white" : "black", element + row_number, null)
        );
      });
    }
    return array;
  }
  for (let index = 8; index > 0; index--) {
    GlobalState.push(getRow(index));
  }
  initialPieces();
}

function initialPieces() {
  GlobalState.forEach((row) => {
    row.forEach((element) => {
      let id = element.id;
      if (id[1] == "7") {
        element.piece = BlackPawn(id);
      } else if (id[1] == "2") {
        element.piece = WhitePawn(id);
      } else if (id == "a8" || id == "h8") {
        element.piece = BlackRook(id);
      } else if (id == "a1" || id == "h1") {
        element.piece = WhiteRook(id);
      } else if (id == "b8" || id == "g8") {
        element.piece = BlackKnight(id);
      } else if (id == "b1" || id == "g1") {
        element.piece = WhiteKnight(id);
      } else if (id == "c8" || id == "f8") {
        element.piece = BlackBishop(id);
      } else if (id == "c1" || id == "f1") {
        element.piece = WhiteBishop(id);
      } else if (id == "d8") {
        element.piece = BlackQueen(id);
      } else if (id == "d1") {
        element.piece = WhiteQueen(id);
      } else if (id == "e8") {
        element.piece = BlackKing(id);
      } else if (id == "e1") {
        element.piece = WhiteKing(id);
      }
    });
  });
}

export { GlobalState, createBoard };
