import { createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';

import reducer from '@reducers';

import usersSaga from '@sagas/users';

import {localState, saveState} from './localStorage';


const sagaMiddleware = createSagaMiddleware();
export const history = createHistory();
export const middleware = applyMiddleware(
  routerMiddleware(history),
  sagaMiddleware
);

export default function configureStore() {

  const persistedState = localState();
  const store = createStore(connectRouter(history)(reducer), persistedState, middleware);

  /* istanbul ignore if */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      window.localStorage.setItem('giveworthy_dev_key', store.getState());
      const nextReducer = require('./reducers/index');
      store.replaceReducer(nextReducer);
    });
  }
  store.subscribe(() => {
    saveState(store.getState());
  })
  sagaMiddleware.run(usersSaga);

  return store;
}
