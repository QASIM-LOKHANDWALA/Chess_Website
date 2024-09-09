function moveElement(start, end) {
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
  // console.log("capturePiece", start, end);
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

export { moveElement, capturePiece };
