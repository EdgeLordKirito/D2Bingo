const middleValues = [
	"Guardian Down",
	"Thunderlord"
];

const genericValues = [
    "Ego",
    "Silent Leaver",
    "Monka Bubble",
	"Who Div",
	"AFK",
	"Xeno",
	"Noisy Background",
	"Malding",
	"Falling of the Map",
	"DKWTD",
	"Challenge?",
	"Banner before Pull",
	"Rip the Flawless",
	"Day 1 Flex",
	"Still need Chest",
	"Can I grab Checkpoint?",
	"I do Add Clear!",
	"Cutscene Enthusiast",
	"Exotic RNG Flex",
];


// Function to populate the bingo grid with values from different lists
function populateBingoGrid() {
	console.log("Populating Board");
    // Check if GetRandomValuesFromArray is defined
    if (typeof GetRandomValuesFromArray !== "function") {
        throw new Error("GetRandomValuesFromArray is not defined");
    }

    // Get all grid items
    const gridItems = document.querySelectorAll('.grid-item');
    const totalItems = gridItems.length;

    // Calculate number of generic values needed (excluding middle and raid values)
    const middleIndex = Math.floor(totalItems / 2);
    const genericValuesNeeded = totalItems - 1 - 6; // Total items - 1 for middleValue - 6 for raidValues

    // Get values from the different lists
    const middle = GetRandomValuesFromArray(middleValues, 1)[0];
    const raid = GetRandomValuesFromArray(raidSpecificValues, 6);
    const generic = GetRandomValuesFromArray(genericValues, genericValuesNeeded);

    // Combine raidValues and genericValues into one array and shuffle
    let unorderedValues = [...raid, ...generic];
    shuffleArray(unorderedValues);

    // Create an array to hold all values with middleValue in the middle
    const allValues = [];

    // Insert middleValue into the middleIndex position
    for (let i = 0; i < totalItems; i++) {
        if (i === middleIndex) {
            allValues.push(middle);
        } else {
            allValues.push(unorderedValues.shift()); // Add values from unorderedValues array
        }
    }

    // Populate the grid items with the values
    gridItems.forEach((item, index) => {
        item.textContent = allValues[index];
    });
}

// Call the function to populate the grid when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", populateBingoGrid);
