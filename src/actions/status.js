export const SET_FETCH= 'SET_FETCH';
export const DISMISS_FETCH = 'DISMISS_FETCH';

export const setStatus = error => ({
  type: SET_FETCH
});

export const dismissStatus = () => ({
  type: DISMISS_FETCH
});