import React from 'react';
import rootReducer from '../../reducers/search';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import Search from './Search';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
store.dispatch({
  type: 'SETUP_RATING',
  setup: {
    min: 1,
    max: 5,
    step: 1
  }
});
store.dispatch({
  type: 'SETUP_PRICE',
  setup: {
    min: 1,
    max: 2000,
    step: 10
  }
});
store.dispatch({
  type: 'CHANGE_RATING_FILTER_VALUES',
  values: [1, 5]
});
store.dispatch({
  type: 'CHANGE_PRICE_FILTER_VALUES',
  values: [1, 2000]
});
export default () => (
  <Provider store={store}>
    <Search />
  </Provider>
);
