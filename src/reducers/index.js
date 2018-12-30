import { combineReducers } from 'redux';

import users from '@reducers/users';
import errors from '@reducers/errors';
import questionnaires from '@reducers/questionnaires';
import status from '@reducers/status';
import cause from '@reducers/cause';
console.log(JSON.stringify(users));
export const reducers = {
  users,
  errors,
  questionnaires,
  status,
  cause
};

export default combineReducers(reducers);