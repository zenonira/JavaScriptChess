var playerTurn = true;  //true = white, false = black
var selected = false;   //true = selected, false = not selected
function start() {
    createBoard();
    var showMoves = document.createElement("button");
    showMoves.setAttribute("onclick", "toggleShow()");
    showMoves.innerHTML = "Show Possible Moves";
    document.body.appendChild(showMoves);

    var movesBox = document.createElement("div");
    movesBox.setAttribute("id", "showMoves");
    document.body.appendChild(movesBox);

    var resetButton = document.createElement("button");
    resetButton.setAttribute("onclick", "resetPieces()");
    resetButton.innerHTML = "Reset Game";
    document.body.appendChild(resetButton);

    var checkLoc = document.createElement("p");
    checkLoc.setAttribute("id", "checkLoc");
    document.body.appendChild(checkLoc);
}

var colorLocations = "red";
var showMovesFlag = false;

var inCheck = false;

var castleOption = false;

function toggleShow() {
    if (showMovesFlag) {
        //change to false
        showMovesFlag = false;
        document.getElementById("showMoves").style.background='';
        removeLocs();
    } else {
        //change to true
        showMovesFlag = true;
        document.getElementById("showMoves").style.background='red';
        drawLocs();
    }
}

var selectedPiece;
var possibleLoc;
var enLocs = []; //En passant locations
enLocs.length = 16;
enLocs.fill(0);
var whiteSet = 8;

function clickPiece(location) {
    var locX = parseInt(parseInt(location)%10);
    var locY = parseInt(parseInt(location)/10);
    //console.log(locX, "---", locY);
    if (cells[locY][locX] !== null) {
        //if the square selected is has a piece
        var pTeam = cells[locY][locX].team;
        if (((playerTurn && pTeam == "white") || (!playerTurn && pTeam == "black")) && !selected) {
            //selecting a piece of the team whoes turn it is and no piece is selected
            selectedPiece = cells[locY][locX];
            possibleLoc = selectedPiece.getMoves().slice(0);
            drawLocs();
            selected = true;
        } else if (selected) {
            //selecting a piece of the enemy team and can move there
            movePiece(location);
        }
    } else {
        //if the square selected does not have a piece
        movePiece(location);
    }
}

function movePiece(location) {
    // If no piece selected, do nothing
    if (selected) {
        var locX = parseInt(parseInt(location)%10);
        var locY = parseInt(parseInt(location)/10);
        var oldLocation = selectedPiece.getPos();
        if (pieceCheck(location)) {
            if (checkOkMove(parseInt(parseInt(oldLocation)%10), parseInt(parseInt(oldLocation)/10), locX, locY)) {
                if (castleOption && cells[locY][locX] != null) {
                    var castleRook;
                    //Castle
                    updateCell(locX, locY, null);
                    if (locX > 0) {
                        //Right side castle
                        castle(oldLocation, 6, locY, selectedPiece); //Move king
                        if (playerTurn) {
                            castleRook = whiteRook2; //White castleing Right
                        } else {
                            castleRook = blackRook2; //Black Castleing Right
                        }
                        castle(castleRook.getPos(), 5, locY, castleRook); //Move Rook
                    } else {
                        //Left side castle
                        castle(oldLocation, 2, locY, selectedPiece);
                        if (playerTurn) {
                            castleRook = whiteRook1; //White Casteling Left
                        } else {
                            castleRook = blackRook1; //Black Castleing Left
                        }
                        castle(castleRook.getPos(), 3, locY, castleRook); //Move Rook
                    }
                } else {
                    //Move Piece
                    removePiece(location); //If moving to an opponent piece, remove from checking Check sequence
                    updateCell(parseInt(parseInt(oldLocation)%10), parseInt(parseInt(oldLocation)/10), null);
                    document.getElementById("img-" + String(oldLocation)).src = '';
                    selectedPiece.updatePos(location);
                    selectedPiece.updateImage();
                    checkCheck(playerTurn);
                    enCheck();
                    specialMoves(location-oldLocation);
                }
                playerTurn = !playerTurn;
            }
        }
        removeLocs();
        possibleLoc.length = 0;
        selected = false;
    }
}

function castle(oldLoc, locX, locY, p) {
    document.getElementById("img-" + String(oldLoc)).src = '';
    updateCell(locX, locY, p);
    p.updatePos2(locX, locY);
    p.updateImage();
}

function checkOkMove(oldLocX, oldLocY, locX, locY) {
    var savePiece = cells[oldLocY][oldLocX];
    var oldText = document.getElementById("checkLoc").innerHTML;
    // Check to see if the piece to be moved would cause the player to be in check if moved 
    // (Moving a random piece or moving a piece that is preventing check), if moving the king skip this step
    updateCell(oldLocX, oldLocY, null);
    if (savePiece != whiteKing && savePiece != blackKing) {
        checkCheck(!playerTurn);
        if (inCheck) {
            inCheck = false;
            // cells[oldLocY][oldLocX] = savePiece;
        } else {
            updateCell(locX, locY, savePiece);
            document.getElementById("checkLoc").innerHTML = oldText;
            return true;
        }
    }
    // Check to see if moving the piece to the new location would cause check (Moving King or Taking Piece)
    // cells[locY][locX] = savePiece;
    var savePiece2 = cells[locY][locX];
    removePiece((locY*10)+locX);
    updateCell(locX, locY, savePiece);
    checkCheck(!playerTurn);
    if (inCheck) {
        inCheck = false;
        // cells[locY][locX] = null;
        updateCell(oldLocX, oldLocY, savePiece);
        updateCell(locX, locY, savePiece2);
        updateCell(oldLocX, oldLocY, savePiece);
        if (!playerTurn) {
            //Got rid of a white piece to see
            for (const key in whitePieces) {
                if (whitePieces[key] == null) {
                    whitePieces[key] = savePiece2;
                }
            }
        } else {
            //Got rid of a black piece to see
            for (const key in blackPieces) {
                if (blackPieces[key] == null) {
                    blackPieces[key] = savePiece2;
                }
            }
        }
        document.getElementById("checkLoc").innerHTML = "This move would put you in check or keep you in check";
        return false;
    }
    document.getElementById("checkLoc").innerHTML = oldText;
    return true;
}

