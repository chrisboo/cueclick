/* This is the server-side file of our mobile remote controller app.
   It initializes socket.io and a new express instance and controls the routing.
   Additionally, it also creates and keeps track of user sessions.
   Start it by running node server.js on your computer
*/

// Store all the currently connected web clients
var webClients = [];

// Create a socket.io server instance
var express = require('express');
var app = express();
var server  = require('http').Server(app);
var io      = require('socket.io')(server);
var static  = require('express-static');

// Import middleware for storing secret key on mobile end
var fs = require('fs');
var replace = require('stream-replace');

// Import middleware for secret key validation
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

// Listen on port 8000
// Uses process.env.PORT for Heroku deployment as Heroku will dynamically assign a port
server.listen(process.env.PORT || 8000);

// Serve static files by using static middleware
app.use("/css", static(__dirname + '/css'));
app.use("/js", static(__dirname + '/js'));
app.use("/img", static(__dirname + '/img'));

// Add body parser and validator to the middleware stack as well
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// Index route -- home page for website and mobile site
app.get('/', function (req, res) {

    console.log("at /: " + JSON.stringify(req.body));
    // Basic user agent check - test for mobiles
    var userAgent = req.headers['user-agent'];
    if (/mobile/i.test(userAgent)) {
        // Send mobile to the mobile login site
        res.sendFile(__dirname + '/pages/mobile.html');
    } else {
        // Send desktop to the main site
        res.sendFile(__dirname + '/pages/index.html');
    }
});

// Dealing with secret key input
app.post('/secretKey', function(req, res) {

    console.log("at /secret: " + JSON.stringify(req.body));

    // Check that the secret key field is not empty (even though we have already
    // made the field a required field)
    req.checkBody('secretKey', 'Secret key required').notEmpty();

    // Trim and escape the secret key field
    req.sanitize('secretKey').escape();
    req.sanitize('secretKey').trim();

    // Run the validators
    var error = req.validationErrors();

    if (error) {
        // Send users to an error page if there is really an error (not supposed to happen!)
        res.send("We are really sorryy, but an unexpected error occurred.");
        return;
    } else {
        // Otherwise, the data is valid
        // Store the secret key in a variable first
        var secretKey = req.body.secretKey;

        // Check if the secret key matches with any key in the database (current session)
        var index = webClients.indexOf(secretKey);

        // Send the user to the mobile controls if there is something that matches
        if (index != -1) {
            fs.createReadStream(__dirname + '/pages/mobileControl.html')
                .pipe(replace('to replace', secretKey))
                .pipe(res);
        } else {
            res.redirect('/');
        }
    }

});

// SOCKET IO
io.on('connection', function (socket) {

    // Shows list of connected clients on console whenever a new client connects
    io.clients(function(error, clients) {
        if (error) throw error;
        console.log(clients);
    });

    // Store web client id whenever a new web client connects
    socket.on('web client signed in', function(id) {
        console.log("web client connected: " + id);
        webClients.push(id);
    });

    // Remove web client id whenever a web client disconnects
    socket.on('web client signed out', function(id) {
        console.log("web client disconnected: " + id);
        var indexToRemove = webClients.indexOf(id);
        webClients.splice(indexToRemove, 1);
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
    socket.on('next-slide', function(webSocket) {
        socket.to(webSocket).emit('next-slide');
    });

    socket.on('previous-slide', function(webSocket) {
        socket.to(webSocket).emit('previous-slide');
    });

    // Notify all connected clients to load the presenter notes
    socket.on('presenter note', function(notes) {
        socket.broadcast.emit('presenter note', notes);
    });

});
