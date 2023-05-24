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

-- Browse All --

------Shows all attributes in table,  displays the name of the price level from Price_Levels, provides names for dropdowns
--2 queries required:
--query1
SELECT  Restaurants.restaurantID, Restaurants.name, Restaurants.streetAddress, 
        Restaurants.city, Restaurants.state, Restaurants.zipCode, Restaurants.phoneNumber, Restaurants.website, 
        Price_Levels.priceRange as priceRange 
FROM Restaurants
INNER JOIN Price_Levels ON Restaurants.priceID = Price_Levels.priceID;

--query2
SELECT * FROM Price_Levels;



-- Insert New
INSERT INTO Restaurants (name, streetAddress, city, state, zipCode, phoneNumber, website, priceID) 
VALUES (:nameInput, :streetAddressInput, :cityInput, :stateInput, :zipCodeInput, 
        :phoneNumberInput, :websiteInput, :priceID_from_dropdown_Input);


-- Update
UPDATE Restaurants 
SET name = :nameInput, streetAddress = :streetAddressInput, city = :cityInput, state = :stateInput, zipCode = :zipCodeInput, 
        phoneNumber = :phoneNumberInput, website = :websiteInput 
WHERE restaurantID = :restaurantIDInput;


-- Delete One
DELETE FROM Restaurants WHERE restaurantID= :restaurantID_selected_from_browse;


-----------------------------
-- Cuisines --
-----------------------------
-- Browse All
SELECT * FROM Cuisines;


-- Insert New
INSERT INTO Cuisines (cuisineDescription)
VALUES (:cuisineDescriptionInput);

-----------------------------
-- Restaurant_has_Cuisines --
-----------------------------

-- Browse All --

------Shows all attributes in table,  displays the name of the price level from Price_Levels, provides names for dropdowns
--3 queries required to 
--query1
SELECT Restaurant_has_Cuisines.restaurant_cuisineID, Cuisines.cuisineDescription as cuisine, Restaurants.name as restaurant 
FROM Restaurant_has_Cuisines
INNER JOIN Cuisines ON Restaurant_has_Cuisines.cuisineID = Cuisines.cuisineID
INNER JOIN Restaurants ON Restaurant_has_Cuisines.restaurantID = Restaurants.restaurantID
ORDER BY Restaurant_has_Cuisines.restaurant_cuisineID;

--query2
SELECT * FROM Restaurants;

--query3
SELECT * FROM Cuisines;


-- Insert New
INSERT into Restaurant_has_Cuisines (cuisineID, restaurantID)
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
SELECT * FROM Reviewers;


-- Insert New
INSERT INTO Reviewers (firstName, lastName, phoneNumber, streetAddress, city, state, zipCode, emailAddress)
VALUES (:firstNameInput, :lastNameInput, :phoneNumberInput, :streetAddressInput, :cityInput, :stateInput, :zipCodeInput, :emailAddressInput);


-----------------------------
-- Reviews --
-----------------------------
-- Browse All
SELECT  Reviews.reviewID, Reviews.reviewDate, Reviews.reviewTitle, Reviews.reviewDescription, Reviews.reviewerRating as, 
        Reviews.takesReservation, Reviews.delivery, CONCAT(Reviewers.lastName, '-', Reviewers.reviewerID) as reviewerNameID, Restaurants.name
FROM Reviews
JOIN Reviewers ON Reviews.reviewerID = Reviewers.reviewerID
JOIN Restaurants ON Reviews.restaurantID = Restaurants.restaurantID
ORDER BY Reviews.reviewDate desc;

-- Insert New
INSERT INTO Reviews (reviewDate, reviewTitle, reviewDescription, reviewerRating, takesReservation, delivery, reviewerID, restaurantID)
VALUES (:reviewDateInput, :reviewTitleInput, :reviewDescriptionInput, :reviewerRatingInput, :takesReservationInput, :deliveryInput, :reviewerID_from_dropdown_Input, :restaurantID_from_dropdown_Input);

-- Update Existing
------ Note, we do not want the user to be able to update the reviewer or restaurant once a review is submitted so those fields are not included in the update query. 
-------The only updates to those fields will happen if the reviewer or restaurant is deleted, field will update to NULL.
UPDATE Reviews SET reviewDate = :reviewDateInput, reviewTitle = :reviewTitleInput, reviewDescription = :reviewDescriptionInput, 
        reviewerRating = :reviewerRatingInput, takesReservation = :takesReservationInput, delivery = :deliveryInput
WHERE reviewID = :reviewIDInput;


-----------------------------
-- Expenses --
-----------------------------
-- Browse All
------ Note, chose to leave the reviewID as the ID number instead of adding the review name. 
-------Similar to referencing an invoice id rather than the items in an order.
SELECT Expenses.expenseID, Expenses.date, Expenses.totalExpense, Expenses.description, 
Expenses.expenseStatus, CONCAT(Reviewers.lastName, '-', Reviewers.reviewerID) as reviewerNameID, Expenses.reviewID
FROM Expenses
JOIN Reviewers ON Expenses.reviewerID = Reviewers.reviewerID;


-- Insert New
INSERT INTO Expenses (date, totalExpense, description, expenseStatus, reviewerID, reviewID)
VALUES (:dateInput, :totalExpenseInput, :descriptionInput, :expenseStatusInput, :reviewerID_from_dropdown_Input, :reviewID_from_dropdown_input);