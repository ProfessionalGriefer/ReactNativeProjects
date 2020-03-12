// Action Types
export const UPDATE_VELOCITY = 'UPDATE_VELOCITY';
export const UPDATE_ANGLE = 'UPDATE_ANGLE';
export const UPDATE_HEIGHT = 'UPDATE_HEIGHT';
export const UPDATE_GRAVITY = 'UPDATE_GRAVITY';
export const UPDATE_FINALMASS = 'UPDATE_FINALMASS';
export const UPDATE_INITIALMASS = 'UPDATE_INITIALMASS';
export const UPDATE_EXHAUSTVELOCITY = 'UPDATE_EXHAUSTVELOCITY';
export const UPDATE_MASSFLOWRATE = 'UPDATE_MASSFLOWRATE';
export const RESET_INPUT = 'RESET_INPUT';
export const TOGGLE_CHECK = 'TOGGLE_CHECK';
// export const UPDATE_DELTAV = 'UPDATE_DELTAV';
// export const UPDATE_SPECIFICIMPULSE = 'UPDATE_SPECIFICIMPULSE';
export const UPDATE_DATA_ROCKET = 'UPDATE_DATA_ROCKET';
export const UPDATE_DATA_BALLISTIC = 'UPDATE_DATA_BALLISTIC';
export const UPDATE_MAXIMUM = 'UPDATE_MAXIMUM';
export const UPDATE_ROOT = 'UPDATE_ROOT';

// Action Creator
export const updateVelocity = update => ({
  type: UPDATE_VELOCITY,
  payload: update
});
export const updateAngle = update => ({
  type: UPDATE_ANGLE,
  payload: update
});
export const updateHeight = update => ({
  type: UPDATE_HEIGHT,
  payload: update
});
export const updateGravity = update => ({
  type: UPDATE_GRAVITY,
  payload: update
});
export const updateFinalMass = update => ({
  type: UPDATE_FINALMASS,
  payload: update
});
export const updateInitialMass = update => ({
  type: UPDATE_INITIALMASS,
  payload: update
});
export const updateExhaustVelocity = update => ({
  type: UPDATE_EXHAUSTVELOCITY,
  payload: update
});
export const updateMassFlowRate = update => ({
  type: UPDATE_MASSFLOWRATE,
  payload: update
});
export const resetInput = () => ({
  type: RESET_INPUT
});
export const toggleCheck = () => ({
  type: TOGGLE_CHECK
});

// export const updateDeltaV = update => ({
//   type: UPDATE_DELTAV,
//   payload: update
// });
// export const updateSpecificImpulse = update => ({
//   type: UPDATE_SPECIFICIMPULSE,
//   payload: update
// });
export const updateDataRocket = update => ({
  type: UPDATE_DATA_ROCKET,
  payload: update
});
export const updateDataBallistic = update => ({
  type: UPDATE_DATA_BALLISTIC,
  payload: update
});
export const updateMaximum = update => ({
  type: UPDATE_MAXIMUM,
  payload: update
});
export const updateRoot = update => ({
  type: UPDATE_ROOT,
  payload: update
});
