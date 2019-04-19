
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import indexReducer from './reducers/indexReducer';

export default createStore(
  indexReducer,
  applyMiddleware(thunk, logger),
);
