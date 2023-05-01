


SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


/* create Price_Levels entity */
DROP TABLE IF EXISTS Price_Levels;
CREATE TABLE Price_Levels(
	priceID	        VARCHAR(5) 		NOT NULL UNIQUE,
    priceRange	    VARCHAR(20) 	NOT NULL UNIQUE,           
    PRIMARY KEY		(priceID)
);

/* create Restaurants entity */
DROP TABLE IF EXISTS Restaurants;
CREATE TABLE Restaurants(
	restaurantID	INT 			NOT NULL AUTO_INCREMENT UNIQUE,
    name		    VARCHAR(50) 	NOT NULL,
    streetAddress	VARCHAR(50)	    ,
    city    		VARCHAR(25)		NOT NULL,
    state	        VARCHAR(15)	    NOT NULL,
    zipCode     	VARCHAR(9)	    ,
    phoneNumber	    VARCHAR(15)	    ,
    website		    VARCHAR(254)	,
    priceID         VARCHAR(5)      NOT NULL,             
    PRIMARY KEY		(restaurantID),
    FOREIGN KEY     (priceID)     REFERENCES Price_Levels (priceID)
);

/* create Cuisines entity */
DROP TABLE IF EXISTS Cuisines;
CREATE TABLE Cuisines(
	cuisineID	        INT 			NOT NULL AUTO_INCREMENT UNIQUE,
    cuisineDescription	VARCHAR(50) 	NOT NULL,           
    PRIMARY KEY		(cuisineID)
);

/* create Restaurants_has_Cuisines entity */
DROP TABLE IF EXISTS Restaurants_has_Cuisines;
CREATE TABLE Restaurants_has_Cuisines(
	restaurant_cuisineID	INT 			NOT NULL AUTO_INCREMENT UNIQUE,
    cuisineID		        INT 	        NOT NULL,
    restaurantID	        INT 	        NOT NULL,
            
    PRIMARY KEY		(restaurant_cuisineID),
    FOREIGN KEY     (cuisineID)         REFERENCES Cuisines (cuisineID),
    FOREIGN KEY     (restaurantID)      REFERENCES Restaurants (restaurantID)
);


/* create Reviewers entity */
DROP TABLE IF EXISTS Reviewers;
CREATE TABLE Reviewers(
	reviewerID  	INT 			NOT NULL AUTO_INCREMENT UNIQUE,
    firstName		VARCHAR(35) 	NOT NULL,
    lastName        VARCHAR(35) 	NOT NULL,
    phoneNumber	    VARCHAR(15)	    ,
    streetAddress	VARCHAR(50)	    ,
    city    		VARCHAR(25)		NOT NULL,
    state	        VARCHAR(15)	    NOT NULL,
    zipCode     	VARCHAR(9)	    ,
    emailAddress	VARCHAR(254)	,
    totalReviews    VARCHAR(5)      NOT NULL,             
    PRIMARY KEY		(reviewerID)
);

/* create Reviews entity */
DROP TABLE IF EXISTS Reviews;
CREATE TABLE Reviews(
	reviewID	        INT 			NOT NULL AUTO_INCREMENT UNIQUE,
    reviewDate          DATE            NOT NULL,
    reviewTitle         VARCHAR(254)    NOT NULL,
    reviewDescription   VARCHAR(10000)  ,
    reviewerRating      INT(5)          NOT NULL,
    takesReservation    VARCHAR(10)     ,
    delivery            VARCHAR(10)     ,
    reviewerID		    INT 	        NOT NULL,
    restaurantID	    INT 	        NOT NULL,
    PRIMARY KEY		(reviewID),
    FOREIGN KEY     (reviewerID)        REFERENCES Reviewers (reviewerID),
    FOREIGN KEY     (restaurantID)      REFERENCES Restaurants (restaurantID)
);

/* create Expenses entity */
DROP TABLE IF EXISTS Expenses;
CREATE TABLE Expenses(
	expenseID	        INT 			NOT NULL AUTO_INCREMENT UNIQUE,
    date                DATE            NOT NULL,
    totalExpense        DECIMAL(5,2)    NOT NULL,
    description	   	VARCHAR(254)    NOT NULL,
    expenseStatus       VARCHAR(20)     NOT NULL,
    reviewerID		INT 	NOT NULL,
    reviewID	        INT 	        NOT NULL,
    PRIMARY KEY		(expenseID),
    FOREIGN KEY     (reviewerID)        REFERENCES Reviewers (reviewerID),
    FOREIGN KEY     (reviewID)          REFERENCES Reviews (reviewID)
);

/* 
Insert Data 
*/


/* Restaurants sample data */



/* Cuisines sample data */



/* Restaurant_has_Cuisines sample data */


/* Price_Levels sample data */



/* Reviewers sample data */
INSERT INTO `Reviewers` (firstName, lastName, streetAddress, city, state, zipCode, phoneNumber, emailAddress)
VALUES 
('John', 'Smith', '123 Main St', 'Denver', 'Colorado', '80204', '(303) 555-1234', 'john.smith@email.com'),
('Karen', 'Wong', '456 Oak St', 'Honolulu', 'Hawaii', '96815', '(808) 555-5678', 'karen.wong@email.com'),
('Michael', 'Johnson', '789 Pine St', 'San Francisco', 'California', '94109', '(415) 555-9012', 'michael.johnson@email.com'),
('Rachel', 'Hernandez', '101 Elm St', 'Austin', 'Texas', '78701', '(512) 555-3456', 'rachel.hernandez@email.com');


/* Reviews sample data */
INSERT INTO Reviews (reviewDate, reviewTitle, reviewDescription, reviewerRating, takesReservation, delivery, reviewerID, restaurantID)
VALUES
(
    '2022-04-15', 
    'Great food and service', 
    "If you're looking for a restaurant that combines stunning ocean views, great food, and excellent service, 
    look no further than Duke's Waikiki in Honolulu, Hawaii. I recently had the pleasure of dining at Duke's 
    Waikiki and I must say, I was thoroughly impressed with the entire experience.", 
    4.5, 
    'Yes', 
    'No', 
    2, 
    1
    ),

(
    '2022-05-02', 
    'Disappointing meal', 
    "My recent experience at Mercantile Dining & Provisions in Denver was disappointing. 
    The food was average at best and lacked any real flavor or creativity. The service was slow 
    and inattentive. Overall, I would not recommend this restaurant.", 
    2, 
    'Yes', 
    'Yes', 
    1, 
    4
    ),

(
    '2022-05-10', 
    'Fantastic experience', 
    "Iron Grill Hawaii food truck is a hidden gem in Honolulu. 
    The food is exceptional, and the service is top-notch. 
    From the moment we placed our order, we felt welcomed and well taken care of. 
    I highly recommend this food truck to anyone looking for a delicious and 
    memorable dining experience in Hawaii.", 
    5, 
    'Yes', 
    'No', 
    2, 
    2
    );


/* Expenses sample data */

INSERT INTO Expenses (expenseID, date, totalExpense, description, expenseStatus, reviewerID, reviewID) 
VALUES
(1, '2022-04-12', 75.00, "Dinner at Duke's Waikiki", 'Approved', 2, 1),
(2, '2022-05-03', 25.00, "Parking at Mercantile Dining & Provisions", 'Pending', 1, 2),
(3, '2022-06-01', 100.00, "Mileage to Iron Grill Hawaii food truck", 'Approved', 2, 3),
(4, '2022-06-15', 85.00, "Lunch at Iron Grill Hawaii food truck", 'Rejected', 2, 3);





SET FOREIGN_KEY_CHECKS=1;
COMMIT;
