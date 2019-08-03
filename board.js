function createBoard() {
    var button = document.getElementById("Button");
    button.style.display = "none";
    var board = document.createElement("TABLE");
    board.setAttribute("id", "board");
    document.body.appendChild(board);
    for (let i = 0; i < 8; i++) {
        var row = board.insertRow(i);
        for(let j=0; j<8; j++) {
            var cell = row.insertCell(j);
            var idNum = 10*i+j;
            cell.setAttribute("id", String(idNum));
            // cell.setAttribute("class", "pic");
            cell.setAttribute("class", "cell");
            cell.setAttribute("onclick", "clickPiece('" + String(idNum) + "')");
            var img = document.createElement("IMG");
            img.setAttribute("id", "img-"+String(idNum));
            img.setAttribute("src", "");
            img.setAttribute("alt", "");
            img.setAttribute("class", "pic");
            document.getElementById(String(idNum)).appendChild(img);
            if (i%2 == 0) {
                if (j%2 == 0) {
                    cell.style.backgroundColor = "white";
                } else {
                    cell.style.backgroundColor = "green";
                }
            } else {
                if (j%2 == 0) {
                    cell.style.backgroundColor = "green";
                } else {
                    cell.style.backgroundColor = "white";
                }
            }
        }
    }

    whiteRook1.updateImage();
    whiteKnight1.updateImage();
    whiteKnight2.updateImage();
    whiteRook2.updateImage();
    whiteKing.updateImage();
    whiteQueen.updateImage();
    whiteBishop1.updateImage();
    whiteBishop2.updateImage();
    whitePawn1.updateImage();
    whitePawn2.updateImage();
    whitePawn3.updateImage();
    whitePawn4.updateImage();
    whitePawn5.updateImage();
    whitePawn6.updateImage();
    whitePawn7.updateImage();
    whitePawn8.updateImage();

    blackRook1.updateImage();
    blackKnight1.updateImage();
    blackKnight2.updateImage();
    blackRook2.updateImage();
    blackKing.updateImage();
    blackQueen.updateImage();
    blackBishop1.updateImage();
    blackBishop2.updateImage();
    blackPawn1.updateImage();
    blackPawn2.updateImage();
    blackPawn3.updateImage();
    blackPawn4.updateImage();
    blackPawn5.updateImage();
    blackPawn6.updateImage();
    blackPawn7.updateImage();
    blackPawn8.updateImage();
}


var cells = new Array(8);
for (let i = 0; i < this.cells.length; i++) {
    cells[i] = new Array(8);
    for (let j = 0; j < this.cells[i].length; j++) {
        cells[i][j] = null;
    }
}

whiteRook1 = new Rook(0,7,"white");
whiteKnight1 = new Knight(1,7,"white");
whiteBishop1 = new Bishop(2,7,"white");
whiteQueen = new Queen(3,7,"white");
whiteKing = new King(4,7,"white");
whiteBishop2 = new Bishop(5,7,"white");
whiteKnight2 = new Knight(6,7,"white");
whiteRook2 = new Rook(7,7,"white");
whitePawn1 = new Pawn(0,6,"white");
whitePawn2 = new Pawn(1,6,"white");
whitePawn3 = new Pawn(2,6,"white");
whitePawn4 = new Pawn(3,6,"white");
whitePawn5 = new Pawn(4,6,"white");
whitePawn6 = new Pawn(5,6,"white");
whitePawn7 = new Pawn(6,6,"white");
whitePawn8 = new Pawn(7,6,"white");

blackRook1 = new Rook(0,0,"black");
blackKnight1 = new Knight(1,0,"black");
blackBishop1 = new Bishop(2,0,"black");
blackQueen = new Queen(3,0,"black");
blackKing = new King(4,0,"black");
blackBishop2 = new Bishop(5,0,"black");
blackKnight2 = new Knight(6,0,"black");
blackRook2 = new Rook(7,0,"black");
blackPawn1 = new Pawn(0,1,"black");
blackPawn2 = new Pawn(1,1,"black");
blackPawn3 = new Pawn(2,1,"black");
blackPawn4 = new Pawn(3,1,"black");
blackPawn5 = new Pawn(4,1,"black");
blackPawn6 = new Pawn(5,1,"black");
blackPawn7 = new Pawn(6,1,"black");
blackPawn8 = new Pawn(7,1,"black");

updateCell(0, 7, whiteRook1);
updateCell(1, 7, whiteKnight1);
updateCell(2, 7, whiteBishop1);
updateCell(3, 7, whiteQueen);
updateCell(4, 7, whiteKing);
updateCell(5, 7, whiteBishop2);
updateCell(6, 7, whiteKnight2);
updateCell(7, 7, whiteRook2);
updateCell(0, 6, whitePawn1);
updateCell(1, 6, whitePawn2);
updateCell(2, 6, whitePawn3);
updateCell(3, 6, whitePawn4);
updateCell(4, 6, whitePawn5);
updateCell(5, 6, whitePawn6);
updateCell(6, 6, whitePawn7);
updateCell(7, 6, whitePawn8);

updateCell(0, 0, blackRook1);
updateCell(1, 0, blackKnight1);
updateCell(2, 0, blackBishop1);
updateCell(3, 0, blackQueen);
updateCell(4, 0, blackKing);
updateCell(5, 0, blackBishop2);
updateCell(6, 0, blackKnight2);
updateCell(7, 0, blackRook2);
updateCell(0, 1, blackPawn1);
updateCell(1, 1, blackPawn2);
updateCell(2, 1, blackPawn3);
updateCell(3, 1, blackPawn4);
updateCell(4, 1, blackPawn5);
updateCell(5, 1, blackPawn6);
updateCell(6, 1, blackPawn7);
updateCell(7, 1, blackPawn8);

function updateCell(xcord, ycord, p) {
    cells[ycord][xcord] = p;
}