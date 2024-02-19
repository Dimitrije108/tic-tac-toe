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
            changePlayerTurn();
        }
        winCondition();
    }

    function winCondition() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < i.length; j++) {
                if (typeof board[i][j] !== 'string') {
                    break;
                } else {
                    alert("It's a draw!");
                }
            }
        }
    }

    return {
        playRound,
        getBoard,
    }
}

const play = Play();

//player objects

//control the flow of the game object