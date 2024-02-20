function Gameboard() {
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

    return getBoard();
}

function Play() {
    const board = Gameboard();

    const player1 = {
        name: this.name,
        value: "X",
    }
    const player2 = {
        name: this.name,
        value: "O",
    }

    const getBoard = () => board;

    let activePlayer = player1;

    function changePlayerTurn() {
        activePlayer = activePlayer === player1 ? player2 :  player1;
    }

    function playRound(row, column) {
        if (typeof board[row][column] !== 'string') {
            board[row][column] = activePlayer.value;
            winCondition();
            changePlayerTurn();
        }
    }

    function winCondition() {
        board.forEach((array) => {
            const checkRow = array.every(value => value === activePlayer.value);
            if (checkRow === true) {
                alert("You've won!");
            }
        })
        
    }

    return {
        playRound,
        getBoard,
    }
}

const play = Play();

//player objects

//control the flow of the game object