// citation: Node.js starter guide. https://github.com/osu-cs340-ecampus/nodejs-starter-app



/*
    SETUP
*/

// Express
var express = require('express');   // We are using the express library for the web server
var path = require('path');         // Requiring path to navigate directories
var app     = express();            // Need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 27491;                 // Port number (BRANDIE)
//PORT        = 9181;                 // Port number (JOANA)


// Handlebars
const {engine} = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.



// Database
var db = require('./database/db-connector');


/*******************************
    ROUTES
********************************/

//---------
// Homepage 
//---------
app.get('/', function(req, res)
    {
        res.render('index');                  // Render the index.hbs file
        })                                                   
    ; 

//------------------
// Restaurants page
//------------------
// render the page and create query for dropdown -- 
app.get('/restaurants', function(req, res)
    {  
        // Declare Query 1
        let query1 = "SELECT * FROM Restaurants;";

        // Query 2 is the same in both cases
        let query2 = "SELECT * FROM Price_Levels;";

        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields){
            
            // Save the restaurants
            let restaurants = rows;
            
            // Run the second query
            db.pool.query(query2, (error, rows, fields) => {
                
                // Save the price levels
                let price_levels = rows;
                return res.render('restaurants', {data: restaurants, price_levels: price_levels});
        })
        })                                              
    });  
    // received back from the query

//Add a new restaurant
app.post('/add-restaurant-form', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

    //Capture NULL values
    let streetAddress = parseInt(data['input-streetAddress']);
    if (isNaN(streetAddress))
    {
        streetAddress = 'NULL'
    }

    let website = parseInt(data['websiteInput']);
    if (isNaN(website))
    {
        website = 'NULL'
    }
    
        // Create the query and run it on the database
    query1 = `INSERT INTO Restaurants (name, streetAddress, city, state, zipCode, phoneNumber, website, priceID) 
                VALUES ('${data['nameInput']}', '${data['streetAddressInput']}', '${data['cityInput']}',   
                '${data['stateInput']}', '${data['zipCodeInput']}', '${data['phoneNumberInput']}', 
                '${data['websiteInput']}', '${data['priceIDInput']}')`;
    
    db.pool.query(query1, function(error, rows, fields){
    
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our restaurants route, which automatically runs the SELECT * FROM Restaurants and
        // presents it on the screen
        else
        {
            res.redirect('/restaurants');
        }
    })
}); 


//delete a restaurant
app.delete('/delete-restaurant-ajax/', function(req,res,next){
    let data = req.body;
    let restaurantID = parseInt(data.id);
    let deleteRestaurantCuisines = `DELETE FROM Restaurant_has_Cuisines WHERE restaurantID = ?`;
    let deleteReviews= `DELETE FROM Reviews WHERE restaurantID = ?`;
    let deleteRestaurants= `DELETE FROM Restaurants WHERE restaurantID = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteRestaurants, [restaurantID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              res.sendStatus(204)
            })});
      


// update a restaurant




//-------------------------
// Restaurant Cuisines page
//------------------------- 
app.get('/restaurant_has_cuisines', function(req, res)
    {  
        let query2a = 'Select * FROM Restaurant_has_Cuisines';               // Define our query

        db.pool.query(query2a, function(error, rows, fields){    // Execute the query

            res.render('restaurant_has_cuisines', {data: rows}); // Render the restaurant_has_cuisines.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query




//-------------------------
//  Cuisines page
//------------------------- 
app.get('/cuisines', function(req, res)
    {  
        let query3a = 'Select * FROM Cuisines';                 // Define our query

        db.pool.query(query3a, function(error, rows, fields){    // Execute the query

            res.render('cuisines', {data: rows}); // Render the cuisines.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query



//-------------------------
// Price Levels page
//------------------------- 
app.get('/price_levels', function(req, res)
    {  
        let query4a = 'Select * FROM Price_Levels ORDER BY priceID';              // Define our query

        db.pool.query(query4a, function(error, rows, fields){    // Execute the query

            res.render('price_levels', {data: rows});           // Render the price_levels.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query



//-------------------------
// Reviews page
//------------------------- 




//-------------------------
// Reviewers page
//------------------------- 





//-------------------------
// Expenses page
//------------------------- 

/*  These are the now unused HTML Routes

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../html/index.html'));
    
});

app.get('/restaurants', function(req, res) {
    res.sendFile(path.join(__dirname, '../html/restaurants.html'));
    
});


app.get('/restaurant_has_cuisines', function(req, res) {
    res.sendFile(path.join(__dirname, '../html/restaurant_has_cuisines.html'));
    
});


app.get('/cuisines', function(req, res) {
    res.sendFile(path.join(__dirname, '../html/cuisines.html'));
    
});

app.get('/price_levels', function(req, res) {
    res.sendFile(path.join(__dirname, '../html/price_levels.html'));
    
});

app.get('/reviews', function(req, res) {
    res.sendFile(path.join(__dirname, '../html/reviews.html'));
    
});

app.get('/reviewers', function(req, res) {
    res.sendFile(path.join(__dirname, '../html/reviewers.html'));
    
});


app.get('/expenses', function(req, res) {
    res.sendFile(path.join(__dirname, '../html/expenses.html'));
    
});

*/

// CSS route
app.use('/public', express.static(path.join(__dirname, '/public')))





/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('http://flip3.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});