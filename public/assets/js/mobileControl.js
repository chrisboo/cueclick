// Segment for displaying the presenter note
var presenterNotes = document.getElementById('note');

// Create new socket instance
var socket = io.connect('/');

// TEMPORARY room
var room = tempRoom.substr(0, tempRoom.length - 2);

// Once socket has connected, join it to the web client room
socket.on('connect', function() {
    socket.emit('room', room);
});

// Make presenter note div appear after a valid presentation is chosen
socket.on('presentation chosen', function() {
    socket.emit('room', room);
    initNotesDisplay();
});

// Prepares the segment for the script to be displayed
function initNotesDisplay() {
    presenterNotes.style.display = 'block';
    instructions.style.display = 'none';
}

// Listen for presenter note event
socket.on('presenter note', function(notes) {
    displayNotes(notes);
});

// Display the presenter note on mobile
function displayNotes(notes) {
    var oldContent = document.getElementById('script');
    var para = document.createElement("p");
    para.id = 'script';
    var newContent = document.createTextNode(notes);
    para.appendChild(newContent);
    presenterNotes.replaceChild(para, oldContent);
}

// Make presenter note div disappear, and instructions div reappear when
// new slides are being chosen
socket.on('re-choosing presentation', function() {
    presenterNotes.style.display = 'none';
    instructions.style.display = 'block';
});

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
    if ( !xDown || !yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs( xDiff ) > Math.abs( yDiff )) {
        if ( xDiff > 0 ) {
            // Swipe towards left <--
            socket.emit('next-slide', room);
        } else {
            // Swipe towards right -->
            socket.emit('previous-slide', room);
        }
    }
    // Reset values
    xDown = null;
    yDown = null;
};
