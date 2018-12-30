import { Map } from 'immutable';
import {
  SET_FETCH, DISMISS_FETCH
} from '@actions/status';

export const initialState = Map({
  active: false,
});

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_FETCH:
      return state
        .set('active', true)

    case DISMISS_FETCH:
      return state
        .set('active',false);
    default:
      return state;
  }
}