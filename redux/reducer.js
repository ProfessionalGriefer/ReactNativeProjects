import { combineReducers } from 'redux';

import {
  UPDATE_VELOCITY,
  UPDATE_ANGLE,
  UPDATE_HEIGHT,
  UPDATE_GRAVITATION,
  RESET_INPUT
} from './actions';

const initialInputState = {
  velocity: 35,
  angle: 45,
  height: 5,
  gravitation: 9.81
};

const inputReducer = (state = initialInputState, action) => {
  switch (action.type) {
    case UPDATE_VELOCITY:
      return { ...state, velocity: action.payload };

    case UPDATE_ANGLE:
      return { ...state, angle: action.payload };

    case UPDATE_HEIGHT:
      return { ...state, height: action.payload };

    case UPDATE_GRAVITATION:
      return { ...state, gravitation: action.payload };

    case RESET_INPUT:
      return initialInputState;

    default:
      return state;
  }
};

const reducer = combineReducers({
  input: inputReducer
});

export default reducer;
