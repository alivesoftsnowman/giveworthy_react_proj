import { createSelector } from 'reselect';

import getCurrentUser from '@selectors/getCurrentUser';

export default createSelector(
  getCurrentUser,
  current => !!current && !!current.get('id')
);