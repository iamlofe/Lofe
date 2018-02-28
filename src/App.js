import React, {Component} from 'react';
import AddHouse from './components/AddHouse';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

let nextAdvantageId = 0;

const advantages = (state = [], action) => {
  switch (action.type) {
    case 'add_advantage':
      return [...state, {id: nextAdvantageId++, text: action.text}];
    case 'remove_advantage':
      return state.filter(advantage => advantage.id !== action.id);
    default:
      return state;
  }
};

const address = (state = '', action) => {
  switch (action.type) {
    case 'change_address':
      return action.value;
    default:
      return state;
  }
};

const price = (state = '', action) => {
  switch (action.type) {
    case 'change_price':
      return action.value;
    default:
      return state;
  }
};

const description = (state = '', action) => {
  switch (action.type) {
    case 'change_description':
      return action.value;
    default:
      return state;
  }
};

const currency = (state = 'EUR', action) => {
  switch (action.type) {
    case 'change_currency':
      return action.currency;
    default:
      return state;
  }
};

const superReducer = combineReducers({
  advantages,
  price,
  address,
  description,
  currency
});
const store = createStore(superReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AddHouse />
      </Provider>
    );
  }
}

export default App;
