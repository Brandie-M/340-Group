


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
    reviewDescription   VARCHAR(254)    NOT NULL,
    expenseStatus       VARCHAR(20)     NOT NULL,
    reviewerID		    INT 	        NOT NULL,
    reviewID	        INT 	        NOT NULL,
    PRIMARY KEY		(expenseID),
    FOREIGN KEY     (reviewerID)        REFERENCES Reviewers (reviewerID),
    FOREIGN KEY     (reviewID)          REFERENCES Reviews (reviewID)
);





SET FOREIGN_KEY_CHECKS=1;
COMMIT;
