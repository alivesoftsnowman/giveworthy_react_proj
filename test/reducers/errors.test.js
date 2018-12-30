import { expect, use } from 'chai';
import chaiImmutable from 'chai-immutable';
use(chaiImmutable);

import {
  SET_ERROR,
  DISMISS_ERROR
} from '@actions/errors';
import errorsReducer, { initialState } from '@reducers/errors';

describe('errors reducer initialState', () => {
  it('should have the correct keys', () => {
    expect(initialState).to.have.keys(['error', 'dismissedError']);
  });

  it('should set error to null', () => {
    expect(initialState.get('error')).to.be.null;
  });

  it('should set dismissed error to null', () => {
    expect(initialState.get('dismissedError')).to.be.null;
  });
});

describe('errors reducer', () => {
  it('should return initialState', () => {
    expect(errorsReducer(undefined, {type: '@@INIT'})).to.deep.equal(initialState);
  });

  it('should handle SET_ERROR', () => {
    const preState = initialState.set('error', 'Original Error');

    const expectedResult = preState.set('error', 'My Error').set('dismissedError', 'Original Error');

    expect(errorsReducer(preState, {
      type: SET_ERROR,
      error: 'My Error'
    })).to.deep.equal(expectedResult);
  });

  it('should handle DISMISS_ERROR', () => {
    const preState = initialState.set('dismissedError', 'Dismissed Error').set('error', 'Error');

    const expectedResult = preState.set('dismissedError', 'Error').set('error', null);

    expect(errorsReducer(preState, {
      type: DISMISS_ERROR
    })).to.deep.equal(expectedResult);
  });
});