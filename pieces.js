class Piece {
    constructor(xcord, ycord, team) {
        this.xcord = xcord; //x cordinate (one digit)
        this.ycord = ycord; //y cordinate (one digit)
        this.team = team;   //The team of the piece
        this.moves = [];    //Possible locations to move. Single numbers representing cordinates
    }
    /*
    Returns the position of the piece, y is the 10's digit, x is the ones digit
    */
    getPos() {
        return this.xcord + this.ycord*10;
    }

    /*
    Updates the position of the piece given and x cordinate and a y cordinate
    */
    updatePos(newX, newY) {
        this.xcord = newX;
        this.ycord = newY;
    }
    /*
    Updates the position of the piece given a single number with the y in the 10's digit and the x in the ones digit
    */
    updatePos(newCord) {
        this.xcord = parseInt(parseInt(newCord)%10);
        this.ycord = parseInt(parseInt(newCord)/10);
    }
}

class Pawn extends Piece {
    constructor(xcord, ycord, team) {
        super(xcord, ycord, team);
        this.firstMove = true;
    }
    /*
    Output: Updates moves in the parent class, which is an array of numbers, of the possible moves of the pawn
    */
    getMoves() {
        this.moves.length = 0;
        var mov = -1;
        var teamAdd = 0;
        var yAdd = 3;
        if (this.team == 'black') {
            mov = 1;
            teamAdd = whiteSet;
            yAdd = 4;
        }
        if (this.ycord != 0 && this.ycord != 7) {
            // Moving forward
            if (cells[this.ycord+mov][this.xcord] == null) {
                this.moves.push(this.xcord+((this.ycord+mov)*10));
                //First move pawn can move two spaces
                if (this.firstMove == true) {
                    if (cells[this.ycord+(mov*2)][this.xcord] == null) {
                        this.moves.push(this.xcord + ((this.ycord+(mov*2))*10));
                    }
                }
            }
            //Checking if it can take a piece diagonally
            if (this.xcord != 7) {
                //diagonal towards right side of board
                console.log("EN test ", this.xcord+1+teamAdd, this.ycord, enLocs[this.xcord+1+teamAdd]);
                if (cells[this.ycord+mov][this.xcord+1] != null || (enLocs[this.xcord+1+teamAdd] != 0 && this.ycord == yAdd)) {
                    this.moves.push(this.xcord+1+((this.ycord+mov)*10));
                }
            }
            if (this.xcord != 0) {
                //diagonal towards left side of board
                console.log("EN test ", this.xcord-1+teamAdd, this.ycord, enLocs[this.xcord-1+teamAdd]);
                if (cells[this.ycord+mov][this.xcord-1] != null || (enLocs[this.xcord-1+teamAdd] != 0 && this.ycord == yAdd)) {
                    this.moves.push(this.xcord-1+((this.ycord+mov)*10));
                }
            }
        }
    }
    /*
    Sets the first move to false after the first move of the pawn
    */
    firstMoveFalse() {
        this.firstMove = false;
    }
    /*
    Returns the path to the image of the piece
    */
    getImage() {
        if (this.team == "black") {
            return "./piecePic/BlackPawn.png";
        } else {
            return "./piecePic/WhitePawn.png";
        } 
    }
    /*
    Update the piece's image in the correct location on the game board
    */
    updateImage() {
        document.getElementById("img-" + String(super.getPos())).src = this.getImage();
    }
}