function removePiece(location) {
    var teamPieces = whitePieces;
    if (playerTurn) {
        teamPieces = blackPieces;
    }
    for (const key in teamPieces) {
        var piece = teamPieces[key];
        if (piece != null) {
            if (piece.getPos() == location) {
                teamPieces[key] = null;
            }
        }
    }
}

//If teamCheck is true, check if black is in check. If teamCheck is false, check if white team is in check
function checkCheck(teamCheck) {
    inCheck = false;
    var teamPieces = blackPieces;
    if (teamCheck) {
        //White turn
        teamPieces = whitePieces;
    }
    for (const key in teamPieces) {
        var piece = teamPieces[key];
        if (piece != null && !inCheck) {
            var moveSet = piece.getMoves().slice(0);
            //Check if each piece puts the opponent in check
            for (var i = 0; i<moveSet.length; i++) {
                if (!inCheck) {
                    checkList(moveSet, teamCheck);
                }
            }
        }
    }
}

function drawLocs() {
    var drawRed = true;
    castleOption = false;
    for (const spot in possibleLoc) {
        drawRed = true;
        var locX = parseInt(possibleLoc[spot]%10);
        var locY = parseInt(possibleLoc[spot]/10);
        if (cells[locY][locX] !== null) {
            if (((playerTurn && cells[locY][locX].team == "white") || (!playerTurn && cells[locY][locX].team == "black"))) {
                if (selectedPiece == whiteKing || selectedPiece == blackKing) {
                    if (!selectedPiece.canCastle) {
                        drawRed = false;
                    } else {
                        castleOption = true;
                    }
                } else {
                    drawRed = false;
                }
            }
        }
        if (drawRed && showMovesFlag) {
            document.getElementById(String(possibleLoc[spot])).style.backgroundColor = colorLocations;
        }
    }
}

function specialMoves(movement) {
    if (selectedPiece == whitePawn1 || selectedPiece == whitePawn2 || selectedPiece == whitePawn3 || selectedPiece == whitePawn4 ||
        selectedPiece == whitePawn5 || selectedPiece == whitePawn6 || selectedPiece == whitePawn7 || selectedPiece == whitePawn8 ||
        selectedPiece == blackPawn1 || selectedPiece == blackPawn2 || selectedPiece == blackPawn3 || selectedPiece == blackPawn4 ||
        selectedPiece == blackPawn5 || selectedPiece == blackPawn6 || selectedPiece == blackPawn7 || selectedPiece == blackPawn8) {
        var tempAdd = selectedPiece.xcord;
        var backSpace = 10;
        if (selectedPiece.team == 'white') {
            tempAdd += whiteSet;
            backSpace = -10;
        }
        enLocs.fill(0);
        if (Math.abs(movement) == 20) {
            enLocs[tempAdd] = selectedPiece.getPos()-backSpace;
        }
        selectedPiece.firstMoveFalse();
    } else if (selectedPiece == whiteKing || selectedPiece == blackKing || selectedPiece == whiteRook1 || selectedPiece == whiteRook2 ||
               selectedPiece == blackRook1 || selectedPiece == blackRook2) {
        selectedPiece.firstMoveFalse();
    }
}

function removeLocs() {
    for (const spot in possibleLoc) {
        var locX = parseInt(possibleLoc[spot]%10);
        var locY = parseInt(possibleLoc[spot]/10);
        if (locX%2 == 0) {
            if (locY%2 == 0) {
                document.getElementById(String(possibleLoc[spot])).style.backgroundColor = "white";
            } else {
                document.getElementById(String(possibleLoc[spot])).style.backgroundColor = "green";
            }
        } else {
            if (locY%2 == 0) {
                document.getElementById(String(possibleLoc[spot])).style.backgroundColor = "green";
            } else {
                document.getElementById(String(possibleLoc[spot])).style.backgroundColor = "white";
            }
        }
    }
}

function enCheck() {
    for (let i = 0; i < enLocs.length; i++) {
        if (enLocs[i] == selectedPiece.getPos()) {
            var backSpace = 10;
            if (playerTurn) {
                //If white team
                backSpace = -10;
            }
            var emptyCell = selectedPiece.getPos()+backSpace;
            updateCell(selectedPiece.xcord, selectedPiece.ycord+(backSpace/10), null);
            document.getElementById("img-" + String(emptyCell)).src = '';
        }
    }
}

function pieceCheck(location) {
    return possibleLoc.includes(parseInt(location));
}

function checkList(futureMoves, teamCheck) {
    for (const spot in futureMoves) {
        var locX = parseInt(futureMoves[spot]%10);
        var locY = parseInt(futureMoves[spot]/10);
        if (!inCheck) {
            inCheck = checkKing(locX, locY, teamCheck);
        }
    }
}

function checkKing(locX, locY, teamCheck) {
    var notifyCheck = '';
    var check = false;
    if (teamCheck) {
        if (cells[locY][locX] == blackKing) {
            notifyCheck = "Black is in Check";
            check = true;
        } else {
            notifyCheck = "";
        }
    } else {
        if (cells[locY][locX] == whiteKing) {
            notifyCheck = "White is in Check";
            check = true;
        } else {
            notifyCheck = "";
        }
    }
    document.getElementById("checkLoc").innerHTML = notifyCheck;
    return check;
}