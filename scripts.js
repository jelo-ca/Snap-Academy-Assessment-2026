/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

// Get the object array from global variable
// The data structure for each fighter is:
// {
//   url: "",
//   photo_url: "",
//   fighter_name: "",
//   nickname: "",
//   age: ,
//   country: "",
//   height: "",
//   weight: "",
//   association: "",
//   weight_class: "",
//   wins: ,
//   wins_ko: ,
//   wins_submission: ,
//   losses: ,
//   losses_ko: ,
//   losses_submission: ,
// }
let fighters_data = window.one_champion_fighters;

for (let i = 0; i < 5; i++) {
    let fighter = fighters_data[i];
    console.log(fighter.fighter_name);
}

// This function adds cards the page to display the data in the array
function showCards() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");

    for (let i = 0; i < fighters_data.length; i++) {
        let fighter = fighters_data[i];

        // This part of the code doesn't scale very well! After you add your
        // own data, you'll need to do something totally different here.
        // let imageURL = "";
        // if (i == 0) {
        //   imageURL = FRESH_PRINCE_URL;
        // } else if (i == 1) {
        //   imageURL = CURB_POSTER_URL;
        // } else if (i == 2) {
        //   imageURL = EAST_LOS_HIGH_POSTER_URL;
        // }

        // Image URL is handled in the editCardContent function
        const nextCard = templateCard.cloneNode(true); // Copy the template card
        editCardContent(nextCard, fighter); // Edit title and image
        cardContainer.appendChild(nextCard); // Add new card to the container
    }
}

function editCardContent(card, fighter_object) {
    card.style.display = "block";

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = fighter_object.fighter_name;

    const cardImage = card.querySelector("img");
    cardImage.src = fighter_object.photo_url;
    cardImage.alt = fighter_object.fighter_name + " Photo";

    const nickname = card.querySelector(".nickname");
    nickname.textContent += ": " + fighter_object.nickname;

    const age = card.querySelector(".age");
    age.textContent += ": " + fighter_object.age;

    const country = card.querySelector(".country");
    country.textContent += ": " + fighter_object.country;

    const height = card.querySelector(".height");
    height.textContent += ": " + fighter_object.height;

    const weight = card.querySelector(".weight");
    weight.textContent += ": " + fighter_object.weight;

    const association = card.querySelector(".association");
    association.textContent += ": " + fighter_object.association;

    const weight_class = card.querySelector(".weight-class");
    weight_class.textContent += ": " + fighter_object.weight_class;

    const wins = card.querySelector(".wins");
    wins.textContent += ": " + fighter_object.wins;

    const losses = card.querySelector(".losses");
    losses.textContent += ": " + fighter_object.losses;

    const fighterLink = card.querySelector(".fighter-link");
    fighterLink.href = fighter_object.url;
    fighterLink.textContent = "View Fighter";

    console.log("new card:", fighter_object.fighter_name, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

function quoteAlert() {
    console.log("Button Clicked!");
    alert(
        "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!",
    );
}

function removeLastCard() {
    titles.pop(); // Remove last item in titles array
    showCards(); // Call showCards again to refresh
}