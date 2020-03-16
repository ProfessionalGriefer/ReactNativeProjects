import { combineReducers } from 'redux';
import { CHANGE_FIELD, CHANGE_HIGHLIGHTED, SOLVE, RESET_GRID } from './actions';
import { check, solved } from '../algorithm';

const initialState = [
  ['5', '3', '', '', '7', '', '', '', ''],
  ['6', '', '', '1', '9', '5', '', '', ''],
  ['', '9', '8', '', '', '', '', '6', ''],
  ['8', '', '', '', '6', '', '', '', '3'],
  ['4', '', '', '8', '', '3', '', '', '1'],
  ['7', '', '', '', '2', '', '', '', '6'],
  ['', '6', '', '', '', '', '2', '8', ''],
  ['', '', '', '4', '1', '9', '', '', '5'],
  ['', '', '', '', '8', '', '', '7', '9']
];
const gridReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FIELD: {
      const newState = state;
      if (check(state, action)) {
        newState[action.row][action.column] = action.number;
      }
      return newState;
    }
    case SOLVE:
      return solved(state);
    case RESET_GRID:
      return [
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '']
      ];
    default:
      return state;
  }
};
const selected = {
  row: 0,
  column: 0
};
const highlightedReducer = (state = selected, action) => {
  switch (action.type) {
    case CHANGE_HIGHLIGHTED:
      return { row: action.row, column: action.column };

    default:
      return state;
  }
};
const reducer = combineReducers({
  grid: gridReducer,
  highlighted: highlightedReducer
});
export default reducer;
