/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var path = require('path');         // Requiring path to navigate directories
var app     = express();            // Need to instantiate an express object to interact with the server in our code
PORT        = 9181;                 // Port number 


// Database
// var db = require('./db-connector') //Uncomment later when we connect database


/*
    ROUTES
*/
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../html/index.html'));
});



/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('http://flip2.engr.oregonstate.edu:8302/ http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});