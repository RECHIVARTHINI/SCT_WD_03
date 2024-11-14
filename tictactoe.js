const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; // X always starts
let gameOver = false;

// Check if there is a winner
const checkWinner = (player) => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]               // Diagonals
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === player)
    );
};

// Update game status
const updateStatus = (message) => {
    statusDiv.textContent = message;
};

// Handle cell click
const handleCellClick = (e) => {
    const index = e.target.dataset.index;

    if (board[index] !== '' || gameOver) return;  // If the cell is already occupied or game is over

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner(currentPlayer)) {
        updateStatus(`${currentPlayer} Wins!`);
        gameOver = true;
        return;
    }

    if (!board.includes('')) {
        updateStatus('It\'s a Tie!');
        gameOver = true;
        return;
    }

    // Switch to the next player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

// Restart game
const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    cells.forEach(cell => cell.textContent = '');  // Clear the cells
    updateStatus('');  // Reset the status message
};

// Attach event listeners to each cell
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Attach event listener to restart button
restartBtn.addEventListener('click', restartGame);



