// citation: Node.js starter guide. https://github.com/osu-cs340-ecampus/nodejs-starter-app



/*
    SETUP
*/

// Express
var express = require('express');   // We are using the express library for the web server
var path = require('path');         // Requiring path to navigate directories
var app     = express();            // Need to instantiate an express object to interact with the server in our code
var helpers = require('handlebars-helpers')();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
//PORT        = 27491;                 // Port number (BRANDIE)
PORT        = 11717;                 // Port number (JOANA)


// Handlebars
const {engine} = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.



// Database
var db = require('./database/db-connector');
const { prependOnceListener } = require('process');


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
            let query1 = `SELECT Restaurants.restaurantID, Restaurants.name, Restaurants.streetAddress,
                        Restaurants.city, Restaurants.state, Restaurants.zipCode, Restaurants.phoneNumber, Restaurants.website, 
                        Price_Levels.priceRange as priceRange 
                        FROM Restaurants
                        INNER JOIN Price_Levels
                        ON Restaurants.priceID = Price_Levels.priceID;`;

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
      




//-------------------------
// Restaurant Cuisines page
//------------------------- 

// BROWSE 
app.get('/restaurant_has_cuisines', function(req, res)
    {  
        let query2a = `SELECT Restaurant_has_Cuisines.restaurant_cuisineID, 
                    Cuisines.cuisineDescription as cuisine, Restaurants.name as restaurant 
                    FROM Restaurant_has_Cuisines
                    INNER JOIN Cuisines 
                    ON Restaurant_has_Cuisines.cuisineID = Cuisines.cuisineID
                    INNER JOIN Restaurants
                    ON Restaurant_has_Cuisines.restaurantID = Restaurants.restaurantID
                    ORDER BY Restaurant_has_Cuisines.restaurant_cuisineID;`;               // Define our query
        let query2b = `SELECT * FROM Restaurants;`
        let query2c = `SELECT * FROM Cuisines;`

        db.pool.query(query2a, function(error, rows, fields){    // Execute the query

            let restaurantCuisines = rows;

            db.pool.query(query2b, (error, rows, fields) => {
                let restaurants = rows;

                db.pool.query(query2c, (error, rows, fields) => {
                    let cuisines = rows;
                    return res.render('restaurant_has_cuisines', {data: restaurantCuisines, restaurants: restaurants, cuisines: cuisines});
                })
            })                                                  // Render the restaurant_has_cuisines.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query




// ADD NEW
app.post('/add-restaurant-cuisine-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


        // Create the query and run it on the database
    query1 = `INSERT INTO Restaurant_has_Cuisines (cuisineID, restaurantID) 
                VALUES ('${data['cuisineIDInput']}', '${data['restaurantIDInput']}')`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our restaurants route, which automatically runs the SELECT * FROM Restaurants and
        // presents it on the screen
        else
        {
            res.redirect('/restaurant_has_cuisines');
        }
    })
    }); 


// DELETE
app.delete('/delete-restaurant-cuisine-ajax/', function(req,res,next){
    let data = req.body;
    let restaurant_cuisineID = parseInt(data.id);
    let deleteRestaurantCuisines = `DELETE FROM Restaurant_has_Cuisines WHERE restaurant_cuisineID = ?`;
 
  
          // Run the query
          db.pool.query(deleteRestaurantCuisines, [restaurant_cuisineID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else {
                res.sendStatus(204);
            }
              
            })});

//UPDATE
app.put('/update-restaurant-cuisine-ajax/', function(req,res,next){
    const data = req.body;
    const restaurant_cuisineID = parseInt(data.id);
    const cuisineIDInput = parseInt(data.cuisineIDInput);
    const restaurantIDInput = parseInt(data.restaurantIDInput);


    const updateRestaurantCuisines = `UPDATE Restaurant_has_Cuisines SET cuisineID = ${cuisineIDInput}, restaurantID = ${restaurantIDInput} WHERE restaurant_cuisineID = ${restaurant_cuisineID}`;
 
  
          // Run the query
          db.pool.query(updateRestaurantCuisines, function(error, rows, fields){
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
    
            // If there was no error, we redirect back to our restaurants route, which automatically runs the SELECT * FROM Restaurants and
            // presents it on the screen
            else
            {
                res.sendStatus(200);
            }
              
            })});

//-------------------------
//  Cuisines page
//------------------------- 

//  BROWSE
app.get('/cuisines', function(req, res)
    {  
        let query3a = 'Select * FROM Cuisines';                 // Define our query

        db.pool.query(query3a, function(error, rows, fields){    // Execute the query

            res.render('cuisines', {data: rows}); // Render the cuisines.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query


// ADD NEW
//Add a new cuisine
app.post('/add-cuisine-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
query1 = `INSERT INTO Cuisines (cuisineDescription) 
            VALUES ('${data['cuisineDescriptionInput']}')`;

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
        res.redirect('/cuisines');
    }
})
}); 


//-------------------------
// Price Levels page
//------------------------- 

//  BROWSE
app.get('/price_levels', function(req, res)
    {  
        let query4a = 'Select * FROM Price_Levels ORDER BY priceID';              // Define our query

        db.pool.query(query4a, function(error, rows, fields){    // Execute the query

            res.render('price_levels', {data: rows});           // Render the price_levels.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query


    // ADD NEW
//Add a new price level
app.post('/add-price-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
query1 = `INSERT INTO Price_Levels (priceRange) 
            VALUES ('${data['priceRangeInput']}')`;

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
        res.redirect('/price_levels');
    }
})
}); 



//-------------------------
// Reviews page
//------------------------- 

//  BROWSE
app.get('/reviews', function(req, res)
{  
    // Declare Query 1
    let query1 = `SELECT  Reviews.reviewID, Reviews.reviewDate, Reviews.reviewTitle, Reviews.reviewDescription, Reviews.reviewerRating, 
                            Reviews.takesReservation, Reviews.delivery, CONCAT(Reviewers.lastName, '-', Reviewers.reviewerID) as reviewerNameID, Restaurants.name as restaurantName
                FROM Reviews
                LEFT JOIN Reviewers ON Reviews.reviewerID = Reviewers.reviewerID
                LEFT JOIN Restaurants ON Reviews.restaurantID = Restaurants.restaurantID;`;

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Restaurants;";

    // Query 3
    let query3 = `SELECT * FROM Reviewers;`

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the reviews
        let reviews = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the restaurants
            let restaurants = rows;

            db.pool.query(query3, (error, rows, fields) => {

                //Save the reviewers
                let reviewers = rows;
                return res.render('reviews', {data: reviews, reviewers: reviewers, restaurants: restaurants});
            })})})});  


