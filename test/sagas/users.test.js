import { call, put, select, takeLatest } from 'redux-saga/effects';
import { expect } from 'chai';
import { Map } from 'immutable';
import { push } from 'connected-react-router';

import usersSaga, { sagaLogin } from '@sagas/users';
import { login } from '@api';
import User from '@models/User';
import {
  LOGIN_USER,

  addUsers,
  setCurrentUser
} from '@actions/users';

import {
  setError,
  dismissError
} from '@actions/errors';

import getLocation from '@selectors/getLocation';
import { get } from 'http';

describe('usersSaga', () => {
  it('should yield sagaLogin on USER_LOGIN', () => {
    const saga = usersSaga();

    expect(saga.next().value).to.deep.equal(takeLatest(LOGIN_USER, sagaLogin));
  });
});

describe('sagaLogin', () => {
  const action = {
    type: LOGIN_USER,
    email: 'austin.d.benesh@gmail.com',
    token: 'asdf'
  };

  it('should yield effect call with correct params', () => {
    const saga = sagaLogin(action);
    expect(saga.next().value).to.deep.equal(call(login, action.email, action.token));
  });

  it('should yield effect put(addUsers) with correct params', () => {
    const saga = sagaLogin(action);
    saga.next();

    const id = "449f555d-372a-46b5-9e35-db9c3dbe6f0c";

    const _user = {
      id,
      gender: "male",
      affiliatedOrgs: [],
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnZW5kZXIiOiJtYWxlIiwiYWZmaWxpYXRlZE9yZ3MiOltdLCJnaXZlbk5hbWUiOiJBdXN0aW4iLCJ1cGRhdGVkQXQiOjE1Mjc3ODg3NzAsImZhbWlseU5hbWUiOiJCZW5lc2giLCJyb2xlIjoyLCJkb2IiOjYyNDQ5OTIwMCwiaWQiOiI0NDlmNTU1ZC0zNzJhLTQ2YjUtOWUzNS1kYjljM2RiZTZmMGMiLCJjcmVhdGVkQXQiOjE1Mjc3ODg3NzAsImVtYWlsIjoiYXVzdGluLmQuYmVuZXNoQGdtYWlsLmNvbSIsImlhdCI6MTUyNzg3MjU4Mn0.VFg3kUMKvrCjTYZEdE-wG-EtngFmIIpfbaLodwkIwFY",
      givenName: "Austin",
      updatedAt: 1527788770,
      familyName: "Benesh",
      role: 2,
      dob: 624499200,
      createdAt: 1527788770,
      email: "austin.d.benesh@gmail.com"
    };
    
    const user = User.fromJS(_user);

    const payload = Map({
      [id]: user
    });

    expect(saga.next(_user).value).to.deep.equal(put(addUsers(payload)));
  });

  it('should yield effect put(setCurrentUser) with correct params', () => {
    const saga = sagaLogin(action);

    const id = "449f555d-372a-46b5-9e35-db9c3dbe6f0c";

    const _user = {
      id,
      gender: "male",
      affiliatedOrgs: [],
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnZW5kZXIiOiJtYWxlIiwiYWZmaWxpYXRlZE9yZ3MiOltdLCJnaXZlbk5hbWUiOiJBdXN0aW4iLCJ1cGRhdGVkQXQiOjE1Mjc3ODg3NzAsImZhbWlseU5hbWUiOiJCZW5lc2giLCJyb2xlIjoyLCJkb2IiOjYyNDQ5OTIwMCwiaWQiOiI0NDlmNTU1ZC0zNzJhLTQ2YjUtOWUzNS1kYjljM2RiZTZmMGMiLCJjcmVhdGVkQXQiOjE1Mjc3ODg3NzAsImVtYWlsIjoiYXVzdGluLmQuYmVuZXNoQGdtYWlsLmNvbSIsImlhdCI6MTUyNzg3MjU4Mn0.VFg3kUMKvrCjTYZEdE-wG-EtngFmIIpfbaLodwkIwFY",
      givenName: "Austin",
      updatedAt: 1527788770,
      familyName: "Benesh",
      role: 2,
      dob: 624499200,
      createdAt: 1527788770,
      email: "austin.d.benesh@gmail.com"
    };

    saga.next().value;
    saga.next(_user);

    expect(saga.next().value).to.deep.equal(put(setCurrentUser(id)));
  });

  it('should yield select with correct params', () => {
    const saga = sagaLogin(action);

    const id = "449f555d-372a-46b5-9e35-db9c3dbe6f0c";

    const _user = {
      id,
      gender: "male",
      affiliatedOrgs: [],
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnZW5kZXIiOiJtYWxlIiwiYWZmaWxpYXRlZE9yZ3MiOltdLCJnaXZlbk5hbWUiOiJBdXN0aW4iLCJ1cGRhdGVkQXQiOjE1Mjc3ODg3NzAsImZhbWlseU5hbWUiOiJCZW5lc2giLCJyb2xlIjoyLCJkb2IiOjYyNDQ5OTIwMCwiaWQiOiI0NDlmNTU1ZC0zNzJhLTQ2YjUtOWUzNS1kYjljM2RiZTZmMGMiLCJjcmVhdGVkQXQiOjE1Mjc3ODg3NzAsImVtYWlsIjoiYXVzdGluLmQuYmVuZXNoQGdtYWlsLmNvbSIsImlhdCI6MTUyNzg3MjU4Mn0.VFg3kUMKvrCjTYZEdE-wG-EtngFmIIpfbaLodwkIwFY",
      givenName: "Austin",
      updatedAt: 1527788770,
      familyName: "Benesh",
      role: 2,
      dob: 624499200,
      createdAt: 1527788770,
      email: "austin.d.benesh@gmail.com"
    };

    saga.next().value;
    saga.next(_user);
    saga.next().value;

    expect(saga.next().value).to.deep.equal(select(getLocation));
  });

  it('should yield put(push) with correct params (/) if no state exists', () => {
    const saga = sagaLogin(action);

    const id = "449f555d-372a-46b5-9e35-db9c3dbe6f0c";

    const _user = {
      id,
      gender: "male",
      affiliatedOrgs: [],
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnZW5kZXIiOiJtYWxlIiwiYWZmaWxpYXRlZE9yZ3MiOltdLCJnaXZlbk5hbWUiOiJBdXN0aW4iLCJ1cGRhdGVkQXQiOjE1Mjc3ODg3NzAsImZhbWlseU5hbWUiOiJCZW5lc2giLCJyb2xlIjoyLCJkb2IiOjYyNDQ5OTIwMCwiaWQiOiI0NDlmNTU1ZC0zNzJhLTQ2YjUtOWUzNS1kYjljM2RiZTZmMGMiLCJjcmVhdGVkQXQiOjE1Mjc3ODg3NzAsImVtYWlsIjoiYXVzdGluLmQuYmVuZXNoQGdtYWlsLmNvbSIsImlhdCI6MTUyNzg3MjU4Mn0.VFg3kUMKvrCjTYZEdE-wG-EtngFmIIpfbaLodwkIwFY",
      givenName: "Austin",
      updatedAt: 1527788770,
      familyName: "Benesh",
      role: 2,
      dob: 624499200,
      createdAt: 1527788770,
      email: "austin.d.benesh@gmail.com"
    };

    saga.next().value;
    saga.next(_user);
    saga.next().value;
    saga.next().value;

    expect(saga.next({}).value).to.deep.equal(put(push('/dashboard')));
  });

  it('should yield put(push) with correct params (prev state) is state exists', () => {
    const saga = sagaLogin(action);

    const id = "449f555d-372a-46b5-9e35-db9c3dbe6f0c";

    const _user = {
      id,
      gender: "male",
      affiliatedOrgs: [],
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnZW5kZXIiOiJtYWxlIiwiYWZmaWxpYXRlZE9yZ3MiOltdLCJnaXZlbk5hbWUiOiJBdXN0aW4iLCJ1cGRhdGVkQXQiOjE1Mjc3ODg3NzAsImZhbWlseU5hbWUiOiJCZW5lc2giLCJyb2xlIjoyLCJkb2IiOjYyNDQ5OTIwMCwiaWQiOiI0NDlmNTU1ZC0zNzJhLTQ2YjUtOWUzNS1kYjljM2RiZTZmMGMiLCJjcmVhdGVkQXQiOjE1Mjc3ODg3NzAsImVtYWlsIjoiYXVzdGluLmQuYmVuZXNoQGdtYWlsLmNvbSIsImlhdCI6MTUyNzg3MjU4Mn0.VFg3kUMKvrCjTYZEdE-wG-EtngFmIIpfbaLodwkIwFY",
      givenName: "Austin",
      updatedAt: 1527788770,
      familyName: "Benesh",
      role: 2,
      dob: 624499200,
      createdAt: 1527788770,
      email: "austin.d.benesh@gmail.com"
    };

    saga.next().value;
    saga.next(_user);
    saga.next().value;
    saga.next().value;

    const location = {
      state: {
        from: {
          pathname: '/home'
        }
      }
    };

    expect(saga.next(location).value).to.deep.equal(put(push('/home')));
  });

  it('should yield put(dismissError)', () => {
    const saga = sagaLogin(action);

    const id = "449f555d-372a-46b5-9e35-db9c3dbe6f0c";

    const _user = {
      id,
      gender: "male",
      affiliatedOrgs: [],
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnZW5kZXIiOiJtYWxlIiwiYWZmaWxpYXRlZE9yZ3MiOltdLCJnaXZlbk5hbWUiOiJBdXN0aW4iLCJ1cGRhdGVkQXQiOjE1Mjc3ODg3NzAsImZhbWlseU5hbWUiOiJCZW5lc2giLCJyb2xlIjoyLCJkb2IiOjYyNDQ5OTIwMCwiaWQiOiI0NDlmNTU1ZC0zNzJhLTQ2YjUtOWUzNS1kYjljM2RiZTZmMGMiLCJjcmVhdGVkQXQiOjE1Mjc3ODg3NzAsImVtYWlsIjoiYXVzdGluLmQuYmVuZXNoQGdtYWlsLmNvbSIsImlhdCI6MTUyNzg3MjU4Mn0.VFg3kUMKvrCjTYZEdE-wG-EtngFmIIpfbaLodwkIwFY",
      givenName: "Austin",
      updatedAt: 1527788770,
      familyName: "Benesh",
      role: 2,
      dob: 624499200,
      createdAt: 1527788770,
      email: "austin.d.benesh@gmail.com"
    };

    saga.next().value;
    saga.next(_user);
    saga.next().value;
    saga.next().value;
    saga.next().value;

    expect(saga.next().value).to.deep.equal(put(dismissError()));
  });
  
  it('should yield effect put(setError) when error is thrown', () => {
    const saga = sagaLogin(action);

    saga.next().value;
    expect(saga.throw(new Error('error')).value).to.deep.equal(put(setError('Oops! Something went wrong during login.')));
  });
});