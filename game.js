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
}

var colorLocations = "red";
var showMovesFlag = false;

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
            selectedPiece.getMoves();
            possibleLoc = selectedPiece.moves;
            drawLocs();
            selected = true;
        } else if (selected) {
            //selecting a piece of the enemy team and can move there
            if (pieceCheck(location)) {
                //Move Piece
                var oldLocation = selectedPiece.getPos();
                updateCell(locX, locY, selectedPiece);
                updateCell(parseInt(parseInt(oldLocation)%10), parseInt(parseInt(oldLocation)/10), null);
                document.getElementById("img-" + String(oldLocation)).src = '';
                selectedPiece.updatePos(location);
                selectedPiece.updateImage();
                playerTurn = !playerTurn;
                enCheck();
                speicalPawn(location-oldLocation);
            }
            //selecting a piece of the same team
            removeLocs();
            possibleLoc.length = 0;
            selected = false;
        }
    } else {
        //if the square selected does not have a piece
        if (selected) {
            if (pieceCheck(location)) {
                var oldLocation = selectedPiece.getPos();
                updateCell(locX, locY, selectedPiece);
                updateCell(parseInt(parseInt(oldLocation)%10), parseInt(parseInt(oldLocation)/10), null);
                document.getElementById("img-" + String(oldLocation)).src = '';
                selectedPiece.updatePos(location);
                selectedPiece.updateImage();
                playerTurn = !playerTurn;
                enCheck();
                speicalPawn(location-oldLocation);
            }
        }
        removeLocs();
        possibleLoc.length = 0;
        selected = false;
    }
}

function drawLocs() {
    var drawRed = true;
    for (const spot in possibleLoc) {
        drawRed = true;
        //If possibleLoc is an array
        if (Array.isArray(possibleLoc[spot])) {
            for (let i = 0; i < possibleLoc[spot].length; i++) {
                var locX = parseInt(possibleLoc[spot][i]%10);
                var locY = parseInt(possibleLoc[spot][i]/10);
                //All possible locs should be good to go 
                if (showMovesFlag) {
                    document.getElementById(String(possibleLoc[spot][i])).style.backgroundColor = colorLocations;
                }
            }
        } else if (possibleLoc[spot] !== null) {
            //King, Pawn, Knights dont have checking so I need to check if they are going to move onto a piece that is there own team
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
        if (Array.isArray(possibleLoc[spot])) {
            for (let i = 0; i < possibleLoc[spot].length; i++) {
                var locX = parseInt(possibleLoc[spot][i]%10);
                var locY = parseInt(possibleLoc[spot][i]/10);
                if (locX%2 == 0) {
                    if (locY%2 == 0) {
                        document.getElementById(String(possibleLoc[spot][i])).style.backgroundColor = "white";
                    } else {
                        document.getElementById(String(possibleLoc[spot][i])).style.backgroundColor = "green";
                    }
                } else {
                    if (locY%2 == 0) {
                        document.getElementById(String(possibleLoc[spot][i])).style.backgroundColor = "green";
                    } else {
                        document.getElementById(String(possibleLoc[spot][i])).style.backgroundColor = "white";
                    }
                }
            }
        } else if (possibleLoc[spot] !== null) {
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
    var i = 0;
    if (Array.isArray(possibleLoc[0])) {
        for (let i = 0; i < possibleLoc.length; i++) {
            if (possibleLoc[i].includes(parseInt(location))) {
                return true;
            }
        }
        return false;
    } else {
        return possibleLoc.includes(parseInt(location));
    }
}