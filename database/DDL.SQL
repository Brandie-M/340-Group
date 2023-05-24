 


SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


/* create Price_Levels entity */
DROP TABLE IF EXISTS Price_Levels;
CREATE TABLE Price_Levels(
	priceID	        INT 		    NOT NULL AUTO_INCREMENT UNIQUE,
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
    priceID         INT             NOT NULL,             
    PRIMARY KEY		(restaurantID),
    FOREIGN KEY     (priceID)       REFERENCES Price_Levels (priceID) ON DELETE CASCADE
);

/* create Cuisines entity */
DROP TABLE IF EXISTS Cuisines;
CREATE TABLE Cuisines(
	cuisineID	        INT 			NOT NULL AUTO_INCREMENT UNIQUE,
    cuisineDescription	VARCHAR(50) 	NOT NULL,           
    PRIMARY KEY		(cuisineID)
);

/* create Restaurant_has_Cuisines entity */
DROP TABLE IF EXISTS Restaurant_has_Cuisines;
CREATE TABLE Restaurant_has_Cuisines(
	restaurant_cuisineID	INT 			NOT NULL AUTO_INCREMENT UNIQUE,
    cuisineID		        INT 	        NOT NULL,
    restaurantID	        INT 	        NOT NULL,           
    PRIMARY KEY		(restaurant_cuisineID),
    FOREIGN KEY     (cuisineID)         REFERENCES Cuisines (cuisineID) ON DELETE CASCADE,
    FOREIGN KEY     (restaurantID)      REFERENCES Restaurants (restaurantID) ON DELETE CASCADE
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
    reviewerID		    INT 	        ,
    restaurantID	    INT 	        ,
    PRIMARY KEY		(reviewID)          ,
    FOREIGN KEY     (reviewerID)        REFERENCES Reviewers (reviewerID) ON DELETE SET NULL,
    FOREIGN KEY     (restaurantID)      REFERENCES Restaurants (restaurantID) ON DELETE SET NULL
);

/* create Expenses entity */
DROP TABLE IF EXISTS Expenses;
CREATE TABLE Expenses(
	expenseID	        INT 			NOT NULL AUTO_INCREMENT UNIQUE,
    date                DATE            NOT NULL,
    totalExpense        DECIMAL(5,2)    NOT NULL,
    description         VARCHAR(254)    NOT NULL,
    expenseStatus       VARCHAR(20)     NOT NULL,
    reviewerID		    INT 	        NOT NULL,
    reviewID	        INT 	        NOT NULL,
    PRIMARY KEY		(expenseID)         ,
    FOREIGN KEY     (reviewerID)        REFERENCES Reviewers (reviewerID) ON DELETE CASCADE,
    FOREIGN KEY     (reviewID)          REFERENCES Reviews (reviewID) ON DELETE CASCADE
);


/* 
Insert Data 
*/


/* Restaurants sample data */
INSERT INTO Restaurants (restaurantID, name, streetAddress, city, state, zipCode, phoneNumber, website, priceID)
VALUES
(1, 'Duke\'s Waikiki', '2335 Kalakaua Ave', 'Honolulu', 'HI', '96815', '(808) 922-2268', 'https://www.dukeswaikiki.com/', 3),
(2, 'Iron Grill Hawaii Food Truck', NULL, 'Honolulu', 'HI', '96815', '(808) 202-7939', NULL, 2),
(3, 'Sushi Den', '1487 S Pearl St', 'Denver', 'CO', '80210', '(303) 777-0826', 'https://www.sushiden.net/', 3),
(4, 'Mercantile Dining & Provisions', '1701 Wynkoop St', 'Denver', 'CO', '80202', '(720) 460-3733', 'https://www.mercantiledenver.com/', 4),
(5, 'Flagstaff House', '1138 Flagstaff Rd', 'Boulder', 'CO', '80302', '(303) 442-4640', 'https://www.flagstaffhouse.com/', 4);



/* Cuisines sample data */
INSERT INTO Cuisines (cuisineID, cuisineDescription)
VALUES
(1, 'Seafood'),
(2, 'Steak'),
(3, 'Japanese'),
(4, 'Hawaiian'),
(5, 'American');

/* Restaurant_has_Cuisines sample data */
INSERT INTO Restaurant_has_Cuisines (restaurant_cuisineID, cuisineID, restaurantID)
VALUES
(1, 1, 1),
(2, 4, 1),
(3, 2, 2),
(4, 5, 4),
(5, 5, 5);


/* Price_Levels sample data */
INSERT INTO Price_Levels (priceID, priceRange)
VALUES
(1, '$1-10'),
(2, '$10-30'),
(3, '$30-60'),
(4, '$60-100'),
(5, '$100+');



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
