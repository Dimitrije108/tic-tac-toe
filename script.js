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
        board[row][column] = GameController.getActivePlayer().value;
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
        name: 'playerX',
        value: "X",
    }
    const player2 = {
        name: 'playerO',
        value: "O",
    }

    let activePlayer = player1;

    const changePlayerTurn = () => {
        activePlayer = activePlayer === player1 ? player2 :  player1;
    }

    const getActivePlayer = () => activePlayer;

    const playRound = (row, column) => {
        if (typeof checkBoard[row][column] !== 'string' && winCondition === false) {
            board.addValue(row, column);
            checkWinCondition();
            if (winCondition === false) {
                changePlayerTurn();
            }
            ScreenController.updateScreen();
        }
    }

    let winCondition = false;

    const getWinCondition = () => winCondition;

    const checkWinCondition = () => {
        //check 3 in a row combinations
        checkBoard.forEach((array) => {
            const checkRow = array.every(value => value === activePlayer.value);
            if (checkRow === true) {
                return winCondition = true;
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
                return winCondition = true;
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
                return winCondition = true;
            }
        })
        // check for a win (to avoid displaying draw message if a win was accomplished on the last turn)
        if (winCondition === true) {
            return;
        }
        //check for a draw
        let checkDraw = checkBoard.flat().every(value => typeof value === 'string');
        if (checkDraw === true) {
            winCondition = true;
        }
    }

    return {
        playRound,
        getActivePlayer,
        getWinCondition
    }
})();

const ScreenController = (function() {
    const board = Gameboard;
    const game = GameController;
    const gameboard = document.querySelector('.gameboard');
    const display = document.querySelector('.display');

    const updateScreen = () => {
        gameboard.textContent = '';

        game.getWinCondition() === true ? display.textContent = `${game.getActivePlayer().name} wins!` : display.textContent = `${game.getActivePlayer().name}'s turn`;
        
        board.getBoard().forEach((array, index) => {
            let rowIndex = index;
            array.forEach((element, index) => {
                const column = document.createElement('button');
                column.classList.add('column');
                column.setAttribute('data-row', rowIndex);
                column.setAttribute('data-column', index);
                typeof element === 'string' ? column.textContent = element : "";
                gameboard.appendChild(column);
            })
        });
    };

    updateScreen();

    gameboard.addEventListener('click', (e) => {
        let row = Number(e.target.dataset.row);
        let column = Number(e.target.dataset.column);
        game.playRound(row, column);
    })
    
    return {
        updateScreen
    }
})();