// Add event listeners for touchstart (new touch on the surface)
// and touchmove (when user moves a touch point along the surface)
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs( xDiff ) > Math.abs( yDiff )) {
        if ( xDiff > 0 ) {
            // Swipe towards left
            alert("Next Slide!");

        } else {
            // Swipe towards right
            alert("Previous Slide!");
        }
    }
    // Reset values
    xDown = null;
    yDown = null;
};
