// Citation: CS340 github for node starter app. https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main  --}}


function updateRestaurantCuisines() {
    const restaurantCuisineIDSelect = document.getElementById("updateRestaurant_CuisineID");
    const restaurant_cuisineID = restaurantCuisineIDSelect.value;

    const restaurantIDSelect = document.getElementById("updateRestaurantIDInput");
    const restaurantID = restaurantIDSelect .value;

    const cuisineIDSelect = document.getElementById("updateCuisineIDInput");
    const cuisineID = cuisineIDSelect .value;

    // Put our data we want to send in a javascript object
    let data = {
        id: restaurant_cuisineID,
        cuisineIDInput: cuisineID,
        restaurantIDInput: restaurantID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-restaurant-cuisine-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}
