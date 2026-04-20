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
//   uid: number,
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

// =========== Initial Variables ===========

// Copies so we have source of truth for the data
let fighters_data = FIGHTERS_DATA;

// Metric units are initially enabled
let isMetric = true;

// Initially sortedFighters variable
// populates with sorted fighters by name in ascending order
let sortedFighters = [];
sortedFighters = sortCardsByNameAsc();

// This calls the ~~addCards()~~ refreshDisplay() function when the page is first loaded (From Starter Code)
document.addEventListener("DOMContentLoaded", () => {
    refreshDisplay();
});

// Multiple weight class filters can be applied at once
let weight_class_filters = [];
// Record filter is a single value that can be "all", "winning", or "undefeated"
let record_filter = "all";

let roster = new Set();
let ROSTER_MAX = 4;

first_load = true;

// =========== STARTING FUNCTIONS ===========

// This function adds cards the page to display the data in the array
function showCards(data = fighters_data) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");

    for (let i = 0; i < data.length; i++) {
        let fighter = data[i];
        const uid = fighter.uid;

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
        nextCard.dataset.fighterUid = String(uid);
        editCardContent(nextCard, fighter, uid); // uid indexes the dataset
        cardContainer.appendChild(nextCard); // Add new card to the container
    }
}

function editCardContent(card, fighter_object, uid = 0) {
    card.style.display = "block";

    const flipId = `card-flip-${uid}`;
    const flipInput = card.querySelector(".card-flip-input");

    // Roster Add Button
    // Switches each time a card is added to the roster
    const addBtn = card.querySelector(".btn-add");
    if (addBtn) {
        const inRoster = roster.has(uid);
        const rosterFull = roster.size >= ROSTER_MAX;
        addBtn.disabled = inRoster || (!inRoster && rosterFull);
        addBtn.classList.toggle("btn-add--added", inRoster);
        if (inRoster) {
            addBtn.textContent = "Added";
        } else if (rosterFull) {
            addBtn.textContent = "Full";
        } else {
            addBtn.textContent = "Add";
        }
    }

    // Copied from online resources
    if (flipInput) {
        flipInput.id = flipId;
        card
            .querySelectorAll(".card-flip-overlay, .flip-back-btn")
            .forEach((el) => el.setAttribute("for", flipId));
    }

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = fighter_object.fighter_name;

    const backName = card.querySelector(".back-fighter-name");
    if (backName) backName.textContent = fighter_object.fighter_name;

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

function sortCardsByWeightAsc() {
    return fighters_data.sort((a, b) => a.weight - b.weight);
}

function sortCardsByWeightDesc() {
    return fighters_data.sort((a, b) => b.weight - a.weight);
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
        case "weight-asc":
            sortCardsByWeightAsc();
            break;
        case "weight-desc":
            sortCardsByWeightDesc();
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

// Filters are applied each time since the user can apply multiple filters at once
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

//Uses uid to find the fighter in the fighters_data array
function getFighterByUid(uid) {
    return fighters_data.find((f) => f.uid === uid);
}

// =========== ROSTER FUNCTIONS ===========

function addToRoster(fighterUid) {
    if (roster.size >= ROSTER_MAX || roster.has(fighterUid)) {
        return;
    }
    roster.add(fighterUid);
    refreshRosterDisplay();
    refreshDisplay();

    // console.log("addToRoster", fighterUid);
    // console.log("roster", roster);
}

function removeFromRoster(fighterUid) {
    roster.delete(fighterUid);
    refreshRosterDisplay();
    refreshDisplay();

    // console.log("removeFromRoster", fighterUid);
    // console.log("roster", roster);
}

function clearRoster() {
    roster.clear();
    refreshRosterDisplay();
    refreshDisplay();

    // console.log("roster cleared");
    // console.log("roster", roster);
}

/** Syncs `#roster-slots` (four fixed slots) with `roster` Set insertion order. */
function refreshRosterDisplay() {
    const rosterSlots = document.getElementById("roster-slots");

    const slots = rosterSlots.querySelectorAll(".roster-slot");

    // Set to Array
    const order = [...roster];

    const count = document.getElementById("roster-count");
    if (count) {
        count.textContent = String(order.length);
    }

    const rosterFull = order.length === ROSTER_MAX;

    // Tournament buttons are disabled while roster is not full
    [
        "btn-footer-full-bracket",
        "btn-footer-shuffle",
        "btn-footer-next-match",
    ].forEach((btn) => {
        const b = document.getElementById(btn);
        if (b) {
            b.disabled = !rosterFull;
        }
    });

    slots.forEach((slot, i) => {
        slot.dataset.slotIndex = String(i);
        const uid = order[i];

        const fighter = getFighterByUid(uid);
        if (!fighter) {
            slot.className = "roster-slot roster-slot--empty";
            slot.removeAttribute("data-fighter-uid");
            slot.innerHTML =
                '<button type="button" class="roster-slot-remove"  onclick="removeFromRoster(Number(this.closest(\'.roster-slot\').dataset.fighterUid))">x</button>';
            return;
        }

        slot.className = "roster-slot roster-slot--filled";
        slot.dataset.fighterUid = String(uid);
        slot.innerHTML =
            '<button type="button" class="roster-slot-remove"  onclick="removeFromRoster(Number(this.closest(\'.roster-slot\').dataset.fighterUid))">x</button>' +
            '<div class="roster-slot-photo-wrap"><img class="roster-slot-photo" alt="" /></div>' +
            '<span class="roster-slot-name"></span>';
        const img = slot.querySelector(".roster-slot-photo");
        const name = slot.querySelector(".roster-slot-name");
        img.src = fighter.photo_url;
        img.alt = fighter.fighter_name;
        name.textContent = fighter.fighter_name;
    });
}

// =========== MINI TOURNAMENT ===========

class BracketNode {
    constructor(round) {
        this.id = null;
        this.round = round;
        this.fighter_a = null;
        this.fighter_b = null;
        this.winner = null;
        this.children = [];
    }

    setFighterA(fighter) {
        this.fighter_a = fighter;
    }

    setFighterB(fighter) {
        this.fighter_b = fighter;
    }

    setWinner() {
        this.winner = simulateFight(this.fighter_a, this.fighter_b);
        console.log("winner: ", this.winner.fighter_name);
    }

    getWinner() {
        return this.winner;
    }

    addChild(node) {
        this.children.push(node);
    }
}

let bracket_nodes = [];
let root_node = bracket_nodes[bracket_nodes.length - 1];
let layers = {};

document.querySelectorAll(".bracket-match").forEach((node) => {
    n = new BracketNode(node.dataset.round);
    n.id = bracket_nodes.length;
    bracket_nodes.push(n);
});

function createTournamentTree() {
    // console.log(bracket_nodes);

    // Split into layers
    for (let i = 0; i < bracket_nodes.length; i++) {
        const node = bracket_nodes[i];
        if (node.round in layers) {
            layers[node.round].push(node);
        } else {
            layers[node.round] = [node];
        }
    }

    console.log(layers);

    // Build Tree
    for (let layer = 0; layer < Object.keys(layers).length - 1; layer++) {
        const childLayer = layers[Object.keys(layers)[layer]];
        const parentLayer = layers[Object.keys(layers)[layer + 1]];
        for (let i = 0; i < parentLayer.length; i++) {
            const leftChild = childLayer[2 * i];
            const rightChild = childLayer[2 * i + 1];
            if (leftChild) parentLayer[i].addChild(leftChild);
            if (rightChild) parentLayer[i].addChild(rightChild);
        }
    }

    console.log(layers);
}

createTournamentTree();

function populateBracket() {
    const leafNodes = layers[Object.keys(layers)[0]];
    const roster_copy = [...roster];
    let index = 0;
    for (const node of leafNodes) {
        node.setFighterA(getFighterByUid(roster_copy[index++]));
        node.setFighterB(getFighterByUid(roster_copy[index++]));
    }
    console.log(leafNodes);
}

function getBracketRootNode() {
    return bracket_nodes[bracket_nodes.length - 1];
}

function simulateTournament(node) {
    if (!node) return null;
    while (!node.winner) {
        const playedNode = playNextMatch(node);
        if (!playedNode) break;
    }
    return node.winner ? node.winner : null;
}

function playNextMatch(node) {
    console.log("playNextMatch", node);
    if (!node) return null;
    const left = node.children[0] || null;
    const right = node.children[1] || null;

    if (left && !left.winner) {
        const resolved = playNextMatch(left);
        if (resolved) return resolved;
    }

    if (right && !right.winner) {
        const resolved = playNextMatch(right);
        if (resolved) return resolved;
    }

    if (left && right) {
        if (left.winner && right.winner) {
            node.setFighterA(left.winner);
            node.setFighterB(right.winner);
        }
    }

    if (node.fighter_a && node.fighter_b && !node.winner) {
        node.setWinner();
        return node;
    }
    return null;
}

// Simple strength calculation formula
function calculateFighterStrength(fighter) {
    const w = fighter.wins;
    const l = fighter.losses;
    const totalFights = w + l;
    const winIndex = (w + 3) / (w + l + 6);
    const experienceFactor = 0.9 + 0.1 * (totalFights / 20);

    console.log(
        "calculateFighterStrength",
        fighter.fighter_name,
        winIndex,
        experienceFactor,
    );

    return 100 * winIndex * experienceFactor;
}

// Calculates matchup probability based on strength
function getMatchupProbability(fighterA, fighterB) {
    const strengthA = calculateFighterStrength(fighterA);
    const strengthB = calculateFighterStrength(fighterB);
    const sum = strengthA + strengthB;
    const probA = sum > 0 ? strengthA / sum : 0.5;
    const probB = 1 - probA;

    console.log(
        "getMatchupProbability",
        fighterA.fighter_name,
        fighterB.fighter_name,
        strengthA,
        strengthB,
        probA,
        probB,
    );

    return [probA, probB];
}

// Simple simulation of a fight between two fighters
// Random number between 0 and 1 is generated compared to the probability of the fighter
function simulateFight(fighterA, fighterB) {
    const matchupProbability = getMatchupProbability(fighterA, fighterB);
    const random = Math.random();
    if (random < matchupProbability[0]) {
        return fighterA;
    } else {
        return fighterB;
    }
}