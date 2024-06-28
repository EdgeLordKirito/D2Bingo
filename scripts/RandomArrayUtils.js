
function shuffleArray(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

// Function to remove empty strings and nulls from an array
function stitchArray(array) {
    const result = array.filter(item => item !== "" && item !== null);
    return result;
}

// Function to get specific number of random items from a given array
function GetRandomValuesFromArray(array, amount) {
    // Check if array is defined and is an array
    if (!Array.isArray(array)) {
        throw new Error("Parameter must be an array");
    }

    // Make a copy of array to shuffle
    const shuffledArray = [...array];
    shuffleArray(shuffledArray);

    const pickedItems = [];
    let currentIndex = 0;

    for (let i = 0; i < amount; i++) {
        // Check if there are any items left to pick
        if (currentIndex >= shuffledArray.length) {
            currentIndex = 0; // Reset index if we reach the end of the array
            shuffleArray(shuffledArray); // Shuffle array again after each complete pass
        }

        // Pick the current item and add to pickedItems
        pickedItems.push(shuffledArray[currentIndex]);
        currentIndex++;
    }

    return pickedItems;
}