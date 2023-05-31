// Citation: CS340 github for node starter app. https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main  --}}


// Get the objects we need to modify
let updateReviewForm = document.getElementById('update-review-form-ajax');

// Modify the objects we need
updateReviewForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let reviewIDInput = document.getElementById("reviewIDInput");
    let reviewerIDInput = document.getElementById("reviewerID-update");
    let reviewerRatingInput = document.getElementById("reviewerRating-update");
    let takesReservationInput = document.getElementById("takesReservation-update");
    let deliveryInput = document.getElementById("deliveryInput-update");


    // Get the values from the form fields
    let reviewIDValue = reviewIDInput.value;
    let reviewerIDValue = reviewerIDInput.value;
    let ratingValue = reviewerRatingInput.value;
    let reservationValue = takesReservationInput.value;
    let deliveryValue = deliveryInput.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    //if (isNaN(homeworldValue)) 
    //{
    //    return;
    //}


    // Put our data we want to send in a javascript object
    let data = {
        reviewID: reviewIDValue,
        reviewerID: reviewerIDValue,
        reviewerRating: ratingValue,
        takesReservation: reservationValue,
        delivery: deliveryValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-review-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, reviewIDValue, reviewerIDValue, ratingValue, reservationValue, deliveryValue);
            window.location.reload();
            
            //if (window.confirm("Changes have been saved. Do you want to reload the page?")) {
            //    window.location.reload();
            //    window.scrollTo(0, 0);
            //}
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(reviewIDValue, reviewerIDValue, ratingValue, reservationValue, deliveryValue){
    //let parsedData = JSON.parse(data);
    
    let table = document.getElementById("review-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == reviewIDValue) {

            // Get the location of the row where we found the matching review ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            //Get td of field values
            let tdRating = updateRowIndex.getElementsByTagName("td")[4];
            let tdReservation = updateRowIndex.getElementsByTagName("td")[5];
            let tdDelivery = updateRowIndex.getElementsByTagName("td")[6]
            let tdReviewer = updateRowIndex.getElementsByTagName("td")[7];

            // Reassign fields to our value we updated to
            tdRating.innerHTML = ratingValue; 
            tdReservation.innerHTML = reservationValue; 
            tdDelivery.innerHTML = deliveryValue;
            tdReviewer.innerHTML = reviewerIDValue; 
            
       }
    }
}