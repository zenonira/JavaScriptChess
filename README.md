# JavaScriptChess
Chess created with Javascript.

Press the button to start the game, white goes first.

Show Possible Moves button allows the users to toggle whether or not to show possible moves when a piece has been selected.
    Red box means that it will show possible moves
    No box means that it will not show possible moves

To run, download zip file and extract to desired folder. Execute(double click) chess.html which will open up a web browser (I have been using chrome)

Future Things to add:
    -Game end whith checkMate. Thoughts: Check to see if moving the king to any possible loc would get it out of check. If not, check every piece on its team and see if moving them to there possible locs would get them out of check.
    -Don't castle through check. Thoughts: Artificially move king to the spots that need to be checked and check to see if that causes check
    -Keep score of player wins and draws. Thoughts: Include a counter that increases when reset is pressed, give a point to the team not in check or a stalemate.
    -If Pawn at end of board, change to Queen, Knight, Bishop or Rook. Thoughts: Have an extra amount of those for both teams that you can just replace
