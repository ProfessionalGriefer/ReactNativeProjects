export const CHANGE_FIELD = 'CHANGE_FIELD';
export const CHANGE_HIGHLIGHTED = 'CHANGE_HIGHLIGHTED';
export const SOLVE = 'SOLVE';
export const RESET_GRID = 'RESET_GRID';

export const changeField = update => ({
  type: CHANGE_FIELD,
  row: update.row,
  column: update.column,
  number: update.number
});
export const changeHighlighted = update => ({
  type: CHANGE_HIGHLIGHTED,
  row: update.row,
  column: update.column
});
export const solve = () => ({
  type: SOLVE
});
export const resetGrid = () => ({
  type: RESET_GRID
});
