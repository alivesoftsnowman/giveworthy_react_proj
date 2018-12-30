import { Map } from 'immutable';
import Cause from '@models/Cause';
import {
  ADD_CAUSE, DEL_CAUSE, UPDATE_CAUSE
} from '@actions/cause';


export const initialState = Map({
  cause: new Cause,
});

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CAUSE:
       return state
        .set('cause', action.payload)
    case DEL_CAUSE:
      return state
      .set('cause', null);
    case UPDATE_CAUSE:
      return state
        .update('cause', cause=>cause.set(action.key, action.value));
    default:
      return state;
  }
}