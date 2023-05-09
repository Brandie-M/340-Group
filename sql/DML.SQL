-----------------------------
-- Dropdowns --
---- queries for populating dropdowns for the foreign keys in forms
-----------------------------

-- Price_Levels 
SELECT priceID, priceRange FROM Price_Levels;

-- Cuisines 
SELECT cuisineID, name FROM Cuisines;

-- Restaurants 
SELECT restaurantID, name FROM Restaurants;

-- Reviewers
SELECT reviewerID, lastName FROM Reviewers;

-- Reviews
SELECT reviewID FROM Reviews;




-----------------------------
-------- ENTITIES -----------
-----------------------------

-----------------------------
-- Restaurants --
-----------------------------
-- Browse All
------Shows all attributes in table and displays the name of the price level from  Price_Levels
SELECT Restaurants.restaurantID, Restaurants.name, Restaurants.streetAddress, Restaurants.city, 
Restaurants.state, Restaurants.zipCode, Restaurants.phoneNumber, Restaurants.website, Price_Levels.priceRange as Price_Levels
FROM Restaurants
JOIN Price_Levels ON Restaurants.priceID = Price_Levels.priceID;


-- Insert New
INSERT INTO Restaurants (name, streetAddress, city, state, zipCode, phoneNumber, website, priceID) 
VALUES (:nameInput, :streetAddressInput, :cityInput, :stateInput, :zipCodeInput, 
        :phoneNumberInput, :websiteInput, :priceID_from_dropdown_Input);


-- Update



-- Delete One
DELETE FROM Restaurants WHERE restaurantID= :restaurantID_selected_from_browse;

-----------------------------
-- Cuisines --
-----------------------------
-- Browse All
SELECT * from Cuisines;


-- Insert New
INSERT INTO Cuisines (cuisineDescription)
VALUES (:cuisineDescriptionInput);

-----------------------------
-- Restaurant_has_Cuisines --
-----------------------------
-- Browse All
SELECT Restaurant_has_Cuisines.restaurant_cuisineID, Cuisines.cuisineDescription as Cuisine_Name, Restaurants.name as Restaurant_Name
FROM Restaurant_has_Cuisines
JOIN Cuisines ON Restaurant_has_Cuisines.cuisineID = Cuisines.cuisineID
JOIN Restaurants ON Restaurant_has_Cuisines.restaurantID = Restaurants.restaurantID;


-- Insert New
INSERT into Restaurant_has_Cuisines (restaurant_cuisineID, cuisineID, restaurantID)
VALUES (:cuisineIDinput, :restaurantIDinput);


-- Update Existing
UPDATE Restaurant_has_Cuisines SET cuisineID = :cuisineIDInput, restaurantID = :restaurantIDInput WHERE restaurant_cuisineID = :restaurant_cuisineID;

-- Delete One 
DELETE FROM Restaurant_has_Cuisines WHERE restaurant_cuisineID = :restaurant_cuisineIDInput;


-----------------------------
-- Price Levels --
-----------------------------
-- Browse All
SELECT * FROM Price_Levels;


-- Insert New
INSERT INTO Price_Levels (priceID, priceRange)
VALUES (:priceID_Input, :priceRange_Input);



-----------------------------
-- Reviewers --
-----------------------------
-- Browse All
SELECT * from Reviewers;


-- Insert New
INSERT INTO Reviewers (firstName, lastName, phoneNumber, streetAddress, city, state, zipCode, emailAddress)
VALUES (:firstNameInput, :lastNameInput, :phoneNumberInput, :streetAddressInput, :cityInput, :stateInput, :zipCodeInput, :emailAddressInput);


-----------------------------
-- Reviews --
-----------------------------
-- Browse All
SELECT Reviews.reviewID, Reviews.reviewDate, Reviews.reviewTitle, Reviews.reviewDescription, Reviews.reviewerRating, 
Reviews.takesReservation, Reviews.delivery, Reviewers.lastName as Reviewer_Last_Name, Restaurants.name as Restaurant_Name
FROM Reviews
JOIN Reviewers ON Reviews.reviewerID = Reviewers.reviewerID
JOIN Restaurants ON Reviews.restaurantID = Restaurants.restaurantID
ORDER BY Reviews.reviewDate desc;

-- Insert New
INSERT INTO Reviews (reviewDate, reviewTitle, reviewDescription, reviewerRating, takesReservation, delivery, reviewerID, restaurantID)
VALUES (:reviewDateInput, :reviewTitleInput, :reviewDescriptionInput, :reviewerRatingInput, :takesReservationInput, :deliveryInput, :reviewerIDInput, :restaurantIDInput);

-- Update Existing
UPDATE Reviews SET reviewDate = :reviewDateInput, reviewTitle = :reviewTitleInput, reviewDescription = :reviewDescriptionInput, reviewerRating = :reviewerRatingInput, takesReservation = :takesReservationInput, delivery = :deliveryInput WHERE reviewID = :reviewIDInput;


-----------------------------
-- Expenses --
-----------------------------
-- Browse All
------ Note, chose to leave the reviewID as the ID number instead of adding the review name. 
-------Similar to referencing an invoice id rather than the items in an order.
SELECT Expenses.expenseID, Expenses.date, Expenses.totalExpense, Expenses.description, 
Expenses.expenseStatus, Reviewers.lastName as Reviewer_Last_Name, Expenses.reviewID
FROM Expenses
JOIN Reviewers ON Expenses.reviewerID = Reviewers.reviewerID;


-- Insert New