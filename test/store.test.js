import 'jsdom-global/register';
import { expect } from 'chai';
import * as redux from 'redux';
import configureStore, {middleware} from '@store';
import sinon from 'sinon';

import reducer from '@reducers';

describe('redux store', () => {
  it('should be a function', () => {
    expect(typeof configureStore).to.equal('function');
  });

  const store = configureStore();
  it('should have getState function', () => {
    expect(typeof store.getState).to.equal('function');
  });

  it('should have dispatch function', () => {
    expect(typeof store.dispatch).to.equal('function');
  });

  it('should have replaceReducer function', () => {
    expect(typeof store.replaceReducer).to.equal('function');
  });

  it('should have subscribe function', () => {
    expect(typeof store.subscribe).to.equal('function');
  });

  it('should call replaceReducer if module.hot', () => {
  });

  afterEach(() => {
    if (redux.createStore.restore)
      redux.createStore.restore();
  });
});