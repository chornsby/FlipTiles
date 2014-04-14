/*
TODO: Clean up code.
TODO: Support larger grid sizes.
 */



var size = 3;
var tileIDs = ['0,0', '1,0', '2,0', '0,1', '1,1', '2,1', '0,2', '1,2', '2,2'];
var tiles = [];

var getTilesList = function() {
    /* Update the tiles variable with the document elements. */

    tiles = [];

    for (var i = 0; i < tileIDs.length; i++) {
        tiles.push(document.getElementById(tileIDs[i]));
    }
};

var othersToFlip = function(tileID) {
    /* Return a list of tileIDs that also need flipping. */
    var tilesToFlip = [];
    var currentIndex = tileIDs.indexOf(tileID);

    if (currentIndex > size - 1) {
        tilesToFlip.push(tiles[currentIndex-size]);
    }

    if (currentIndex < size * 2) {
        tilesToFlip.push(tiles[currentIndex+size]);
    }

    if (currentIndex % size > 0) {
        tilesToFlip.push(tiles[currentIndex-1]);
    }

    if (currentIndex % size < size - 1) {
        tilesToFlip.push(tiles[currentIndex+1]);
    }

    return tilesToFlip;
};

var markRandomTile = function() {
    /* Set the class of a random tile to 'marked'. */
    var index = Math.floor(Math.random() * tileIDs.length);

    tiles[index].classList.add('marked');
};

var wonGame = function() {
    /* Return true if the game is over. */
    for (var i = 0; i < tiles.length; i++) {
        if (!tiles[i].classList.contains('marked')) {
            return false;
        }
    }

    return true;
};

$(document).ready(function() {

    $newGame = $('#new-game');
    $tile = $('.tile');
    $movesMade = $('#moves-made');
    $won = $('#game-state');

    getTilesList();
    markRandomTile();

    var movesMade = 0;

    $newGame.click(function() {
        /* Reset the game board to the start. */

        $tile.removeClass('marked');

        movesMade = 0;
        $movesMade.text('Moves made: 0');
        $won.empty();

        markRandomTile();
    });

    $tile.click(function() {

        if (wonGame()) {
            return;
        }

        $(this).toggleClass('marked');
        $movesMade.text('Moves made: ' + (movesMade + 1));
        movesMade++;

        var others = othersToFlip(this.id);

        for (var i = 0; i < others.length; i++) {
            others[i].classList.toggle('marked');
//            others[i].toggleClass('marked');
        }

        if (wonGame()) {
            $won.text('You won!');
        } else {
            $won.empty();
        }

    });

});