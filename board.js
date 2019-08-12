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

var whitePieces = {};

var blackPieces = {};

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
    resetPieces();
}

function updateCell(xcord, ycord, p) {
    cells[ycord][xcord] = p;
}

function resetPieces() {
    //Remove all Pieces from middle of board
    for (let i = 2; i < 6; i++) {
        for (let j = 0; j < 8; j++) {
            document.getElementById("img-" + String(j+(i*10))).src = '';
            cells[i][j] = null;
        }
    }

    //Reset the white Pieces
    whitePieces = {
        0: whiteRook1,
        1: whiteKnight1,
        2: whiteBishop1,
        3: whiteQueen,
        4: whiteKing,
        5: whiteBishop2,
        6: whiteKnight2,
        7: whiteRook2,
        8: whitePawn1,
        9: whitePawn2,
        10: whitePawn3,
        11: whitePawn4,
        12: whitePawn5,
        13: whitePawn6,
        14: whitePawn7,
        15: whitePawn8
    };

    //Reset the black Pieces
    blackPieces = {
        0: blackRook1,
        1: blackKnight1,
        2: blackBishop1,
        3: blackQueen,
        4: blackKing,
        5: blackBishop2,
        6: blackKnight2,
        7: blackRook2,
        8: blackPawn1,
        9: blackPawn2,
        10: blackPawn3,
        11: blackPawn4,
        12: blackPawn5,
        13: blackPawn6,
        14: blackPawn7,
        15: blackPawn8
    };

    //Reset pieces position trackers
    whiteRook1.updatePos2(0,7);
    whiteKnight1.updatePos2(1,7);
    whiteBishop1.updatePos2(2,7);
    whiteQueen.updatePos2(3,7);
    whiteKing.updatePos2(4,7);
    whiteBishop2.updatePos2(5,7);
    whiteKnight2.updatePos2(6,7);
    whiteRook2.updatePos2(7,7);
    whitePawn1.updatePos2(0,6);
    whitePawn2.updatePos2(1,6);
    whitePawn3.updatePos2(2,6);
    whitePawn4.updatePos2(3,6);
    whitePawn5.updatePos2(4,6);
    whitePawn6.updatePos2(5,6);
    whitePawn7.updatePos2(6,6);
    whitePawn8.updatePos2(7,6);

    blackRook1.updatePos2(0,0);
    blackKnight1.updatePos2(1,0);
    blackBishop1.updatePos2(2,0);
    blackQueen.updatePos2(3,0);
    blackKing.updatePos2(4,0);
    blackBishop2.updatePos2(5,0);
    blackKnight2.updatePos2(6,0);
    blackRook2.updatePos2(7,0);
    blackPawn1.updatePos2(0,1);
    blackPawn2.updatePos2(1,1);
    blackPawn3.updatePos2(2,1);
    blackPawn4.updatePos2(3,1);
    blackPawn5.updatePos2(4,1);
    blackPawn6.updatePos2(5,1);
    blackPawn7.updatePos2(6,1);
    blackPawn8.updatePos2(7,1);

    //Reset piece location on cell 2D array
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

    //Re-draw Pieces
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

    //Reset Pawns first move
    whitePawn1.firstMoveTrue();
    whitePawn2.firstMoveTrue();
    whitePawn3.firstMoveTrue();
    whitePawn4.firstMoveTrue();
    whitePawn5.firstMoveTrue();
    whitePawn6.firstMoveTrue();
    whitePawn7.firstMoveTrue();
    whitePawn8.firstMoveTrue();

    blackPawn1.firstMoveTrue();
    blackPawn2.firstMoveTrue();
    blackPawn3.firstMoveTrue();
    blackPawn4.firstMoveTrue();
    blackPawn5.firstMoveTrue();
    blackPawn6.firstMoveTrue();
    blackPawn7.firstMoveTrue();
    blackPawn8.firstMoveTrue();

    //Reset King and Rook first move
    whiteKing.firstMoveTrue();
    blackKing.firstMoveTrue();
    whiteRook1.firstMoveTrue();
    whiteRook2.firstMoveTrue();
    blackRook1.firstMoveTrue();
    blackRook2.firstMoveTrue();

    //Make sure White goes first
    playerTurn = true;
    //Make sure no pieces are selected
    selectedPiece = false;
    removeLocs();
}