import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import {Grid} from 'react-bootstrap';
import faker from 'faker';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';
import axios from 'axios';
import {getCookie} from '../../cookies';

const makeRequest = () => {
  const {request, price, rating} = store.getState().filter;
  console.log(store.getState().filter);
  axios
    .get(
      `http://localhost:3030/search?q=${request}&minprice=${
        price.min
      }&maxprice=${price.max}&minrating=${rating.min}&maxrating=${rating.max}`
    )
    .then(data => {
      if (data.status === 200)
        store.dispatch({type: 'change_list', results: data.data});
      else
        store.dispatch({
          type: 'change_list',
          results: []
        });
    })
    .catch(error => console.log(error));
};

const error = (state = '', action) => {
  switch (action.type) {
    case 'error_occured':
      return action.error;
    default:
      return state;
  }
};

const filterReducer = (
  state = {
    request: '',
    price: {
      min: 0,
      max: 2000
    },
    rating: {
      min: 0,
      max: 5
    }
  },
  action
) => {
  switch (action.type) {
    case 'change_price':
      setTimeout(() => makeRequest(), 0);
      return {
        ...state,
        price: {
          min: action.min,
          max: action.max
        }
      };
    case 'change_rating':
      setTimeout(() => makeRequest(), 0);
      return {
        ...state,
        rating: {
          min: action.min,
          max: action.max
        }
      };

    case 'change_request':
      setTimeout(() => makeRequest(), 0);

      return {...state, request: action.request};

    default:
      return state;
  }
};

const resultsReducer = (state = [], action) => {
  switch (action.type) {
    case 'toggle_liked_flag':
      console.log(state);
      return state.map(
        result =>
          result.id === action.id
            ? {...result, isLiked: !result.isLiked}
            : result
      );
    case 'update_list':
      return [...state, ...action.results];
    case 'change_list':
      return [...action.results];
    default:
      return state;
  }
};

const session = (
  state = {loginStatus: 'not_logged_in', username: ''},
  action
) => {
  switch (action.type) {
    case 'login':
      return {username: action.username, loginStatus: 'logged_in'};
    case 'logout':
      return {username: '', loginStatus: 'not_logged_in'};
    default:
      return state;
  }
};

const superReducer = combineReducers({
  results: resultsReducer,
  filter: filterReducer,
  session,
  error
});
const store = createStore(
  superReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
class Search extends React.Component {
  componentDidMount() {
    makeRequest();
    const userid = getCookie('userid');
    if (userid)
      axios
        .get('http://localhost:3030/getUser?_id=' + userid)
        .then(res =>
          store.dispatch({type: 'login', username: res.data.username})
        );
  }

  render() {
    return (
      <Provider store={store}>
        <Grid>
          <SearchBar />
          <SearchResults />
        </Grid>
      </Provider>
    );
  }
}

export default Search;
