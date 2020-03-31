// Action Types
export const UPDATE_VELOCITY = 'UPDATE_VELOCITY';
export const UPDATE_HEIGHT = 'UPDATE_HEIGHT';
export const UPDATE_GRAVITY = 'UPDATE_GRAVITY';
export const UPDATE_FINALMASS = 'UPDATE_FINALMASS';
export const UPDATE_INITIALMASS = 'UPDATE_INITIALMASS';
export const UPDATE_EXHAUSTVELOCITY = 'UPDATE_EXHAUSTVELOCITY';
export const UPDATE_MASSFLOWRATE = 'UPDATE_MASSFLOWRATE';
export const RESET_INPUT = 'RESET_INPUT';
export const TOGGLE_CHECK = 'TOGGLE_CHECK';
export const UPDATE_DATA_VELOCITY = 'UPDATE_DATA_VELOCITY';
export const UPDATE_DATA_HEIGHT = 'UPDATE_DATA_HEIGHT';
export const UPDATE_MAXIMUM = 'UPDATE_MAXIMUM';
export const UPDATE_MINIMUM = 'UPDATE_MINIMUM';
export const UPDATE_TIME = 'UPDATE_TIME';

// Action Creator
export const updateVelocity = update => ({
  type: UPDATE_VELOCITY,
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
export const updateDataVelocity = update => ({
  type: UPDATE_DATA_VELOCITY,
  payload: update
});
export const updateDataHeight = update => ({
  type: UPDATE_DATA_HEIGHT,
  payload: update
});
export const updateMaximum = update => ({
  type: UPDATE_MAXIMUM,
  payload: update
});
export const updateMinimum = update => ({
  type: UPDATE_MINIMUM,
  payload: update
});
export const updateTime = update => ({
  type: UPDATE_TIME,
  payload: update
});
