const check = (state, action) => {
  // check row
  for (let i = 0; i < 9; i += 1) {
    if (state[action.row][i] && state[action.row][i] === action.number) {
      // console.log('exit row');
      return false;
    }
  }
  // check column
  for (let i = 0; i < 9; i += 1) {
    if (state[i][action.column] && state[i][action.column] === action.number) {
      // console.log('exit column');
      return false;
    }
  }
  // check quadrant
  for (
    let i = Math.floor(action.row / 3) * 3;
    i <= Math.floor(action.row / 3) * 3 + 2;
    i += 1
  ) {
    for (
      let k = Math.floor(action.column / 3) * 3;
      k <= Math.floor(action.column / 3) * 3 + 2;
      k += 1
    ) {
      if (state[i][k] && state[i][k] === action.number) {
        return false;
      }
    }
  }
  return true;
};
/* 
1. Go to first empty field
2. Change it to the smallest available number.
3. Go to next empty field.
4. Change it to the smallest available number.
5. If every number is blocked go back 1 field.
6. Increment last empty field.
7. If empty field is 9 go back one again.
8. Delete every field which came after the the back field.
 */
const solved = grid => {
  // const startTime = new Date();
  const gridBackup = grid;
  // List of empty fields
  const emptyGrid = [];
  for (let i = 0; i < 9; i += 1) {
    for (let k = 0; k < 9; k += 1) {
      if (!grid[i][k]) {
        emptyGrid.push({ row: i.toString(), column: k.toString() });
      }
    }
  }
  // index of emptyGrid
  let highlighted = 0;
  let highlightedField;
  let row;
  let column;
  let flag = false;
  while (highlighted !== emptyGrid.length) {
    row = emptyGrid[highlighted].row;
    column = emptyGrid[highlighted].column;
    highlightedField = gridBackup[row][column];

    // Going Forward
    if (highlightedField === '') {
      // Change to smallest possible number

      for (let i = 1; i <= 9; i += 1) {
        if (check(gridBackup, { row, column, number: i.toString() })) {
          gridBackup[row][column] = i.toString();
          highlighted += 1;
          break;
        }
        // If nothing fits go back
        else if (
          i === 9 &&
          check(gridBackup, { row, column, number: i.toString() }) === false
        ) {
          highlighted -= 1;
        }
      }
    }
    // Going Backwards
    // Number is 9 -> Not incrementable
    else if (highlightedField === '9') {
      gridBackup[row][column] = '';
      highlighted -= 1;
    }
    // Increment if number is available else go back
    else {
      flag = false;
      for (let i = parseInt(highlightedField, 10) + 1; i <= 9; i += 1) {
        if (check(gridBackup, { row, column, number: i.toString() })) {
          gridBackup[row][column] = i.toString();
          highlighted += 1;
          // True means found something that fits
          flag = true;
          break;
        }
      }
      // Nothing fitted: Go back
      if (!flag) {
        gridBackup[row][column] = '';
        highlighted -= 1;
      }
    }
  }
  // const endTime = new Date();
  // console.log('Loop Time: ', (endTime - startTime) / 1000, 's');
  return gridBackup;
};
// does not work!
// const solveRecursive = grid => {
//   const startTime = new Date();
//   const newGrid = grid;
//   const solve = () => {
//     // For every row
//     for (let i = 0; i < 9; i += 1) {
//       // For every column
//       for (let k = 0; k < 9; k += 1) {
//         // Check if empty
//         if (newGrid[i][k] === '') {
//           // Possible numbers
//           for (let l = 1; l <= 9; l += 1) {
//             // Check number
//             if (
//               check(newGrid, {
//                 row: i.toString(),
//                 column: k.toString(),
//                 number: l.toString()
//               })
//             ) {
//               // If possible set number
//               newGrid[i][k] = l.toString();
//               // Start over with one empty field less
//               solve();
//               // Back tracking if all possible values didn't work
//               newGrid[i][k] = '';
//             }
//           }
//           return;
//         }
//       }
//     }
//   };
//   solve();
//   const endTime = new Date();
//   // console.log('Recursive Time: ', (endTime - startTime) / 1000, 's');
//   return newGrid;
// };
// const testSudoku = [
//   ['5', '3', '', '', '7', '', '', '', ''],
//   ['6', '', '', '1', '9', '5', '', '', ''],
//   ['', '9', '8', '', '', '', '', '6', ''],
//   ['8', '', '', '', '6', '', '', '', '3'],
//   ['4', '', '', '8', '', '3', '', '', '1'],
//   ['7', '', '', '', '2', '', '', '', '6'],
//   ['', '6', '', '', '', '', '2', '8', ''],
//   ['', '', '', '4', '1', '9', '', '', '5'],
//   ['', '', '', '', '8', '', '', '7', '9']
// ];
// console.log(solved(testSudoku));
export { check, solved };
