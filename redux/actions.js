// Action Types
export const UPDATE_VELOCITY = 'UPDATE_VELOCITY';
export const UPDATE_ANGLE = 'UPDATE_ANGLE';
export const UPDATE_HEIGHT = 'UPDATE_HEIGHT';
export const UPDATE_GRAVITATION = 'UPDATE_GRAVITATION';
export const RESET_INPUT = 'RESET_INPUT';

// Action Creators
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
export const updateGravitation = update => ({
  type: UPDATE_GRAVITATION,
  payload: update
});
export const resetInput = () => ({
  type: RESET_INPUT
});
