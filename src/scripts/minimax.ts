// ts-node -O '{"module": "commonjs"}' scripts/minimax.ts

const isFull = (squares:any) => {
    for(let idx in squares){
        const element = squares[idx]
        if (element == null) {
            return false
        }
    }
    return true
}

const judgeWinOrLose = (squares:any) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for(let idx in lines){
        const [a, b, c] = lines[idx];
        if (squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a] % 2;
        }
      }
      return null;
}

const minimax = ({step, squares, player, alpha, beta}:any) =>{
    step += 1
    const winner = judgeWinOrLose(squares)
    // leaf nodes
    if (winner !== null || isFull(squares)) {
        // let indent = ''
        // for (let i = 0; i < step; i++) {
        //     indent += '\t'
        // }
        // console.log("leaf, winner is", winner, indent + (winner !== null ? winner * 2 - 1 : 1))
        if (winner !== null) {
            return (winner * 2 - 1); // for player0, return -1; for player1, return 1;
        }
        // if board is full and there is no winner
        // it is a draw
        return 1
    }

    // parent node
    if (player > 0) {
        let v = - Infinity
        for (let idx = 0; idx < squares.length; idx += 1) {
            let ele = squares[idx];
            if (ele === null) {
                squares[idx] = player;
                const _v = minimax({step, squares, player: 0, alpha, beta})
                squares[idx] = null;
                if (_v >= v) {
                    v = _v
                }
                // if (_v >= beta) {
                    //     return v;
                    // }
                    // if (_v > alpha) {
                        //     alpha = _v
                        // }
                    }
        }
        // let indent = ''
        // for (let i = 0; i < step; i++) {
        //     indent += '\t'
        // }
        // console.log("max" + indent + v)
        return v;
    } else {
        let v = Infinity
        for (let idx = 0; idx < squares.length; idx += 1) {
            let ele = squares[idx];
            if (ele === null) {
                squares[idx] = player;
                const _v = minimax({step, squares, player: 1, alpha, beta})
                squares[idx] = null;
                if (_v <= v) {
                    v = _v
                }
                // if (_v <= alpha) {
                //     return v;
                // }
                // if (_v < beta) {
                //     beta = _v
                // }
            }
        }
        // let indent = ''
        // for (let i = 0; i < step; i++) {
        //     indent += '\t'
        // }
        // console.log("min", indent + v)
        return v;
    }
}

const calculateNextStep = (squares:any) => {
    let nextMove = -1;
    let bestScore = - Infinity;
    squares.forEach((ele:any, idx:any) => {
        if (ele === null) {
            squares[idx] = 1;
            const score = minimax({step: 0, squares, player: 0, alpha: -Infinity, beta: Infinity});
            squares[idx] = null;
            // console.log(score)
            if (score > bestScore) {
                nextMove = idx;
                bestScore = score
            }
        }
    });
    return nextMove;
}

export default calculateNextStep;
// let board = Array(9).fill(null)
// console.log(calculateNextStep(board))
