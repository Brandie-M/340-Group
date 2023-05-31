// Citation: CS340 github for node starter app. https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main  --}}


function updateRestaurantCuisines(event) {
    event.preventDefault();
    const restaurantCuisineIDSelect = document.getElementById("updateRestaurant_CuisineID");
    const restaurantCuisineID = restaurantCuisineIDSelect.value;

    // Getting selected restaurant ID and name 
    const restaurantIDSelect = document.getElementById("updateRestaurantIDInput");
    const restaurantID = restaurantIDSelect.value;
    const restaurantName = restaurantIDSelect.options[restaurantIDSelect.selectedIndex].text;

    // Getting selected cuisine ID and description
    const cuisineIDSelect = document.getElementById("updateCuisineIDInput");
    const cuisineID = cuisineIDSelect.value;
    const cuisineDescription = cuisineIDSelect.options[cuisineIDSelect.selectedIndex].text;

    // Put our data we want to send in a javascript object
    let data = {
        id: restaurantCuisineID,
        cuisineIDInput: cuisineID,
        restaurantIDInput: restaurantID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-restaurant-cuisine-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");


    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(restaurantCuisineID, restaurantName, cuisineDescription);

            // Display the success message
            var successMessage = document.getElementById("successMessage");
            successMessage.style.display = "block";
            
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

}

function updateRow(restaurantCuisineID, restaurantName, cuisineDescription){
    
    let table = document.getElementById("restaurant-cusines-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == restaurantCuisineID) {

            // Get the location of the row where we found the matching restaurant cuisine ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of values that we are updating, skipped [0] since restaurant cuisine ID is autoincremented
            let tdCuisine = updateRowIndex.getElementsByTagName("td")[1];
            let tdRestaurant = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign values to updated values
            tdCuisine.innerHTML = cuisineDescription; 
            tdRestaurant.innerHTML = restaurantName; 
       }
    }
}
