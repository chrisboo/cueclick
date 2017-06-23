// Display for the current slide
var iframe;
// Default url for any presentation
var defaultUrl;
// An array of all the slides in the chosen presentation
var slides;
// Create new socket instance
// Socket.IO connection established to '/'
var socket = io.connect('/');
// Check if a slide has been chosen and loaded
var isInitialised;
// Counters to ensure there is a 'next' and 'previous' slide
var currentSlideNo;
var maxSlidesNo;
// Boolean value to indicate whether the next slide has loaded
var isReady = true;

// Initialise variables, and ensure that chosen presentation has been loaded
// before remote control is allowed
function initWebControl() {
    iframe = document.getElementById('slides');
    defaultUrl = "https://docs.google.com/presentation/d/" + presentation.presentationId + "/embed?start=false&loop=false&delayms=3000";
    slides = presentation.slides;
    currentSlideNo = 0;
    maxSlidesNo = presentation.slides.length;
    isInitialised = true;
}

// Ensure that the iframe has loaded before proceeding to prevent asynchronous
// programming from screwing up the slide counters
function changeReadyState() {
    isReady = true;
}

// Change the display in the iframe to the slide corresponding to slideNo
function slideChange() {
    var currentSlide = slides[currentSlideNo];
    var currentSlideId = currentSlide.objectId;
    iframe.src = defaultUrl + "#slide=id." + currentSlideId;
    iframe.onload = changeReadyState();
}

// Show client id on the browser console when a new client connects on desktop
socket.on('connect', function() {
    console.log('Web client connected!');
    console.log('Web id: ' + socket.id);
});

// Listen for the 'next-slide' event emitted by mobile client
socket.on('next-slide', function() {

    // Check if a valid presentation has been selected
    if (isInitialised) {

        // Check if the current slide has been loaded into the iframe
        if (isReady) {
            // Check if there is a next slide
            if (currentSlideNo >= (maxSlidesNo - 1)) {
                alert("There is no next slide!");
            } else {
                isReady = false;
                currentSlideNo++;
                slideChange();
            }
        }

    } else {
        alert("Please log in and select a valid Google Presentation!");
    }
});

// Listen for the 'previous-slide' event emitted by mobile client
socket.on('previous-slide', function() {

    // Check if a valid presentation has been selected
    if (isInitialised) {

        // Check if the current slide has been loaded into the iframe
        if (isReady) {
            // Check if there is a next slide
            if (currentSlideNo <= 0) {
                alert("There is no previous slide!");
            } else {
                isReady = false;
                currentSlideNo--;
                slideChange();
            }
        }

    } else {
        alert("Please log in and select a valid Google Presentation!");
    }
});
