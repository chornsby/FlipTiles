//var createGrid = function($gameBoard, size) {
//    /* Create the game board HTML elements. */
//    $gameBoard.empty();
//
//    for (var i = 0; i < size; i++) {
//        $gameBoard.append('<div class="row"></div>');
//    }
//
//    var $row = $('.row');
//
//    for (var j = 0; j < size; j++) {
//        $row.append('<div class="tile"></div>');
//    }
//};

var othersToFlip = function(currentIndex, size) {
    /* Return a list of indices for tiles that also need flipping. */
    var tilesToFlip = [];

    if (currentIndex > size - 1) {
        tilesToFlip.push(currentIndex - size);
    }

    if (currentIndex < size * (size - 1)) {
        tilesToFlip.push(currentIndex + size)
    }

    if (currentIndex % size > 0) {
        tilesToFlip.push(currentIndex - 1)
    }

    if (currentIndex % size < size - 1) {
        tilesToFlip.push(currentIndex + 1)
    }

    return tilesToFlip;
};

var randomTile = function(size) {
    /* Return the index of a random tile. */
    return Math.floor(Math.random() * size * size);
};

var wonGame = function($selector, size) {
    /* Return true if the game is over. */
    for (var i = 0; i < size * size; i++) {
        if (!$selector.eq(i).hasClass('marked')) {
            return false;
        }
    }

    return true;
};

$(document).ready(function() {

    /* Set up game board. */
//    var $gameBoard = $('#game-board');
    var $newGame = $('#new-game');
    var $movesMade = $('#moves-made');
    var $won = $('#game-state');
    var size = 3;
//    createGrid($gameBoard, size);

    var $tile = $('.tile');

    $tile.eq(randomTile(size)).addClass('marked');

    var movesMade = 0;

    $newGame.click(function() {
        /* Reset the game board to the start. */

        $tile.removeClass('marked');

        movesMade = 0;
        $movesMade.text('Moves made: 0');
        $won.empty();

        $tile.eq(randomTile(size)).addClass('marked');
    });

    $tile.click(function() {

        if (wonGame($tile, size)) {
            return;
        }

        var $this = $(this);

        $this.toggleClass('marked');
        $movesMade.text('Moves made: ' + (movesMade + 1));
        movesMade++;

        var others = othersToFlip($this.index('.tile'), size);

        for (var i = 0; i < others.length; i++) {
            $tile.eq(others[i]).toggleClass('marked');
        }

        if (wonGame($tile, size)) {
            $won.text('You won!');
        } else {
            $won.empty();
        }

    });

});