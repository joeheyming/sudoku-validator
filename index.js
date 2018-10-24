var board = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

function validateRows(board) {
  for (var i = 0; i < board.length; i++) {
    var map = {};
    for (var j = 0; j < board[i].length; j++) {
      // iterate throgh all the columns for each row index
      if (map[board[i][j]]) return false; // Invalid Row
      map[board[i][j]] = true;
    }
  }

  return true;
}

function validateColumns(board) {
  for (var i = 0; i < board.length; i++) {
    var map = {};
    for (var j = 0; j < board.length; j++) {
      // iterate throgh all the rows for each column index
      if (map[board[j][i]]) return false; // Invalid column
      map[board[j][i]] = true;
    }
  }
  return true;
}

function validateSubBoards(board) {
  var boardIndices = [0, 3, 6];

  for (var i = 0; i < boardIndices.length; i++) {
    for (var j = 0; j < boardIndices.length; j++) {
      if (!validateSubBoard(board, boardIndices[i], boardIndices[j]))
        return false;
    }
  }

  return true;
}

function validateSubBoard(board, sbr, sbc) {
  var map = {};
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (map[board[i + sbr][j + sbc]]) return false;
      map[board[i + sbr][j + sbc]] = true;
    }
  }
  return true;
}

function validateSudoku(board) {
  return validateRows(board)
    ? validateColumns(board)
      ? validateSubBoards(board)
      : false
    : false;
}

// trigger validate sudoku through an event handler on the UI

function createBoard() {
  board.forEach(function(row, j) {
    const rowGroup = document.createElement('div');
    rowGroup.classList.add('row');
    if (j !== 0 && j % 3 === 0) {
      rowGroup.classList.add('top-edge');
    }

    row.forEach(function(col, i) {
      const cell = document.createElement('span');
      cell.data = col;
      cell.onclick = function() {
        const val = document.createElement('input');
        val.value = cell.innerText;
        cell.innerText = null;
        cell.appendChild(val);
        val.focus();
        function done() {
          const value = val.value;
          val.onblur = null;
          cell.removeChild(cell.firstChild);
          cell.innerText = value;
          cell.data = value;
        }
        val.onblur = done;
        val.onkeydown = function(event) {
          const digit = String.fromCharCode(event.which).match(/[1-9]/);
          if (digit || event.which === 13 || event.which === 27) {
            return;
          }
          event.preventDefault();
        }
        val.onkeyup = function(event) {
          const digit = String.fromCharCode(event.which).match(/[1-9]/);
          if (digit) {
            val.value = digit;
          } else if (event.which === 13) { // enter
            done();
          } else if (event.which === 27) { // escape
            val.onblur = null;
            cell.removeChild(cell.firstChild);
            cell.innerText = cell.data;
          }
        }
      }

      cell.classList.add('cell');
      cell.innerText = col;
      rowGroup.appendChild(cell);

      if (i !== 0 && i % 3 === 0) {
        cell.classList.add('edge');
      }
    });
    sudoku_board.appendChild(rowGroup);
  });
}

createBoard();
