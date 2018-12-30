import { expect } from 'chai';
import { Map } from 'immutable';
import User from '@models/User';

import isUserAuthenticated from '@selectors/isUserAuthenticated';

describe('isUserAuthenticated', () => {
  it('should return true if user and user.jwt is set', () => {
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

    expect( isUserAuthenticated(state) ).to.be.true;
  });

  it('should return false if user is not set', () => {
    const state = {
      users: Map({
        'current': null
      })
    };

    expect( isUserAuthenticated(state) ).to.be.false;
  });

  it('should return false if user.jwt is not set', () => {
    const state = {
      users: Map({
        'current': new User
      })
    };

    expect( isUserAuthenticated(state) ).to.be.false;
  });
});