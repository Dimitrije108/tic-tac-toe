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

    const resetBoard = () => {
        board.forEach((row, index) => {
            const resetRow = row;
            const rowIndex = index;
            resetRow.forEach((column, index) => {
                board[rowIndex][index] = index;
            })
        })
    }

    return { 
        getBoard,
        addValue,
        resetBoard,
    }
})();

const GameController = (function() {
    const board = Gameboard;
    const checkBoard = board.getBoard();

    const player1 = {
        name: 'Player 1',
        value: "X",
        score: 0,
    }
    const player2 = {
        name: 'Player 2',
        value: "O",
        score: 0,
    }

    const changeName = (name, number) => {
        if (name.value.length > 2) {
            number === 'first' ? player1.name = name.value : player2.name = name.value;
            ScreenController.updateScreen();
        }
    }

    const getPlayer1Score = () => player1.score;
    const getPlayer2Score = () => player2.score;

    let initialPlayerTurn = player1;
    let activePlayer = player1;

    const changePlayerTurn = () => {
        activePlayer = activePlayer === player1 ? player2 :  player1;
    }

    const getActivePlayer = () => activePlayer;

    const playRound = (row, column) => {
        if (typeof checkBoard[row][column] !== 'string' && winCondition === false && drawCondition === false) {
            board.addValue(row, column);
            checkWinCondition();
            if (winCondition === false) {
                changePlayerTurn();
            }
            ScreenController.updateScreen();
        }
    }

    let winCondition = false;
    let drawCondition = false;

    const getWinCondition = () => winCondition;
    const getDrawCondition = () => drawCondition;

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
        //if both win and draw conditions are true it messes up so if win is true - exit func before checking draw
        if (winCondition === true) {
            return;
        }
        //check for a draw
        let checkDraw = checkBoard.flat().every(value => typeof value === 'string');
        if (checkDraw === true) {
            drawCondition = true;
        }
    }

    const nextRound = () => {
        if (winCondition === true) {
            activePlayer.score++;
        }
        if (winCondition === true || drawCondition === true) {
            activePlayer = initialPlayerTurn === player1 ? (initialPlayerTurn = player2) : (initialPlayerTurn = player1);
            winCondition = false;
            drawCondition = false;
            board.resetBoard();
            ScreenController.updateScreen();
        }
    }

    const resetGame = () => {
        player1.score = 0;
        player2.score = 0;
        activePlayer = player1;
        winCondition = false;
        drawCondition = false;
        board.resetBoard();
        ScreenController.updateScreen();
    }

    return {
        playRound,
        changeName,
        getPlayer1Score,
        getPlayer2Score,
        getActivePlayer,
        getWinCondition,
        getDrawCondition,
        nextRound,
        resetGame,
    }
})();

const ScreenController = (function() {
    const board = Gameboard;
    const game = GameController;
    const gameboard = document.querySelector('.gameboard');
    const display = document.querySelector('.display');
    const scorePlayer1 = document.querySelector('.scorePlayer1');
    const scorePlayer2 = document.querySelector('.scorePlayer2');
    const nextRoundBtn = document.querySelector('.nextRound');
    const restartBtn = document.querySelector('.restartBtn');
    //name input and confirm btn for both players
    const player1Name = document.querySelector('#player1');
    const player2Name = document.querySelector('#player2');
    const player1Btn = document.querySelector('.player1Btn');
    const player2Btn = document.querySelector('.player2Btn');
    const player1Input = document.querySelector('.player1Input');
    const player2Input = document.querySelector('.player2Input');

    const updateScreen = () => {
        gameboard.textContent = '';

        game.getWinCondition() === true ? display.textContent = `${game.getActivePlayer().name} wins!` : display.textContent = `${game.getActivePlayer().name}'s turn`;

        if (game.getDrawCondition() === true) {
            display.textContent = "Draw!";
        }

        scorePlayer1.textContent = game.getPlayer1Score();
        scorePlayer2.textContent = game.getPlayer2Score();
        
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

    const updateName = (name, parent, btn) => {
        if (name.value.length > 2) {
            parent.removeChild(name);
            parent.removeChild(btn);
            const displayName = document.createElement('div');
            displayName.classList.add('displayName');
            displayName.textContent = name.value;
            parent.appendChild(displayName);
        } else {
            alert('Please select a name longer than 2 characters');
        }
    }

    gameboard.addEventListener('click', (e) => {
        let row = Number(e.target.dataset.row);
        let column = Number(e.target.dataset.column);
        game.playRound(row, column);
    });

    player1Btn.addEventListener('click', () => {
        game.changeName(player1Name, 'first');
        updateName(player1Name, player1Input, player1Btn);
        
    })

    player2Btn.addEventListener('click', () => {
        game.changeName(player2Name, 'second');
        updateName(player2Name, player2Input, player2Btn);
    })

    nextRoundBtn.addEventListener('click', () => {
        game.nextRound();
    })

    restartBtn.addEventListener('click', () => {
        game.resetGame();
    });
    
    return {
        updateScreen,
    }
})();