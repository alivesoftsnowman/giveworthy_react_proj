import 'babel-polyfill';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { Map } from 'immutable';
import { get } from 'lodash';
import msg from '@assets/i18n/en';
import { login, signup, savecause, fileupload, getCause, saveUserInfo, getCauseStatus } from '@api';
import User from '@models/User';
import Cause from '@models/Cause';
const jwt = require('jsonwebtoken');

import {
  LOGIN_USER,
  SIGNUP_USER,
  addUsers,
  setCurrentUser,
  SAVE_USER_INFO
} from '@actions/users';

import {
  SAVE_CAUSE,
  addCause,
  UPLOAD_FILE
} from '@actions/cause';

import {
  setError,
  dismissError
} from '@actions/errors';
import {setStatus, dismissStatus} from '@actions/status.js';

import getLocation from '@selectors/getLocation';
import { GET_CAUSE_STATUS } from '../actions/cause';



function* sagaLogin(action) {
  try {
    yield put(
      setStatus()
    );
    const res = yield call(login, action.email, action.token);
    if (res.msg==msg.SUCCESS){
      const user = jwt.decode(res.access_token);
      if (user){
        yield put(
          addUsers(Map({
            [user.id]: User.fromJS(user)
          }))
        );
    
        yield put(
          setCurrentUser(user.id)
        );
        
        if (res.newUser){
          yield put(push('/choose-account-type'));
        }else{
          //get Cause if account type is charity
          if (user.type=="charity"){
            const causeRes =  yield call(getCause, user.id);
            if (causeRes.msg == msg.SUCCESS && causeRes.causes.length>0){
              var cause = causeRes.causes[0];
              
              yield put(
                addCause(Cause.fromJS(cause))
              );
            }
          }
          const location = yield select(getLocation);
          if (get(location, ['state', 'from', 'pathname']))
            yield put(push(get(location, ['state', 'from', 'pathname'])));
          else
            yield put(push('/dashboard'));
        }
        

        yield put(dismissError());
      }else{
        yield put(
          setError(res.desc)
        );
      }
    }else{
      yield put(
        setError(res.desc)
      );
    }
    yield put(
      dismissStatus()
    );

  } catch (err) {
    console.error(err);
    yield put(
      setError(msg.LOGIN_NETWORK_ERROR)
    );
  }
}
// saga action for signup

function* sagaSignup(action){

  try {
    yield put(
      setStatus()
    );
    const res = yield call(signup, action.email, action.token);
    
    if (res.msg==msg.SUCCESS){
      const user = jwt.decode(res.access_token);
      if (user){
        yield put(
          addUsers(Map({
            [user.id]: User.fromJS(user)
          }))
        );
    
        yield put(
          setCurrentUser(user.id)
        );
        yield put(push('/choose-account-type'));
        yield put(dismissError());
      }else{
        yield put(
          setError(res.desc)
        );
      }
    }else{
      yield put(
        setError(res.desc)
      );
    }
    yield put(
      dismissStatus()
    );

  } catch (err) {
    console.error(err);
    yield put(
      setError('Oops! Something went wrong during signing up.')
    );
  }
}
function* sagaSaveUser(action){
  try {
    yield put(
      setStatus()
    );
    const res = yield call(saveUserInfo, action.payload);
    yield put(
      dismissStatus()
    );
    if (res.msg!=msg.SUCCESS){
      yield put(
        setError(res.desc)
      );
    }else{
      if (action.redirectUrl)
        yield put(push(action.redirectUrl));
    }
  } catch (err) {
    console.error(err);
    yield put(
      setError('Oops! Something went wrong during saving user.')
    );
  }
}
function* sagaSaveCause(action) {
  try {
    yield put(
      setStatus()
    );
    const res = yield call(savecause, action.payload);
    
    if (res.msg!=msg.SUCCESS){
      yield put(
        setError(res.desc)
      );
    }else{
      if(res.newCause){
        action.payload={};
        action.payload.id = res.id;
        yield put(
          addCause(Cause.fromJS(action.payload))
        );
        
        yield put(push('/charity-questionnarie-step-1'));
      };
      if (res.status)
        action.callback&&action.callback(res.status);
    }
    yield put(
      dismissStatus()
    );

  } catch (err) {
    console.error(err);
    yield put(
      setError('Oops! Something went wrong during saving causes.')
    );
  }
}
function* uploadFile(action) {
  try {
    yield put(
      setStatus()
    );
    const res = yield call(fileupload, action.payload);
    
    if (res.msg!=msg.SUCCESS){
      yield put(
        setError(res.desc)
      );
    }else{
      action.callback(res.link)
    }
    yield put(
      dismissStatus()
    );

  } catch (err) {
    console.error(err);
    yield put(
      setError('Oops! Something went wrong during uploading file.')
    );
  }
}

function* sagaGetCauseStatus(action) {
  try {
    yield put(
      setStatus()
    );
    const res = yield call(getCauseStatus, action.payload);
    
    if (res.msg!=msg.SUCCESS){
      yield put(
        setError(res.msg)
      );
    }else{
      action.callback(res.status)
    }
    yield put(
      dismissStatus()
    );

  } catch (err) {
    console.error(err);
    yield put(
      setError('Oops! Something went wrong during getting cause status.')
    );
  }
}

export default function* usersSaga() {
  yield takeLatest(LOGIN_USER, sagaLogin);
  yield takeLatest(SIGNUP_USER, sagaSignup);
  yield takeLatest(SAVE_CAUSE, sagaSaveCause);
  yield takeLatest(UPLOAD_FILE, uploadFile);
  yield takeLatest(SAVE_USER_INFO, sagaSaveUser);
  yield takeLatest(GET_CAUSE_STATUS, sagaGetCauseStatus);
}


export {
  sagaLogin,
  sagaSignup,
  sagaSaveCause,
  sagaSaveUser,
  sagaGetCauseStatus
};