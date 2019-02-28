// Initial array for animals
var animals = ["Dog", "Cat", "Tiger", "Lion", "Crocodine"];

//====== Function to render animal buttons ==============

function renderButtons() {
    // Empty the buttons prior to adding new animals to avoid dublicating previous buttons
    $("#buttons").empty();

    // Empty the text box of previous added animals
    $("#animal-input").val("");

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {

        // Then grenerating buttons for each animal in the array
        var animalBtn = $("<button>");

        // Adding a class of animal to the button
        animalBtn.addClass("animal-btn");

        // Adding a data-attribute to animalBtn for each animal in the array
        animalBtn.attr("data-animal", animals[i]);

        // Providing text to each animalBtn equal to its name
        animalBtn.text(animals[i]);

        // Adding the button to the buttons div
        $("#buttons").append(animalBtn);

        console.log(animals)
    }
}

//==== Function to display an animal images selected and clicked anmimal-btn by user ==================

function showImages() {
    // first, clear the previous images that have been displayed
    $("#gifs-appear-here").empty();

    // Retriving and storing the data-animal value from the button
    var animal = $(this).attr("data-animal");

    // Create a queryURL using animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=EjMrOW15Zk2EEPxvg7jFKwmNbPFOr1QU&limit=10";

    // Performing a AJAX request
    $.ajax({
        url: queryURL,
        method: "GET"
        // After data come back from the request:
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);
        // Storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // creating and storing a div tag
            var animalDiv = $("<div>");

            // creating varaiable to hold rating of specific gif
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // creating and storing an image tag
            var animalImage = $("<img>");

            // Setting the src attribute of the image to property of the result item
            animalImage.attr("src", results[i].images.fixed_height_still.url);

            //==== add more code about image state here====

            // setting "still" state for animalImage 
            animalImage.attr("data-state", "still");
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);

            // add a class to animalImage
            animalImage.addClass("gif");

            // Prepending the paragraph and image tag to the animalDiv 
            // Using append or prepend still work - need to ask instructor/TAs why
            animalDiv.append(p);
            animalDiv.append(animalImage);

            // Prepending the animalDiv to the HTML page in the "#gifts-appear-here" div

            $("#gifs-appear-here").prepend(animalDiv);

        }

        // Adding click event to .gif to play the gif
        $(".gif").on("click", function () {

            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });
}


//===== Function to add a animal =================

$("#add-animal").on("click", function (event) {

    //event.preventDefault() prevents the form from trying to submit itself
    //form used so that the user can hit enter instead of clicking the button if they want

    event.preventDefault();

    // This line grabs the input from the text box
    var newAnimal = $("#animal-input").val().trim();

    // Adding the animal from the text box to the animals array
    animals.push(newAnimal);
    console.log(animals);

    // Calling renderButtons to handle the processing of animals array
    renderButtons();
});

renderButtons();

// click event on the animal-btn to listen for which animal user pics
$(document).on("click", ".animal-btn", showImages);
console.log(showImages);