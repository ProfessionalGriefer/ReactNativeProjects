import { combineReducers } from 'redux';

import {
  UPDATE_VELOCITY,
  UPDATE_ANGLE,
  UPDATE_HEIGHT,
  UPDATE_GRAVITY,
  RESET_INPUT,
  UPDATE_INITIALMASS,
  UPDATE_FINALMASS,
  UPDATE_EXHAUSTVELOCITY,
  UPDATE_MASSFLOWRATE,
  // UPDATE_DELTAV,
  // UPDATE_SPECIFICIMPULSE,
  UPDATE_DATA_ROCKET,
  UPDATE_DATA_BALLISTIC,
  UPDATE_MAXIMUM,
  UPDATE_ROOT,
  TOGGLE_CHECK
} from './actions';

const initialProjectileInputState = {
  velocity: 35,
  angle: 45,
  height: 5,
  gravity: 9.81
};

const inputProjectileReducer = (state = initialProjectileInputState, action) => {
  switch (action.type) {
    case UPDATE_VELOCITY:
      return { ...state, velocity: action.payload };

    case UPDATE_ANGLE:
      return { ...state, angle: action.payload };

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

  deltaV: 0,
  // specificImpulse: 0
  checked: false
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

    // case UPDATE_DELTAV:
    //   return { ...state, deltaV: action.payload };

    // case UPDATE_SPECIFICIMPULSE:
    //   return { ...state, specificImpulse: action.payload };

    case TOGGLE_CHECK:
      return { ...state, checked: !state.checked };

    case RESET_INPUT:
      return initialRocketInputState;

    default:
      return state;
  }
};

const initialInfoState = {
  dataRocket: [
    { x: 10, y: 2 },
    { x: 20, y: 10 }
  ],
  dataBallistic: [
    { x: 10, y: 2 },
    { x: 20, y: 10 }
  ],
  maximum: { x: 10, y: 10 },
  root: 23 // {x: 23, y: 0}
};
const infoReducer = (state = initialInfoState, action) => {
  switch (action.type) {
    case UPDATE_DATA_ROCKET:
      return { ...state, dataRocket: action.payload };
    case UPDATE_DATA_BALLISTIC:
      return { ...state, dataBallistic: action.payload };
    case UPDATE_MAXIMUM:
      return { ...state, maximum: action.payload };
    case UPDATE_ROOT:
      return { ...state, root: action.payload };
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
