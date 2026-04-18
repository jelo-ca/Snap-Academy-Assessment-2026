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
//   height: number (meters),
//   weight: number (kg),
//   association: "",
//   weight_class: "",
//   wins: ,
//   wins_ko: ,
//   wins_submission: ,
//   losses: ,
//   losses_ko: ,
//   losses_submission: ,
// }
const FIGHTERS_DATA = window.one_champion_fighters;

// Copies so we have source of truth for the data
let fighters_data = FIGHTERS_DATA;

// Metric units are initially enabled
let isMetric = true;

// Initially sortedFighters variable
// populates with sorted fighters by name in ascending order
let sortedFighters = [];
sortedFighters = sortCardsByNameAsc();

// This calls the addCards() function when the page is first loaded (From Starter Code)
document.addEventListener("DOMContentLoaded", () => refreshDisplay());

// Multiple weight class filters can be applied at once
let weight_class_filters = [];
// Record filter is a single value that can be "all", "winning", or "undefeated"
let record_filter = "all";

// =========== STARTING FUNCTIONS ===========

// This function adds cards the page to display the data in the array
function showCards(data = fighters_data) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");

    for (let i = 0; i < data.length; i++) {
        let fighter = data[i];

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
    const nicknameValue = fighter_object.nickname ?
        fighter_object.nickname :
        "\u00A0";
    nickname.innerHTML = `<span>${nicknameValue}</span>`;

    setCardField(card, ".age", fighter_object.age);
    setCardField(card, ".country", fighter_object.country);
    setCardField(card, ".height", formatHeight(fighter_object.height, isMetric));
    setCardField(card, ".weight", formatWeight(fighter_object.weight, isMetric));
    setCardField(card, ".association", fighter_object.association);
    setCardField(card, ".weight-class", fighter_object.weight_class);
    setCardField(card, ".wins", fighter_object.wins);
    setCardField(card, ".losses", fighter_object.losses);

    const fighterLink = card.querySelector(".fighter-link");
    fighterLink.href = fighter_object.url;
    fighterLink.textContent = "Fighter Page";

    // Debugging
    // console.log("new card:", fighter_object.fighter_name, "- html: ", card);
}

function quoteAlert() {
    console.log("Button Clicked!");
    alert(
        "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!",
    );
}

// For Roster Management
function removeLastCard() {
    titles.pop(); // Remove last item in titles array
    showCards(); // Call showCards again to refresh
}

// =========== SORTING FUNCTIONS ===========
function sortCardsByNameAsc() {
    return fighters_data.sort((a, b) =>
        a.fighter_name.localeCompare(b.fighter_name),
    );
}

function sortCardsByNameDesc() {
    return fighters_data.sort((a, b) =>
        b.fighter_name.localeCompare(a.fighter_name),
    );
}

function sortCardsByWinsAsc() {
    return fighters_data.sort((a, b) => a.wins - b.wins);
}

function sortCardsByWinsDesc() {
    return fighters_data.sort((a, b) => b.wins - a.wins);
}

function sortCardsByAgeAsc() {
    return fighters_data.sort((a, b) => a.age - b.age);
}

function sortCardsByAgeDesc() {
    return fighters_data.sort((a, b) => b.age - a.age);
}

// Switch statement due to the number of possible sorting options within
// the select element
function sortCards(sortBy) {
    switch (sortBy) {
        case "name-asc":
            sortCardsByNameAsc();
            break;
        case "name-desc":
            sortCardsByNameDesc();
            break;
        case "wins-asc":
            sortCardsByWinsAsc();
            break;
        case "wins-desc":
            sortCardsByWinsDesc();
            break;
        case "age-asc":
            sortCardsByAgeAsc();
            break;
        case "age-desc":
            sortCardsByAgeDesc();
            break;
    }
    refreshDisplay();
}

// =========== FILTERING FUNCTIONS ===========

function updateFilters(element) {
    if (element.name === "record-filter") {
        if (element.checked) record_filter = element.value;
    } else if (element.checked) {
        addFilter(element.name, element.value);
    } else {
        removeFilter(element.name, element.value);
    }
    refreshDisplay();
}

function addFilter(filter, value) {
    if (filter === "weight-class") {
        weight_class_filters.push(value);
    }
    // console.log("addFilter", filter, value);
    // console.log(weight_class_filters, record_filters);
}

function removeFilter(filter, value) {
    if (filter === "weight-class") {
        weight_class_filters = weight_class_filters.filter((f) => f !== value);
        // console.log("removeFilter", filter, value);
        // console.log(weight_class_filters, record_filter);
    }
}

function applyFilters() {
    // Uses sortedFighters rather than fighters_data to avoid sorting the data again
    let list = sortedFighters;
    if (weight_class_filters.length > 0) {
        list = list.filter((fighter) =>
            weight_class_filters.includes(fighter.weight_class.toLowerCase()),
        );
    }
    switch (record_filter) {
        case "all":
            break;
        case "winning":
            list = list.filter((f) => f.wins > f.losses);
            break;
        case "undefeated":
            list = list.filter((f) => f.losses === 0);
            break;
    }
    return list;
}

function refreshDisplay() {
    showCards(applyFilters());
}

// =========== HELPER FUNCTIONS ===========

function setCardField(card, selector, value) {
    const el = card.querySelector(selector);
    const label = selector
        .substring(1)
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    el.innerHTML = `<span class="stat-label">${label}</span><span class="stat-value">${value}</span>`;
}

function toggleMetricUnits() {
    isMetric = !isMetric;
    refreshDisplay();
}

function formatHeight(m, isMetric) {
    if (isMetric) {
        return `${m.toFixed(1)} m`;
    } else {
        let ft = Math.floor(m * 3.23);
        return `${Math.round(ft)}'${ft % 10} ft`;
    }
}

function formatWeight(kg, isMetric) {
    if (isMetric) {
        return `${kg.toFixed(1)} kg`;
    } else {
        return `${(kg * 2.2).toFixed(1)} lbs`;
    }
}