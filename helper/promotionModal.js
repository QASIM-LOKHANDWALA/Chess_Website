import {
  BlackBishop,
  BlackKnight,
  BlackQueen,
  BlackRook,
  WhiteBishop,
  WhiteKnight,
  WhiteQueen,
  WhiteRook,
} from "../data/pieces.js";

class promotionModal {
  constructor(body) {
    if (!body) {
      throw new Error("Provide Body!");
    }
    this.isVisible = false;
    this.body = body;
  }
  show() {
    this.isVisible = true;
    const chessBoardDiv = document.querySelector("#chess-board");
    Array.from(document.getElementsByClassName("row")).forEach((element) => {
      element.classList.add("blur");
    });
    chessBoardDiv.appendChild(this.body);
  }
  hide() {
    if (this.isVisible) {
      this.body.remove();
      Array.from(document.getElementsByClassName("row")).forEach((element) => {
        element.classList.remove("blur");
      });
    }
  }
}

function setListeners(array, square, modal) {
  console.log(square);

  array.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.stopPropagation();

      if (e.target.id === "BLACK_ROOK") {
        square.piece = BlackRook(square.id);
      } else if (e.target.id === "BLACK_KNIGHT") {
        square.piece = BlackKnight(square.id);
      } else if (e.target.id === "BLACK_BISHOP") {
        square.piece = BlackBishop(square.id);
      } else if (e.target.id === "BLACK_QUEEN") {
        square.piece = BlackQueen(square.id);
      } else if (e.target.id === "WHITE_ROOK") {
        square.piece = WhiteRook(square.id);
      } else if (e.target.id === "WHITE_KNIGHT") {
        square.piece = WhiteKnight(square.id);
      } else if (e.target.id === "WHITE_BISHOP") {
        square.piece = WhiteBishop(square.id);
      } else if (e.target.id === "WHITE_QUEEN") {
        square.piece = WhiteQueen(square.id);
      }
      const promoDiv = document.querySelector(`#${square.id} img`);
      promoDiv.remove();
      const promoDiv2 = document.getElementById(square.id);
      const promoPiece = document.createElement("img");
      promoPiece.classList.add("piece");
      promoPiece.src = square.piece.img;
      promoDiv2.appendChild(promoPiece);
      modal.hide();
    });
  });
}

function openModal(color, square) {
  const rook = document.createElement("img");
  rook.src = `assets/images/pieces/${color}/rook.png`;
  rook.id = color === "white" ? "WHITE_ROOK" : "BLACK_ROOK";

  const knight = document.createElement("img");
  knight.src = `assets/images/pieces/${color}/knight.png`;
  knight.id = color === "white" ? "WHITE_KNIGHT" : "BLACK_KNIGHT";

  const bishop = document.createElement("img");
  bishop.src = `assets/images/pieces/${color}/bishop.png`;
  bishop.id = color === "white" ? "WHITE_BISHOP" : "BLACK_BISHOP";

  const queen = document.createElement("img");
  queen.src = `assets/images/pieces/${color}/queen.png`;
  queen.id = color === "white" ? "WHITE_QUEEN" : "BLACK_QUEEN";

  const pieces = [rook, knight, bishop, queen];

  const imgDiv = document.createElement("div");
  imgDiv.classList.add("promotion-pieces");
  imgDiv.append(rook, knight, bishop, queen);

  const title = document.createElement("p");
  title.innerText = "YOUR PAWN HAS BEEN PROMOTED!";

  const body = document.createElement("div");
  body.classList.add("modal");
  body.appendChild(title);
  body.appendChild(imgDiv);

  const modal = new promotionModal(body);
  modal.show();
  setListeners(pieces, square, modal);
}

export { openModal };