class Knight extends Piece {
    constructor(xcord, ycord, team) {
        super(xcord, ycord, team);
    }
    /*
    Output: Updates moves in the parent class, which is an array of numbers, of the possible moves of the piece
    */
    getMoves() {
        this.moves.length = 0;
        if (this.xcord < 7) {
            if (this.ycord < 6) {
                this.moves.push(this.xcord+1 + ((this.ycord+2)*10));
            }
            if (this.ycord > 1) {
                this.moves.push(this.xcord+1 + ((this.ycord-2)*10));
            }
            if (this.xcord < 6) {
                if (this.ycord < 7) {
                    this.moves.push(this.xcord+2 + ((this.ycord+1)*10));
                }
                if (this.ycord > 0) {
                    this.moves.push(this.xcord+2 + ((this.ycord-1)*10));
                }
            }
        }
        if (this.xcord > 0) {
            if (this.ycord < 6) {
                this.moves.push(this.xcord-1 + ((this.ycord+2)*10));
            }
            if (this.ycord > 1) {
                this.moves.push(this.xcord-1 + ((this.ycord-2)*10));
            }
            if (this.xcord > 1) {
                if (this.ycord < 7) {
                    this.moves.push(this.xcord-2 + ((this.ycord+1)*10));
                }
                if (this.ycord > 0) {
                    this.moves.push(this.xcord-2 + ((this.ycord-1)*10));
                }
            }
        }
    }
    getImage() {
        if (this.team == "black") {
            return "./piecePic/BlackKnight.png";
        } else {
            return "./piecePic/WhiteKnight.png";
        }
    }
    updateImage() {
        document.getElementById("img-" + String(super.getPos())).src = this.getImage();
    }
}

class Bishop extends Piece {
    constructor(xcord, ycord, team, type) {
        super(xcord, ycord, team);
    }
    getMoves() {
        this.moves.length = 0;
        var moveSet = [];
        var i = 1;
        while ((this.xcord-i) > -1 && (this.ycord+i) < 8) {
            if(containsPiece(this.xcord-i, this.ycord+i)) {
                if (cells[this.ycord+i][this.xcord-i].team != this.team) {
                    moveSet.push((this.xcord-(i)) + (this.ycord+i)*10);
                }
                break;
            } else {
                moveSet.push((this.xcord-(i)) + (this.ycord+i)*10);
            }
            i++;
        }
        this.moves.push(moveSet);
        i = 1;
        moveSet = [];
        while ((this.xcord-i) > -1 && (this.ycord-i) > -1) {
            if(cells[this.ycord-i][this.xcord-i] != null) {
                if (cells[this.ycord-i][this.xcord-i].team != this.team) {
                    moveSet.push((this.xcord-(i)) + (this.ycord-i)*10);
                }
                break;
            } else {
                moveSet.push((this.xcord-(i)) + (this.ycord-i)*10);
            }
            i++;
        }
        this.moves.push(moveSet);
        i = 1;
        moveSet = [];
        while ((this.xcord+i) < 8 && (this.ycord+i) < 8) {
            if(cells[this.ycord+i][this.xcord+i] != null) {
                if (cells[this.ycord+i][this.xcord+i].team != this.team) {
                    moveSet.push((this.xcord+(i)) + (this.ycord+i)*10);
                }
                break;
            } else {
                moveSet.push((this.xcord+(i)) + (this.ycord+i)*10);
            }
            i++;
        }
        this.moves.push(moveSet);
        i = 1;
        moveSet = [];
        while ((this.xcord+i) < 8 && (this.ycord-i) > -1) {
            if(cells[this.ycord-i][this.xcord+i] != null) {
                if (cells[this.ycord-i][this.xcord+i].team != this.team) {
                    moveSet.push((this.xcord+(i)) + (this.ycord-i)*10);
                }
                break;
            } else {
                moveSet.push((this.xcord+(i)) + (this.ycord-i)*10);
            }
            i++;
        }
        this.moves.push(moveSet);
    }
    getImage() {
        if (this.team == "black") {
            return "./piecePic/BlackBishop.png";
        } else {
            return "./piecePic/WhiteBishop.png";
        }
    }
    updateImage() {
        document.getElementById("img-" + String(super.getPos())).src = this.getImage();
    }
}

