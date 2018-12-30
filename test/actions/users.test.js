import { Map } from 'immutable';
import { expect } from 'chai';

import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USERS,
  SET_CURRENT_USER,
  CHANGE_USER_ROLE,
  ADD_USER_AFFILIATED_ORG,
  REMOVE_USER_AFFILIATED_ORG,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  LOGIN_USER,

  addUsers,
  setCurrentUser,
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailure,
  changeUserRole,
  addUserAffiliatedOrg,
  removeUserAffiliatedOrg,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  loginUser
} from '@actions/users';

describe('user actions', () => {
  it('should do addUsers correctly', () => {
    const userMap = Map({
      id: '123',
      data: 'data'
    });
    
    expect(addUsers(Map(userMap))).to.deep.equal({
      type: 'ADD_USERS',
      payload: userMap
    });
  });

  it('should do setCurrentUser correctly', () => {
    const id = '123';

    expect(setCurrentUser(id)).to.deep.equal({
      type: 'SET_CURRENT_USER',
      id
    });
  });

  it('should do fetchUsers correctly', () => {
    expect(fetchUsers()).to.deep.equal({
      type: 'FETCH_USERS'
    });
  });

  it('should do fetchUsersSuccess correctly', () => {
    const payload = {data: 'data'};
    expect(fetchUsersSuccess(payload)).to.deep.equal({
      type: 'FETCH_USERS_SUCCESS',
      payload
    });
  });

  it('should do fetchUsersFailure correctly', () => {
    const error = 'myError';
    expect(fetchUsersFailure(error)).to.deep.equal({
      type: 'FETCH_USERS_FAILURE', 
      error
    });
  });

  it('should do changeUserRole correctly', () => {
    const id = '123';
    const role = 1;
    expect(changeUserRole(id, role)).to.deep.equal({
      type: 'CHANGE_USER_ROLE',
      id,
      role
    });
  });

  it('should do addUserAffiliatedOrg correctly', () => {
    const id = '123';
    const affiliatedOrgId = '234';
    expect(addUserAffiliatedOrg(id, affiliatedOrgId)).to.deep.equal({
      type: 'ADD_USER_AFFILIATED_ORG',
      id,
      affiliatedOrgId
    });
  });

  it('should do removeUserAffiliatedOrg correctly', () => {
    const id = '123';
    const affiliatedOrgId = '234';
    expect(removeUserAffiliatedOrg(id, affiliatedOrgId)).to.deep.equal({
      type: 'REMOVE_USER_AFFILIATED_ORG',
      id,
      affiliatedOrgId
    });
  });

  it('should do updateUser correctly', () => {
    const id = '123';
    const payload = {data: 'data'};
    expect(updateUser(id, payload)).to.deep.equal({
      type: 'UPDATE_USER',
      id,
      payload
    });
  });

  it('should do updateUserSuccess correctly', () => {
    expect(updateUserSuccess()).to.deep.equal({
      type: 'UPDATE_USER_SUCCESS'
    });
  });

  it('should do updateUserFailure correctly', () => {
    const error = 'error';
    expect(updateUserFailure(error)).to.deep.equal({
      type: 'UPDATE_USER_FAILURE',
      error
    });
  });

  it('should do loginUser correctly', () => {
    const email = 'austin@bitbuild.com';
    const token = '123';

    expect(loginUser(email, token)).to.deep.equal({
      type: 'LOGIN_USER',
      email,
      token
    });
  });
});