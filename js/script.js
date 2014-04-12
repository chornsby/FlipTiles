var size = 3;

var tiles = ['0,0', '1,0', '2,0',
             '0,1', '1,1', '2,1',
             '0,2', '1,2', '2,2'];

var othersToFlip = function(tileID) {
    /* Return a list of tileIDs that also need flipping. */
    var toFlip = [];
    var index = tiles.indexOf(tileID);

    if (index > size - 1) {
        toFlip.push(tiles[index-size]);
    }

    if (index < size * 2) {
        toFlip.push(tiles[index+size]);
    }

    if (index % size > 0) {
        toFlip.push(tiles[index-1]);
    }

    if (index % size < size - 1) {
        toFlip.push(tiles[index+1]);
    }

    return toFlip;
};

$(document).ready(function() {

    $reset = $('#reset');
    $tile = $('.tile');
    $movesMade = $('#moves-made')

    var movesMade = 0;

    $reset.click(function() {
        /* Reset the game board to the start. */

        $tile.removeClass('marked');

        movesMade = 0;
        $movesMade.text('Moves made: 0');
    });

    $tile.click(function() {
        $(this).toggleClass('marked');
        $movesMade.text('Moves made: ' + (movesMade + 1));
        movesMade++;

        var others = othersToFlip(this.id);

        for (var i = 0; i < others.length; i++) {
            document.getElementById(others[i]).classList.toggle('marked');
        }

    });

});