import { combineReducers } from 'redux';

import {
  UPDATE_VELOCITY,
  UPDATE_HEIGHT,
  UPDATE_GRAVITY,
  RESET_INPUT,
  UPDATE_INITIALMASS,
  UPDATE_FINALMASS,
  UPDATE_EXHAUSTVELOCITY,
  UPDATE_MASSFLOWRATE,
  UPDATE_DATA_VELOCITY,
  UPDATE_DATA_HEIGHT,
  UPDATE_MAXIMUM,
  UPDATE_MINIMUM,
  UPDATE_TIME,
  TOGGLE_CHECK
} from './actions';

const initialProjectileInputState = {
  velocity: 35,
  height: 5,
  gravity: 9.81
};

const inputProjectileReducer = (state = initialProjectileInputState, action) => {
  switch (action.type) {
    case UPDATE_VELOCITY:
      return { ...state, velocity: action.payload };

    case UPDATE_HEIGHT:
      return { ...state, height: action.payload };

    case UPDATE_GRAVITY:
      return { ...state, gravity: action.payload };

    case RESET_INPUT:
      return initialProjectileInputState;

    default:
      return state;
  }
};
const initialRocketInputState = {
  initialMass: 10,
  finalMass: 4,
  exhaustVelocity: 55,
  massFlowRate: 4,

  checked: true
};
const inputRocketReducer = (state = initialRocketInputState, action) => {
  switch (action.type) {
    case UPDATE_FINALMASS:
      return { ...state, finalMass: action.payload };

    case UPDATE_INITIALMASS:
      return { ...state, initialMass: action.payload };

    case UPDATE_EXHAUSTVELOCITY:
      return { ...state, exhaustVelocity: action.payload };

    case UPDATE_MASSFLOWRATE:
      return { ...state, massFlowRate: action.payload };

    case TOGGLE_CHECK:
      return { ...state, checked: !state.checked };

    case RESET_INPUT:
      return initialRocketInputState;

    default:
      return state;
  }
};

const initialInfoState = {
  dataVelocity: [
    { x: 10, y: 2 },
    { x: 20, y: 10 }
  ],
  dataHeight: [
    { x: 10, y: 2 },
    { x: 20, y: 10 }
  ],
  maximum: { x: 10, y: 10 }, // maximum height
  minimum: -10, // lowest velocity
  time: 23 // {x: 23, y: 0}
};
const infoReducer = (state = initialInfoState, action) => {
  switch (action.type) {
    case UPDATE_DATA_VELOCITY:
      return { ...state, dataVelocity: action.payload };
    case UPDATE_DATA_HEIGHT:
      return { ...state, dataHeight: action.payload };
    case UPDATE_MAXIMUM:
      return { ...state, maximum: action.payload };
    case UPDATE_MINIMUM:
      return { ...state, minimum: action.payload };
    case UPDATE_TIME:
      return { ...state, time: action.payload };
    default:
      return state;
  }
};

const reducer = combineReducers({
  inputRocket: inputRocketReducer,
  inputProjectile: inputProjectileReducer,
  info: infoReducer
});

export default reducer;
