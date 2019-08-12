class Piece {
    constructor(xcord, ycord, team) {
        this.xcord = xcord; //x cordinate (one digit)
        this.ycord = ycord; //y cordinate (one digit)
        this.team = team;   //The team of the piece
    }
    /*
    Returns the position of the piece, y is the 10's digit, x is the ones digit
    */
    getPos() {
        return (this.xcord + this.ycord*10);
    }

    /*
    Updates the position of the piece given and x cordinate and a y cordinate
    */
    updatePos2(newX, newY) {
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
    returnName() {
        return "Pawn";
    }
    /*
    Output: Updates moves in the parent class, which is an array of numbers, of the possible moves of the pawn
    */
    getMoves() {
        var moves = []; //Possible locations to move. Single numbers representing cordinates
        moves.length = 0;
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
                moves.push(this.xcord+((this.ycord+mov)*10));
                //First move pawn can move two spaces
                if (this.firstMove == true) {
                    if (cells[this.ycord+(mov*2)][this.xcord] == null) {
                        moves.push(this.xcord + ((this.ycord+(mov*2))*10));
                    }
                }
            }
            //Checking if it can take a piece diagonally
            if (this.xcord != 7) {
                //diagonal towards right side of board
                if (cells[this.ycord+mov][this.xcord+1] != null || (enLocs[this.xcord+1+teamAdd] != 0 && this.ycord == yAdd)) {
                    moves.push(this.xcord+1+((this.ycord+mov)*10));
                }
            }
            if (this.xcord != 0) {
                //diagonal towards left side of board
                if (cells[this.ycord+mov][this.xcord-1] != null || (enLocs[this.xcord-1+teamAdd] != 0 && this.ycord == yAdd)) {
                    moves.push(this.xcord-1+((this.ycord+mov)*10));
                }
            }
        }
        return moves;
    }
    /*
    Sets the first move to false after the first move of the pawn
    */
    firstMoveFalse() {
        this.firstMove = false;
    }
    firstMoveTrue() {
        this.firstMove = true;
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
    returnName() {
        return "Knight";
    }
    /*
    Output: Updates moves in the parent class, which is an array of numbers, of the possible moves of the piece
    */
    getMoves() {
        var moves = []; //Possible locations to move. Single numbers representing cordinates
        if (this.xcord < 7) {
            if (this.ycord < 6) {
                if (cells[this.ycord+2][this.xcord+1] == null) {
                    moves.push(this.xcord+1 + ((this.ycord+2)*10));
                } else if (cells[this.ycord+2][this.xcord+1].team != this.team) {
                    moves.push(this.xcord+1 + ((this.ycord+2)*10));
                }
            }
            if (this.ycord > 1) {
                if (cells[this.ycord-2][this.xcord+1] == null) {
                    moves.push(this.xcord+1 + ((this.ycord-2)*10));
                } else if (cells[this.ycord-2][this.xcord+1].team != this.team) {
                    moves.push(this.xcord+1 + ((this.ycord-2)*10));
                }
            }
            if (this.xcord < 6) {
                if (this.ycord < 7) {
                    if (cells[this.ycord+1][this.xcord+2] == null) {
                        moves.push(this.xcord+2 + ((this.ycord+1)*10));
                    } else if (cells[this.ycord+1][this.xcord+2].team != this.team) {
                        moves.push(this.xcord+2 + ((this.ycord+1)*10));
                    }
                }
                if (this.ycord > 0) {
                    if (cells[this.ycord-1][this.xcord+2] == null) {
                        moves.push(this.xcord+2 + ((this.ycord-1)*10));
                    } else if (cells[this.ycord-1][this.xcord+2].team != this.team) {
                        moves.push(this.xcord+2 + ((this.ycord-1)*10));
                    }
                }
            }
        }
        if (this.xcord > 0) {
            if (this.ycord < 6) {
                if (cells[this.ycord+2][this.xcord-1] == null) {
                    moves.push(this.xcord-1 + ((this.ycord+2)*10));
                } else if (cells[this.ycord+2][this.xcord-1].team != this.team) {
                    moves.push(this.xcord-1 + ((this.ycord+2)*10));
                }
            }
            if (this.ycord > 1) {
                if (cells[this.ycord-2][this.xcord-1] == null) {
                    moves.push(this.xcord-1 + ((this.ycord-2)*10));
                } else if (cells[this.ycord-2][this.xcord-1].team != this.team) {
                    moves.push(this.xcord-1 + ((this.ycord-2)*10));
                }
            }
            if (this.xcord > 1) {
                if (this.ycord < 7) {
                    if (cells[this.ycord+1][this.xcord-2] == null) {
                        moves.push(this.xcord-2 + ((this.ycord+1)*10));   
                    } else if (cells[this.ycord+1][this.xcord-2].team != this.team) {
                        moves.push(this.xcord-2 + ((this.ycord+1)*10));
                    }
                }
                if (this.ycord > 0) {
                    if (cells[this.ycord-1][this.xcord-2] == null) {
                        moves.push(this.xcord-2 + ((this.ycord-1)*10));   
                    } else if (cells[this.ycord-1][this.xcord-2].team != this.team) {
                        moves.push(this.xcord-2 + ((this.ycord-1)*10));
                    }
                }
            }
        }
        return moves;
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
    returnName() {
        return "Bishop";
    }
    getMoves() {
        var moves = []; //Possible locations to move. Single numbers representing cordinates
        var i = 1;
        while ((this.xcord-i) > -1 && (this.ycord+i) < 8) {
            if(containsPiece(this.xcord-i, this.ycord+i)) {
                if (cells[this.ycord+i][this.xcord-i].team != this.team) {
                    moves.push((this.xcord-(i)) + (this.ycord+i)*10);
                }
                break;
            } else {
                moves.push((this.xcord-(i)) + (this.ycord+i)*10);
            }
            i++;
        }
        i = 1;
        while ((this.xcord-i) > -1 && (this.ycord-i) > -1) {
            if(cells[this.ycord-i][this.xcord-i] != null) {
                if (cells[this.ycord-i][this.xcord-i].team != this.team) {
                    moves.push((this.xcord-(i)) + (this.ycord-i)*10);
                }
                break;
            } else {
                moves.push((this.xcord-(i)) + (this.ycord-i)*10);
            }
            i++;
        }
        i = 1;
        while ((this.xcord+i) < 8 && (this.ycord+i) < 8) {
            if(cells[this.ycord+i][this.xcord+i] != null) {
                if (cells[this.ycord+i][this.xcord+i].team != this.team) {
                    moves.push((this.xcord+(i)) + (this.ycord+i)*10);
                }
                break;
            } else {
                moves.push((this.xcord+(i)) + (this.ycord+i)*10);
            }
            i++;
        }
        i = 1;
        while ((this.xcord+i) < 8 && (this.ycord-i) > -1) {
            if(cells[this.ycord-i][this.xcord+i] != null) {
                if (cells[this.ycord-i][this.xcord+i].team != this.team) {
                    moves.push((this.xcord+(i)) + (this.ycord-i)*10);
                }
                break;
            } else {
                moves.push((this.xcord+(i)) + (this.ycord-i)*10);
            }
            i++;
        }
        return moves;
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
        this.firstMove = true;
    }
    returnName() {
        return "Rook";
    }
    getMoves() {
        var moves = []; //Possible locations to move. Single numbers representing cordinates
        var i;
        for(i=this.xcord-1; i>-1; i--) {
            //Left of Rook
            if(cells[this.ycord][i] != null) {
                //If possible loc is a piece
                if (cells[this.ycord][i].team != this.team) {
                    //If enemy team, add loc before breaking lop
                    moves.push(i + (this.ycord*10));
                }
                break;
            } else {
                moves.push(i + (this.ycord*10));
            }
        }
        for(i=this.xcord+1; i<8; i++) {
            //Right of Rook
            if(cells[this.ycord][i] != null) {
                //If possible loc is a piece
                if (cells[this.ycord][i].team != this.team) {
                    //If enemy team, add loc before breaking lop
                    moves.push(i + (this.ycord*10));
                }
                break;
            } else {
                moves.push(i + (this.ycord*10));
            }
        }
        for(i=this.ycord+1; i<8; i++) {
            //Down from Rook
            if(cells[i][this.xcord] != null) {
                //If possible loc is a piece
                if (cells[i][this.xcord].team != this.team) {
                    //If enemy team, add loc before breaking lop
                    moves.push(this.xcord + (i*10));
                }
                break;
            } else {
                moves.push(this.xcord + (i*10));
            }
        }
        for(i=this.ycord-1; i>-1; i--) {
            if(cells[i][this.xcord] != null) {
                //If possible loc is a piece
                if (cells[i][this.xcord].team != this.team) {
                    //If enemy team, add loc before breaking lop
                    moves.push(this.xcord + (i*10));
                    }
                break;
            } else {
                moves.push(this.xcord + (i*10));
            }
        }
        return moves;
    }
    getImage() {
        if (this.team == "black") {
            return "./piecePic/BlackRook.png";
        } else {
            return "./piecePic/WhiteRook.png";
        }
        
    }
    updateImage() {
        document.getElementById("img-" + String(super.getPos())).src = this.getImage();
    }
    firstMoveTrue() {
        this.firstMove = true;
    }
    firstMoveFalse() {
        this.firstMove = false;
    }
}

class Queen extends Piece {
    constructor(xcord, ycord, team) {
        super(xcord, ycord, team);
    }
    returnName() {
        return "Queen";
    }
    getMoves() {
        var moves = []; //Possible locations to move. Single numbers representing cordinates
        var i;
        for(i=this.xcord-1; i>-1; i--) {
            //Left of Queen
            if(cells[this.ycord][i] != null) {
                //If possible loc is a piece
                if (cells[this.ycord][i].team != this.team) {
                    //If enemy team, add loc before breaking lop
                    moves.push(i + (this.ycord*10));
                }
                break;
            } else {
                moves.push(i + (this.ycord*10));
            }
        }
        for(i=this.xcord+1; i<8; i++) {
            //Right of Queen
            if(cells[this.ycord][i] != null) {
                //If possible loc is a piece
                if (cells[this.ycord][i].team != this.team) {
                    //If enemy team, add loc before breaking lop
                    moves.push(i + (this.ycord*10));
                }
                break;
            } else {
                moves.push(i + (this.ycord*10));
            }
        }
        for(i=this.ycord+1; i<8; i++) {
            //Down from Queen
            if(cells[i][this.xcord] != null) {
                //If possible loc is a piece
                if (cells[i][this.xcord].team != this.team) {
                    //If enemy team, add loc before breaking lop
                    moves.push(this.xcord + (i*10));
                }
                break;
            } else {
                moves.push(this.xcord + (i*10));
            }
        }
        for(i=this.ycord-1; i>-1; i--) {
            if(cells[i][this.xcord] != null) {
                //If possible loc is a piece
                if (cells[i][this.xcord].team != this.team) {
                    //If enemy team, add loc before breaking lop
                    moves.push(this.xcord + (i*10));
                    }
                break;
            } else {
                moves.push(this.xcord + (i*10));
            }
        }
        i = 1;
        while ((this.xcord-i) > -1 && (this.ycord+i) < 8) {
            if(containsPiece(this.xcord-i, this.ycord+i)) {
                if (cells[this.ycord+i][this.xcord-i].team != this.team) {
                    moves.push((this.xcord-(i)) + (this.ycord+i)*10);
                }
                break;
            } else {
                moves.push((this.xcord-(i)) + (this.ycord+i)*10);
            }
            i++;
        }
        i = 1;
        while ((this.xcord-i) > -1 && (this.ycord-i) > -1) {
            if(cells[this.ycord-i][this.xcord-i] != null) {
                if (cells[this.ycord-i][this.xcord-i].team != this.team) {
                    moves.push((this.xcord-(i)) + (this.ycord-i)*10);
                }
                break;
            } else {
                moves.push((this.xcord-(i)) + (this.ycord-i)*10);
            }
            i++;
        }
        i = 1;
        while ((this.xcord+i) < 8 && (this.ycord+i) < 8) {
            if(cells[this.ycord+i][this.xcord+i] != null) {
                if (cells[this.ycord+i][this.xcord+i].team != this.team) {
                    moves.push((this.xcord+(i)) + (this.ycord+i)*10);
                }
                break;
            } else {
                moves.push((this.xcord+(i)) + (this.ycord+i)*10);
            }
            i++;
        }
        i = 1;
        while ((this.xcord+i) < 8 && (this.ycord-i) > -1) {
            if(cells[this.ycord-i][this.xcord+i] != null) {
                if (cells[this.ycord-i][this.xcord+i].team != this.team) {
                    moves.push((this.xcord+(i)) + (this.ycord-i)*10);
                }
                break;
            } else {
                moves.push((this.xcord+(i)) + (this.ycord-i)*10);
            }
            i++;
        }
        return moves;
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
        this.firstMove = true;
        this.canCastle = false;
    }
    returnName() {
        return "King";
    }
    getMoves() {
        var moves = []; //Possible locations to move. Single numbers representing cordinates
        if (this.xcord > 0) {
            if (cells[this.ycord][this.xcord-1] == null) {
                moves.push((this.xcord-1) + this.ycord*10);    
            } else if (cells[this.ycord][this.xcord-1].team != this.team) {
                moves.push((this.xcord-1) + this.ycord*10); 
            }
            if (this.ycord > 0) {
                if (cells[this.ycord-1][this.xcord-1] == null) {
                    moves.push((this.xcord-1) + ((this.ycord-1)*10));
                } else if (cells[this.ycord-1][this.xcord-1].team != this.team) {
                    moves.push((this.xcord-1) + ((this.ycord-1)*10));
                }
            }
            if (this.ycord < 7) {
                if (cells[this.ycord+1][this.xcord-1] == null) {
                    moves.push((this.xcord-1) + ((this.ycord+1)*10));
                } else if (cells[this.ycord+1][this.xcord-1].team != this.team) {
                    moves.push((this.xcord-1) + ((this.ycord+1)*10));
                }
            }
        }
        if (this.xcord < 7) {
            if (cells[this.ycord][this.xcord+1] == null) {
                moves.push((this.xcord+1) + this.ycord*10);   
            } else if (cells[this.ycord][this.xcord+1].team != this.team) {
                moves.push((this.xcord+1) + this.ycord*10);
            }
            if (this.ycord > 0) {
                if (cells[this.ycord-1][this.xcord+1] == null) {
                    moves.push((this.xcord+1) + ((this.ycord-1)*10));
                } else if (cells[this.ycord-1][this.xcord+1].team != this.team) {
                    moves.push((this.xcord+1) + ((this.ycord-1)*10));
                }
            }
            if (this.ycord < 7) {
                if (cells[this.ycord+1][this.xcord+1] == null) {
                    moves.push((this.xcord+1) + ((this.ycord+1)*10));   
                } else if (cells[this.ycord+1][this.xcord+1].team != this.team) {
                    moves.push((this.xcord+1) + ((this.ycord+1)*10));
                }
            }
        }
        if (this.ycord > 0) {
            if (cells[this.ycord-1][this.xcord] == null) {
                moves.push(this.xcord + ((this.ycord-1)*10));
            } else if (cells[this.ycord-1][this.xcord].team != this.team) {
                moves.push(this.xcord + ((this.ycord-1)*10));
            }
        }
        if (this.ycord < 7) {
            if (cells[this.ycord+1][this.xcord] == null) {
                moves.push(this.xcord + ((this.ycord+1)*10));   
            } else if (cells[this.ycord+1][this.xcord].team != this.team) {
                moves.push(this.xcord + ((this.ycord+1)*10));
            }
        }

        //Castling
        if (this.firstMove) {
            if (this.team == "white") {
                //Checking if White Rook on left of board has moved
                if (cells[7][0] == whiteRook1) {
                    if (cells[7][0].firstMove) {
                        //Check if no pieces are inbetween the two
                        if (cells[7][1] == null && cells[7][2] == null && cells[7][3] == null) {
                            moves.push(70); //Bottom left square
                            this.canCastle = true;
                        } else {
                            this.canCastle = false;
                        }
                    } else {
                        this.canCastle = false;
                    }
                } else {
                    this.canCastle = false;
                }
                //Checking if White Rook on right has moved
                if (cells[7][7] == whiteRook2) {
                    if (cells[7][7].firstMove) {
                        //Check if no pieces are inbetween the two
                        if (cells[7][6] == null && cells[7][5] == null) {
                            moves.push(77); //Bottom right square
                            this.canCastle = true;
                        }
                    }
                }
            } else {
                //Checking if Black Rook on left has moved
                if (cells[0][0] == blackRook1) {
                    if (cells[0][0].firstMove) {
                        //Check if no pieces are inbetween the two
                        if (cells[0][1] == null && cells[0][2] == null && cells[0][3] == null) {
                            moves.push(0);
                            this.canCastle = true;
                        } else {
                            this.canCastle = false;
                        }
                    } else {
                        this.canCastle = false;
                    }
                } else {
                    this.canCastle = false;
                }
                //Checking if Black Rook on right has moved
                if (cells[0][7] == blackRook2) {
                    if (cells[0][7].firstMove) {
                        //Checking if no pieces are inbetween the two
                        if (cells[0][6] == null && cells[0][5] == null) {
                            moves.push(7);
                            this.canCastle = true;
                        }
                    }  
                }
            }
        } else {
            this.canCastle = false;
        }
        return moves;
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
    firstMoveTrue() {
        this.firstMove = true;
    }
    firstMoveFalse() {
        this.firstMove = false;
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