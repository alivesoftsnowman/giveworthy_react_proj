import { expect } from 'chai';

import {
  setError,
  dismissError
} from '@actions/errors';

describe('errors actions', () => {
  it('should generate SET_ERROR', () => {
    expect(setError('my error')).to.deep.equal({
      type: 'SET_ERROR',
      error: 'my error'
    });
  });

  it('should generate DISMISS_ERROR', () => {
    expect(dismissError()).to.deep.equal({
      type: 'DISMISS_ERROR'
    });
  });
});