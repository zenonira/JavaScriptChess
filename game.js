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
                console.log(teamPieces);
            }
        }
    }
}

function checkCheck() {
    inCheck = false;
    var teamPieces = blackPieces;
    if (playerTurn) {
        //White turn
        teamPieces = whitePieces;
    }
    for (const key in teamPieces) {
        var piece = teamPieces[key];
        if (piece != null) {
            var moveSet = piece.getMoves().slice(0);
            //Check if each piece puts the opponent in check
            for (var i = 0; i<moveSet.length; i++) {
                if (!inCheck) {
                    checkList(moveSet);
                }
            }
        }
    }
}

function movePiece(location) {
    var locX = parseInt(parseInt(location)%10);
    var locY = parseInt(parseInt(location)/10);
    if (selected) {
        if (pieceCheck(location)) {
            //Move Piece
            var oldLocation = selectedPiece.getPos();
            removePiece(location)
            updateCell(locX, locY, selectedPiece);
            updateCell(parseInt(parseInt(oldLocation)%10), parseInt(parseInt(oldLocation)/10), null);
            document.getElementById("img-" + String(oldLocation)).src = '';
            selectedPiece.updatePos(location);
            selectedPiece.updateImage();
            checkCheck();
            playerTurn = !playerTurn;
            enCheck();
            speicalPawn(location-oldLocation);
        }
    }
    //selecting a piece of the same team
    removeLocs();
    possibleLoc.length = 0;
    selected = false;
}

function drawLocs() {
    var drawRed = true;
    for (const spot in possibleLoc) {
        drawRed = true;
        var locX = parseInt(possibleLoc[spot]%10);
        var locY = parseInt(possibleLoc[spot]/10);
        if (cells[locY][locX] !== null) {
            if (((playerTurn && cells[locY][locX].team == "white") || (!playerTurn && cells[locY][locX].team == "black"))) {
                drawRed = false;
            }
        }
        if (drawRed && showMovesFlag) {
            document.getElementById(String(possibleLoc[spot])).style.backgroundColor = colorLocations;
        }
    }
}

function speicalPawn(movement) {
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

function checkList(futureMoves) {
    for (const spot in futureMoves) {
        var locX = parseInt(futureMoves[spot]%10);
        var locY = parseInt(futureMoves[spot]/10);
        if (!inCheck) {
            inCheck = checkKing(locX, locY);;
        }
    }
}

function checkKing(locX, locY) {
    var notifyCheck = '';
    var check = false;
    if (selectedPiece.team == "white") {
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