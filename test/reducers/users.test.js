import 'jsdom-global/register';
import { expect, use } from 'chai';
import Immutable, {Map, List} from 'immutable';
import chaiImmutable from 'chai-immutable';
import UsersReducer, {initialState} from '@reducers/users';
import User from '@models/User';
import {
  ADD_USER_AFFILIATED_ORG,
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  ADD_USERS,
  CHANGE_USER_ROLE,
  SET_CURRENT_USER
} from '@actions/users';

use(chaiImmutable);


describe('users reducer initial state', () => {
  it('should have the right keys', () => {
    expect(initialState).to.have.keys(['users', 'isLoading', 'current']);
  });

  it('should set users key to empty Map', () => {
    expect(Immutable.is(initialState.get('users'), Map())).to.be.true;
  });

  it('should set isLoading to false', () => {
    expect(initialState.get('isLoading')).to.be.false;
  });

  it('should set current to an empty User record', () => {
    expect(Immutable.is(initialState.get('current'), new User)).to.be.true;
  });
});

describe('users reducer', () => {
  it('should be a function', () => {
    expect(typeof UsersReducer).to.equal('function');
  });

  it('should handle initialState', () => {
    expect(UsersReducer(initialState, {type: '@@INIT'})).to.deep.equal(initialState);
  });

  it('should handle FETCH_USERS', () => {
    const expectedResult = initialState.set(
      'isLoading', true
    );

    expect(UsersReducer(initialState, {
      type: FETCH_USERS
    })).to.deep.equal(expectedResult);
  });

  it('should handle FETCH_USERS_FAILURE', () => {
    const preState = initialState.set(
      'isLoading', true
    );

    const expectedResult = preState.set(
      'isLoading', false
    );

    expect(UsersReducer(preState, {
      type: FETCH_USERS_FAILURE
    })).to.deep.equal(expectedResult);
  });

  it('should handle FETCH_USERS_SUCCESS', () => {
    const preState = initialState.set(
      'isLoading', true
    );

    const expectedResult = preState.set(
      'isLoading', false
    );

    expect(UsersReducer(preState, {
      type: FETCH_USERS_SUCCESS
    })).to.deep.equal(expectedResult);
  });

  it('should handle ADD_USERS', () => {
    const preState = initialState.set(
      'users', Map({1: '1', 2: '2', 3: '3'})
    );

    const payload = Map({2: '22', 4: '4', 5: '5'});

    const expectedResult = preState.updateIn(['users'], users => users.merge(payload));
    expect(UsersReducer(preState, {
      type: ADD_USERS,
      payload
    })).to.deep.equal(expectedResult);
  });

  it('should handle CHANGE_USER_ROLE', () => {
    const preState = initialState.set(
      'users', Map({'123': new User({role: 1})})
    );

    const expectedResult = preState.updateIn(['users', '123'], user => user.set('role', 2));

    expect(UsersReducer(preState, {
      type: CHANGE_USER_ROLE,
      id: '123',
      role: 2
    })).to.deep.equal(expectedResult);
  });

  it('should throw on CHANGE_USER_ROLE if path is incorrect', () => {
    const preState = initialState;

    const expectedResult = preState;

    expect(UsersReducer.bind(preState, {
      type: CHANGE_USER_ROLE,
      id: '123',
      role: 2
    })).to.throw();
  });

  it('should return state on CHANGE_USER_ROLE if path is incorrect', () => {
    const preState = initialState;

    const expectedResult = preState;

    expect(UsersReducer(preState, {
      type: CHANGE_USER_ROLE,
      id: '123',
      role: 2
    })).to.deep.equal(expectedResult);
  });

  it('should handle ADD_USER_AFFILIATED_ORG when no affiliatedOrgs exist', () => {
    const preState = initialState.set(
      'users', Map({'123': new User})
    );

    const affiliatedOrgs = List(['234'])

    const expectedResult = preState.updateIn(['users', '123'], user => user.set('affiliatedOrgs', affiliatedOrgs));

    expect(UsersReducer(preState, {
      type: ADD_USER_AFFILIATED_ORG,
      id: '123',
      affiliatedOrgId: '234'
    })).to.deep.equal(expectedResult);
  });

  it('should handle ADD_USER_AFFILIATED_ORG when affiliatedOrgs exist', () => {
    const preState = initialState.set(
      'users', Map({'123': new User({
        'affiliatedOrgs': List(['234'])
      })})
    );

    const affiliatedOrgs = List(['234', '345']);

    const expectedResult = preState.updateIn(['users', '123'], user => user.set('affiliatedOrgs', affiliatedOrgs));

    expect(UsersReducer(preState, {
      type: ADD_USER_AFFILIATED_ORG,
      id: '123',
      affiliatedOrgId: '345'
    })).to.deep.equal(expectedResult);
  });

  it('should not add duplicates on ADD_USER_AFFILIATED_ORG', () => {
    const preState = initialState.set(
      'users', Map({'123': new User({
        'affiliatedOrgs': List(['234'])
      })})
    );

    const affiliatedOrgs = List(['234']);

    const expectedResult = preState.updateIn(['users', '123'], user => user.set('affiliatedOrgs', affiliatedOrgs));

    expect(UsersReducer(preState, {
      type: ADD_USER_AFFILIATED_ORG,
      id: '123',
      affiliatedOrgId: '234'
    })).to.deep.equal(expectedResult);
  });

  it('should throw on non-existent path on ADD_USER_AFFILIATED_ORG', () => {
    const preState = initialState;

    expect(UsersReducer.bind(preState, {
      type: ADD_USER_AFFILIATED_ORG,
      id: '123',
      affiliatedOrgId: '234'
    })).to.throw();
  });

  it('should return state on non-existent path on ADD_USER_AFFILIATED_ORG', () => {
    const preState = initialState;

    const expectedResult = preState;

    expect(UsersReducer(preState, {
      type: ADD_USER_AFFILIATED_ORG,
      id: '123',
      affiliatedOrgId: '234'
    })).to.deep.equal(expectedResult);
  });

  it('should handle SET_CURRENT_USER', () => {
    const newUser =  User.fromJS({
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
    
    const preState = initialState.set('users', Map({
      '123': newUser
    }));

    const expectedResult = preState.set('current', newUser);

    expect(UsersReducer(preState, {
      type: SET_CURRENT_USER,
      id: '123'
    })).to.deep.equal(expectedResult);
  });

  it('should handle SET_CURRENT_USER if user does not exist', () => {
    const preState = initialState;

    const expectedResult = preState;

    expect(UsersReducer(preState, {
      type: SET_CURRENT_USER,
      id: '123'
    })).to.deep.equal(expectedResult);
  });
});