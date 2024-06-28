// Function to create a square matrix of given size with all values set to false
function createSquareMatrix(size) {
    const matrix = [];
    for (let i = 0; i < size; i++) {
        const row = new Array(size).fill(false);
        matrix.push(row);
    }
    return matrix;
}

function detectRowBingo(matrix) {
    const allIndexes = [];
    let hasBingo = false;

    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i].every(cell => cell)) {
            const bingoIndexes = matrix[i].map((_, col) => `${i}x${col}`);
            allIndexes.push(...bingoIndexes);
            hasBingo = true;
        }
    }

    return { bingo: hasBingo, indexes: allIndexes };
}

function detectColumnBingo(matrix) {
    const allIndexes = [];
    let hasBingo = false;

    for (let col = 0; col < matrix[0].length; col++) {
        let colBingo = true;
        for (let row = 0; row < matrix.length; row++) {
            if (!matrix[row][col]) {
                colBingo = false;
                break;
            }
        }
        if (colBingo) {
            const bingoIndexes = matrix.map((_, row) => `${row}x${col}`);
            allIndexes.push(...bingoIndexes);
            hasBingo = true;
        }
    }

    return { bingo: hasBingo, indexes: allIndexes };
}

function detectDiagonalBingo(matrix) {
    const allIndexes = [];
    let hasBingo = false;

    // Check the left-to-right diagonal
    let leftToRightBingo = true;
    const leftToRightIndexes = [];
    for (let i = 0; i < matrix.length; i++) {
        if (!matrix[i][i]) {
            leftToRightBingo = false;
            break;
        }
        leftToRightIndexes.push(`${i}x${i}`);
    }
    if (leftToRightBingo) {
        allIndexes.push(...leftToRightIndexes);
        hasBingo = true;
    }

    // Check the right-to-left diagonal
    let rightToLeftBingo = true;
    const rightToLeftIndexes = [];
    for (let i = 0; i < matrix.length; i++) {
        const j = matrix.length - 1 - i;
        if (!matrix[i][j]) {
            rightToLeftBingo = false;
            break;
        }
        rightToLeftIndexes.push(`${i}x${j}`);
    }
    if (rightToLeftBingo) {
        allIndexes.push(...rightToLeftIndexes);
        hasBingo = true;
    }

    return { bingo: hasBingo, indexes: allIndexes };
}

function updateGrid(indexes) {
    indexes.forEach(index => {
        const [row, col] = index.split('x');
        const item = document.getElementById(`item-${row}x${col}`);
        if (item) {
            item.classList.add('won');
        }
    });
}

function checkForBingo(matrix) {
    const allBingoIndexes = [];

    // Check for row bingo
    const rowBingo = detectRowBingo(matrix);
    if (rowBingo.bingo) {
        allBingoIndexes.push(...rowBingo.indexes);
    }

    // Check for column bingo
    const columnBingo = detectColumnBingo(matrix);
    if (columnBingo.bingo) {
        allBingoIndexes.push(...columnBingo.indexes);
    }

    // Check for diagonal bingo
    const diagonalBingo = detectDiagonalBingo(matrix);
    if (diagonalBingo.bingo) {
        allBingoIndexes.push(...diagonalBingo.indexes);
    }

    // Update grid with all bingo indexes
	//make an extra matrix that contains true false for won and sets won state based on that array
	console.log(matrix);
    updateGrid(allBingoIndexes);
}

function clearWonState(items) {
    items.forEach(item => item.classList.remove('won'));
}





//actual executed codePointAt
// Define the size of the matrix
const size = 5; // Adjust the size as needed
const matrix = createSquareMatrix(size);
const wonMatrix = createSquareMatrix(size);

document.addEventListener("DOMContentLoaded", function() {
    // Select all grid items
    const gridItems = document.querySelectorAll('.grid-item');

    // Add click event listener to each grid item
    gridItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // Toggle 'active' class
			item.classList.toggle('active');
            const id = item.id;
            const match = id.match(/item-(\d+)x(\d+)/);
            if (match) {
                const row = parseInt(match[1], 10);
                const col = parseInt(match[2], 10);
                matrix[row][col] = item.classList.contains('active');
                console.log(`Matrix updated at [${row}][${col}]:`, matrix[row][col]);
            }
			clearWonState(document.querySelectorAll('.grid-item'));
            // Check for bingo after each click
            checkForBingo(matrix);
        });
    });
});