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
        //check 3 in a row combinations
        board.forEach((array) => {
            const checkRow = array.every(value => value === activePlayer.value);
            if (checkRow === true) {
                alert("You've won!");
            }
        })
        //check 3 in a column combinations
        let firstColumn = [];
        let secondColumn = [];
        let thirdColumn = [];

        board.filter((array) => {
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

        board.filter((array) => {
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
        let draw = board.flat();
        const checkDraw = draw.every(value => typeof value === 'string');
        if (checkDraw === true) {
            alert("Draw!");
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