class Rook extends Piece {
    constructor(xcord, ycord, team) {
        super(xcord, ycord, team);
    }
    getMoves() {
        this.moves.length = 0;
        var moveSet = [];
        var i;
        for(i=this.xcord-1; i>-1; i--) {
            //Left of Rook
            if(cells[this.ycord][i] != null) {
                //If possible loc is a piece
                if (cells[this.ycord][i].team != this.team) {
                    //If enemy team, add loc before breaking lop
                    moveSet.push(i + (this.ycord*10));
                }
                break;
            } else {
                moveSet.push(i + (this.ycord*10));
            }
        }
        this.moves.push(moveSet);
        moveSet = [];
        for(i=this.xcord+1; i<8; i++) {
            //Right of Rook
            if(cells[this.ycord][i] != null) {
                //If possible loc is a piece
                if (cells[this.ycord][i].team != this.team) {
                    //If enemy team, add loc before breaking lop
                    moveSet.push(i + (this.ycord*10));
                }
                break;
            } else {
                moveSet.push(i + (this.ycord*10));
            }
        }
        this.moves.push(moveSet);
        moveSet = [];
        for(i=this.ycord+1; i<8; i++) {
            //Down from Rook
            if(cells[i][this.xcord] != null) {
                //If possible loc is a piece
                if (cells[i][this.xcord].team != this.team) {
                    //If enemy team, add loc before breaking lop
                    moveSet.push(this.xcord + (i*10));
                }
                break;
            } else {
                moveSet.push(this.xcord + (i*10));
            }
        }
        this.moves.push(moveSet);
        moveSet = [];
        for(i=this.ycord-1; i>-1; i--) {
            if(cells[i][this.xcord] != null) {
                //If possible loc is a piece
                if (cells[i][this.xcord].team != this.team) {
                    //If enemy team, add loc before breaking lop
                    moveSet.push(this.xcord + (i*10));
                    }
                break;
            } else {
                moveSet.push(this.xcord + (i*10));
            }
        }
        this.moves.push(moveSet);
    }
    getImage() {
        if (this.team == "black") {
            return "./piecePic/BlackRook.png";
        } else {
            return "./piecePic/WhiteRook.png";
        }
        
    }
    updateImage() {
        console.log(this.getImage());
        document.getElementById("img-" + String(super.getPos())).src = this.getImage();
    }
}

