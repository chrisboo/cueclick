// This is the server-side file of our mobile remote controller app.
// It initializes socket.io and a new express instance and controls the routing.
// Start it by running server.js on your computer

// Create a server instance
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

// Index route
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

// Set up dynamic page route