// DELETE
app.delete('/delete-review-ajax/', function(req,res,next){
    let data = req.body;
    let reviewID = parseInt(data.id);
    let deleteReviews= `DELETE FROM Reviews WHERE reviewID = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteReviews, [reviewID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              res.sendStatus(204)
            })});


//ADD NEW REVIEW
app.post('/add-review-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
query1 = `INSERT INTO Reviews (reviewDate, reviewTitle, reviewDescription, reviewerRating, takesReservation, delivery, reviewerID, restaurantID)
            VALUES ('${data['reviewDateInput']}', '${data['reviewTitleInput']}', '${data['reviewDescriptionInput']}', '${data['reviewerRatingInput']}', 
            '${data['takesReservationInput']}', '${data['deliveryInput']}', '${data['reviewerIDInput']}', '${data['restaurantIDInput']}');
`;

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
        res.redirect('/reviews');
    }
})
}); 



// UPDATE REVIEW
app.put("/put-review-ajax", function(req, res, next) {
    let data = req.body;
  
    let reviewerID = data.reviewerID !== "NULL" ? parseInt(data.reviewerID) : null;
    let rating = parseInt(data.reviewerRating);
    let reservation = data.takesReservation === "NULL" ? null : data.takesReservation;
    let delivery = data.delivery === "NULL" ? null : data.delivery;
    let reviewID = parseInt(data.reviewID);
  
    let queryUpdateReview = `UPDATE Reviews SET reviewerRating = ?, takesReservation = ?, delivery = ?, reviewerID = ? WHERE reviewID = ?`;
  
    // Run the query to update the review
    db.pool.query(queryUpdateReview, [rating, reservation, delivery, reviewerID, reviewID], function(error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    });
  });
  




//-------------------------
// Reviewers page
//------------------------- 

//  BROWSE
app.get('/reviewers', function(req, res)
    {  
        let query1 = 'Select * FROM Reviewers';              // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('reviewers', {data: rows});           // Render the price_levels.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query


// ADD NEW
//Add a new reviewer
app.post('/add-reviewer-form', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Reviewers (firstName, lastName, phoneNumber, streetAddress, city, state, zipCode, emailAddress)
        VALUES ('${data['firstNameInput']}', '${data['lastNameInput']}', '${data['phoneNumberInput']}', '${data['streetAddressInput']}', '${data['cityInput']}', '${data['stateInput']}', '${data['zipCodeInput']}', '${data['emailAddressInput']}')`;

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
            res.redirect('/reviewers');
        }
    })
});


// DELETE
app.delete('/delete-reviewer-ajax/', function(req,res,next){
    let data = req.body;
    let reviewerID = parseInt(data.id);
    let deleteReviewers= `DELETE FROM Reviewers WHERE reviewerID = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteReviewers, [reviewerID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              res.sendStatus(204)
            })});



//-------------------------
// Expenses page
//------------------------- 

//  BROWSE
app.get('/expenses', function(req, res)
    {  
        let query1 = 'Select * FROM Expenses';              // Define our query
        let query2 = "SELECT * FROM Reviewers;";
        let query3 = "SELECT * FROM Reviews;";

        /// Run the 1st query
        db.pool.query(query1, function(error, rows, fields){
                
            // Save the expenses
            let expenses = rows;
            
            // Run the second query
            db.pool.query(query2, (error, rows, fields) => {
                
                // Save the reviewers
                let reviewers = rows;

                // Run the third query
                db.pool.query(query3, (error, rows, fields) => {
                
                    // Save the reviews
                    let reviews = rows;
                    return res.render('expenses', {data: expenses, reviews: reviews, reviewers: reviewers});
                })
            })
        })                                              

    
    });  
    // received back from the query



//Add a new expense
app.post('/add-expense-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Expenses (date, totalExpense, description, expenseStatus, reviewerID, reviewID) 
            VALUES ('${data['dateInput']}', '${data['totalExpenseInput']}', '${data['descriptionInput']}',   
            '${data['expenseStatusInput']}', '${data['reviewerIDInput']}', '${data['reviewIDInput']}')`;

    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our expense route, which automatically runs the SELECT * FROM Expenses and
        // presents it on the screen
        else
        {
            res.redirect('/expenses');
        }
})
}); 


// DELETE
app.delete('/delete-expense-ajax/', function(req,res,next){
    let data = req.body;
    let expenseID = parseInt(data.id);
    let deleteExpenses= `DELETE FROM Expenses WHERE expenseID = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteExpenses, [expenseID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              res.sendStatus(204)
            })});

// CSS route
app.use('/public', express.static(path.join(__dirname, '/public')))





/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('http://flip3.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});