class Queen extends Piece {
    constructor(xcord, ycord, team) {
        super(xcord, ycord, team);
    }
    getMoves() {
        this.moves.length = 0;
        var moveSet = [];
        var i;
        for(i=this.xcord-1; i>-1; i--) {
            //Left of Queen
            if(cells[this.ycord][i] != null) {
                //If possible loc is a piece
                if (cells[this.ycord][i].team != this.team) {
                    //If enemy team, add loc before breaking lop
                    moveSet.push(i + (this.ycord*10));
                }
                break;
            } else {
                moveSet.push(i + (this.ycord*10));
            }
        }
        this.moves.push(moveSet);
        moveSet = [];
        for(i=this.xcord+1; i<8; i++) {
            //Right of Queen
            if(cells[this.ycord][i] != null) {
                //If possible loc is a piece
                if (cells[this.ycord][i].team != this.team) {
                    //If enemy team, add loc before breaking lop
                    moveSet.push(i + (this.ycord*10));
                }
                break;
            } else {
                moveSet.push(i + (this.ycord*10));
            }
        }
        this.moves.push(moveSet);
        moveSet = [];
        for(i=this.ycord+1; i<8; i++) {
            //Down from Queen
            if(cells[i][this.xcord] != null) {
                //If possible loc is a piece
                if (cells[i][this.xcord].team != this.team) {
                    //If enemy team, add loc before breaking lop
                    moveSet.push(this.xcord + (i*10));
                }
                break;
            } else {
                moveSet.push(this.xcord + (i*10));
            }
        }
        this.moves.push(moveSet);
        moveSet = [];
        for(i=this.ycord-1; i>-1; i--) {
            if(cells[i][this.xcord] != null) {
                //If possible loc is a piece
                if (cells[i][this.xcord].team != this.team) {
                    //If enemy team, add loc before breaking lop
                    moveSet.push(this.xcord + (i*10));
                    }
                break;
            } else {
                moveSet.push(this.xcord + (i*10));
            }
        }
        this.moves.push(moveSet);

        moveSet = [];
        i = 1;
        while ((this.xcord-i) > -1 && (this.ycord+i) < 8) {
            if(containsPiece(this.xcord-i, this.ycord+i)) {
                if (cells[this.ycord+i][this.xcord-i].team != this.team) {
                    moveSet.push((this.xcord-(i)) + (this.ycord+i)*10);
                }
                break;
            } else {
                moveSet.push((this.xcord-(i)) + (this.ycord+i)*10);
            }
            i++;
        }
        this.moves.push(moveSet);
        i = 1;
        moveSet = [];
        while ((this.xcord-i) > -1 && (this.ycord-i) > -1) {
            if(cells[this.ycord-i][this.xcord-i] != null) {
                if (cells[this.ycord-i][this.xcord-i].team != this.team) {
                    moveSet.push((this.xcord-(i)) + (this.ycord-i)*10);
                }
                break;
            } else {
                moveSet.push((this.xcord-(i)) + (this.ycord-i)*10);
            }
            i++;
        }
        this.moves.push(moveSet);
        i = 1;
        moveSet = [];
        while ((this.xcord+i) < 8 && (this.ycord+i) < 8) {
            if(cells[this.ycord+i][this.xcord+i] != null) {
                if (cells[this.ycord+i][this.xcord+i].team != this.team) {
                    moveSet.push((this.xcord+(i)) + (this.ycord+i)*10);
                }
                break;
            } else {
                moveSet.push((this.xcord+(i)) + (this.ycord+i)*10);
            }
            i++;
        }
        this.moves.push(moveSet);
        i = 1;
        moveSet = [];
        while ((this.xcord+i) < 8 && (this.ycord-i) > -1) {
            if(cells[this.ycord-i][this.xcord+i] != null) {
                if (cells[this.ycord-i][this.xcord+i].team != this.team) {
                    moveSet.push((this.xcord+(i)) + (this.ycord-i)*10);
                }
                break;
            } else {
                moveSet.push((this.xcord+(i)) + (this.ycord-i)*10);
            }
            i++;
        }
        this.moves.push(moveSet);
    }
    getImage() {
        if (this.team == "black") {
            return "./piecePic/BlackQueen.png";
        } else {
            return "./piecePic/WhiteQueen.png";
        } 
    }
    updateImage() {
        document.getElementById("img-" + String(super.getPos())).src = this.getImage();
    }
}

class King extends Piece {
    constructor(xcord, ycord, team) {
        super(xcord, ycord, team);
    }
    getMoves() {
        this.moves.length = 0;
        if (this.xcord > 0) {
            this.moves.push((this.xcord-1) + this.ycord*10);
            if (this.ycord > 0) {
                this.moves.push((this.xcord-1) + ((this.ycord-1)*10));
            }
            if (this.ycord < 7) {
                this.moves.push((this.xcord-1) + ((this.ycord+1)*10));
            }
        }
        if (this.xcord < 7) {
            this.moves.push((this.xcord+1) + this.ycord*10);
            if (this.ycord > 0) {
                this.moves.push((this.xcord+1) + ((this.ycord-1)*10));
            }
            if (this.ycord < 7) {
                this.moves.push((this.xcord+1) + ((this.ycord+1)*10));
            }
        }
        if (this.ycord > 0) {
            this.moves.push(this.xcord + ((this.ycord-1)*10));
        }
        if (this.ycord < 7) {
            this.moves.push(this.xcord + ((this.ycord+1)*10));
        }
    }
    getImage() {
        if (this.team == "black") {
            return "./piecePic/BlackKing.png";
        } else {
            return "./piecePic/WhiteKing.png";
        }
    }
    updateImage() {
        document.getElementById("img-" + String(super.getPos())).src = this.getImage();
    }
}

/*
Returns true if the cell contains a piece, false if not
*/
function containsPiece(xcord, ycord) {
    if (cells[ycord][xcord] == null) {
        return false;
    } else {
        return true;
    }
}