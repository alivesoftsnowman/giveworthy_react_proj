import { Map } from 'immutable';
import {
  SET_ERROR, DISMISS_ERROR
} from '@actions/errors';

export const initialState = Map({
  error: null,
  dismissedError: null
});

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return state
        .set('dismissedError', state.get('error'))
        .set('error', action.error);

    case DISMISS_ERROR:
      return state
        .set('dismissedError', state.get('error'))
        .set('error', null);

    default:
      return state;
  }
}