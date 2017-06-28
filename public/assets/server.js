// This is the server-side file of our mobile remote controller app.
// It initializes socket.io and a new express instance and controls the routing.
// Start it by running node server.js on your computer

// Create a socket.io server instance
var express = require('express');
var app = express();
var server  = require('http').Server(app);
var io      = require('socket.io')(server);
var static  = require('express-static');

// Listen on port 8000
// Uses process.env.PORT for Heroku deployment as Heroku will dynamically assign a port
server.listen(process.env.PORT || 8000);

// Serve static files by using static middleware
app.use("/css", static(__dirname + '/css'));
app.use("/js", static(__dirname + '/js'));
app.use("/img", static(__dirname + '/img'));

// Index route -- home page for website and mobile site
app.get('/', function (req, res) {
    // Basic user agent check - test for mobiles
    var userAgent = req.headers['user-agent'];
    if (/mobile/i.test(userAgent)) {
        // Send mobile to the navigation controls
        res.sendFile(__dirname + '/pages/mobile.html');
    } else {
        // Send desktop to the main site
        res.sendFile(__dirname + '/pages/index.html');
    }
});

// SOCKET IO
io.on('connection', function (socket) {

    // Shows list of connected clients on console whenever a new client connects
    io.clients(function(error, clients) {
        if (error) throw error;
        console.log(clients);
    });

    // Notify all connected clients except sender when a valid presentation is chosen
    socket.on('presentation chosen', function() {
        socket.broadcast.emit('presentation chosen');
        console.log("presentation chosen");
    });

    // Notify all connected clients except sender when a new presentation is being selected
    socket.on('re-choosing presentation', function() {
        socket.broadcast.emit('re-choosing presentation');
    });

    // Notify all connected clients except sender when there are slide changes
    socket.on('next-slide', function() {
        socket.broadcast.emit('next-slide');
    });

    socket.on('previous-slide', function() {
        socket.broadcast.emit('previous-slide');
    });

    // Notify all connected clients to load the presenter notes
    socket.on('presenter note', function(notes) {
        socket.broadcast.emit('presenter note', notes);
    });

});
