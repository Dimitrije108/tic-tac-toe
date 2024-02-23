const Gameboard = (function() {
    const board = [];
    const row = 3;
    const column = 3;

    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < column; j++) {
            board[i].push(j);
        }
    }

    const getBoard = () => board;

    const addValue = (row, column) => {
        if (typeof board[row][column] !== 'string') {
            board[row][column] = GameController.getActivePlayer().value;
        }
    }

    return { 
        getBoard,
        addValue,
    }
})();

const GameController = (function() {
    const board = Gameboard;
    const checkBoard = board.getBoard();

    const player1 = {
        name: this.name,
        value: "X",
    }
    const player2 = {
        name: this.name,
        value: "O",
    }

    let activePlayer = player1;

    const changePlayerTurn = () => {
        activePlayer = activePlayer === player1 ? player2 :  player1;
    }

    const getActivePlayer = () => activePlayer;

    const playRound = (row, column) => {
        board.addValue(row, column);
        winCondition();
        changePlayerTurn();
    }

    const winCondition = () => {
        //check 3 in a row combinations
        checkBoard.forEach((array) => {
            const checkRow = array.every(value => value === activePlayer.value);
            if (checkRow === true) {
                alert("You've won!");
            }
        })
        //check 3 in a column combinations
        let firstColumn = [];
        let secondColumn = [];
        let thirdColumn = [];

        checkBoard.filter((array) => {
            firstColumn.push(array[0]);
            secondColumn.push(array[1]);
            thirdColumn.push(array[2]);
        })

        let columns = [firstColumn, secondColumn, thirdColumn];

        columns.forEach((array) => {
            const checkColumn = array.every(value => value === activePlayer.value);
            if (checkColumn === true) {
                alert("You've won!");
            }
        })
        //check diagonal combinations
        let firstDiagonal = [];
        let secondDiagonal = [];

        let first = 0;
        let second = 2;

        checkBoard.filter((array) => {
            firstDiagonal.push(array[first]);
            secondDiagonal.push(array[second]);
            first++;
            second--;
        })

        let diagonals = [firstDiagonal, secondDiagonal];

        diagonals.forEach((array) => {
            const checkDiagonal = array.every(value => value === activePlayer.value);
            if (checkDiagonal === true) {
                alert("You've won!");
            }
        })
        //check for a draw
        let checkDraw = checkBoard.flat().every(value => typeof value === 'string');
        if (checkDraw === true) {
            alert("Draw!");
        }
    }

    return {
        playRound,
        getActivePlayer
    }
})();

const ScreenController = (function() {
    //pull in game module - so that the DOM interacts with the playRound and so on
    const board = Gameboard;
    const game = GameController;
    const gameboard = document.querySelector('.gameboard');
    //DOM references to the game board and player turn display. These will be used by the updateScreen and clickHandlerBoard methods.

    const updateScreen = (() => {
        gameboard.textContent = '';
        
        board.getBoard().forEach((array, index) => {
            let rowIndex = index;
            array.forEach((element, index) => {
                const column = document.createElement('button');
                column.classList.add('column');
                column.setAttribute('data-row', rowIndex);
                column.setAttribute('data-column', index);
                gameboard.appendChild(column);
            })
        });
    })();

    
    //take the state of the game board and which player's turn it is, and update the screen each time a player takes their turn.

    // Clear the DOM of the current board display by simply setting the .board div's text content to an empty string.
    // Get the most up-to-date board from the game controller.
    // Get the most up-to-date active player from the game controller.
    // Render the player's turn in the .turn div.
    // Render each grid square on the DOM
    // I make sure to give each cell a data-attribute of column and set that value to the index of the cell in its row, so that when we click them in the future, we already have access to what column that cell is in.
    // The cells are buttons, not divs. Why? In most cases, anything clickable should be a button or link. This enables those with accessability issues to still be able to use our site easily be tabbing and selecting with the keyboard.
    gameboard.addEventListener('click', (e) => {
        let row = e.target.dataset.row;
        let column = e.target.dataset.column;
        game.playRound(row, column);
    })

    const clickHandlerBoard = (() => {
        
        //verifies that a valid cell was clicked
        //get the column data-attribute value, pass that into our game controller's playRound method, then run updateScreen to refresh the DOM.
    })();

    return {
        updateScreen
    }
})();



