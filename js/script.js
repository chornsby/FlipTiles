/*
TODO: Support larger grid sizes.
TODO: Add more comments to code.
 */

var size = 3;

/*
TODO: Build list of tiles using JS or have multiple lists.
 */

var tiles = ['0,0', '1,0', '2,0',
             '0,1', '1,1', '2,1',
             '0,2', '1,2', '2,2'];

var wonGame = false;

var othersToFlip = function(tileID) {
    /* Return a list of tileIDs that also need flipping. */
    var tilesToFlip = [];
    var currentIndex = tiles.indexOf(tileID);

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

var randomTile = function() {
    /* Return the ID of a random tile. */
    var index = Math.floor(Math.random() * tiles.length);

    return tiles[index];
};

/*
TODO: Neaten this function.
 */
$(document).ready(function() {

    $newGame = $('#new-game');
    $tile = $('.tile');
    $movesMade = $('#moves-made');
    $won = $('#game-state');

    /*
    TODO: Work out better combination of JS and jQ.
     */
    document.getElementById(randomTile()).classList.add('marked');

    var movesMade = 0;

    $newGame.click(function() {
        /* Reset the game board to the start. */

        $tile.removeClass('marked');

        movesMade = 0;
        $movesMade.text('Moves made: 0');
        $won.empty();

        wonGame = false;

        document.getElementById(randomTile()).classList.add('marked');
    });

    $tile.click(function() {

        if (wonGame) {
            return;
        }

        $(this).toggleClass('marked');
        $movesMade.text('Moves made: ' + (movesMade + 1));
        movesMade++;

        var others = othersToFlip(this.id);

        for (var i = 0; i < others.length; i++) {
            document.getElementById(others[i]).classList.toggle('marked');
        }

        /* Assume game is won until find evidence that it is not. */
        wonGame = true;

        for (var j = 0; j < tiles.length; j++) {
            if (!document.getElementById(tiles[j]).classList.contains('marked')) {
                wonGame = false;
                break;
            }
        }

        if (wonGame) {
            $won.text('You won!');
        } else {
            $won.empty();
        }

    });

});