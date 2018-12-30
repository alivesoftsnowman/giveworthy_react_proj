import { expect } from 'chai';
import { Map } from 'immutable';
import User from '@models/User';

import getCurrentUser from '@selectors/getCurrentUser';

describe('getCurrentUser', () => {
  it('should return current user from state', () => {
    const newUser =  new User.fromJS({
      id: '123',
      givenName: 'Austin', 
      familyName: 'Benesh',
      email: 'austin.d.benesh@gmail.com',
      gender: 'male',
      dob: 11111,
      role: 2,
      jwt: '234',
      affiliatedOrgs: ['345', '456'],
      createdAt: 22222,
      updatedAt: 22222
    });

    const state = {
      users: Map({
        'current': newUser
      })
    };

    expect( getCurrentUser(state) ).to.deep.equal(newUser);
  });
});