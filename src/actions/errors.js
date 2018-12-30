export const SET_ERROR = 'SET_ERROR';
export const DISMISS_ERROR = 'DISMISS_ERROR';

export const setError = error => ({
  type: SET_ERROR,
  error
});

export const dismissError = () => ({
  type: DISMISS_ERROR
});