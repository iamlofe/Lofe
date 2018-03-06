import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {
  Row,
  Grid,
  Col,
  Button,
  DropdownButton,
  MenuItem,
  Clearfix,
  ButtonToolbar,
  ButtonGroup
} from 'react-bootstrap';
import faker from 'faker';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';

const filterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'change_price':
      return {
        ...state,
        price: {
          min: action.min,
          max: action.max
        }
      };
    case 'change_rating':
      return {
        ...state,
        rating: {
          min: action.min,
          max: action.max
        }
      };
    case 'change_distance':
      return {
        ...state,
        distance: {
          min: action.min,
          max: action.max
        }
      };
    case 'change_request':
      return {...state, request: action.request};

    default:
      return state;
  }
};

const resultsReducer = (state = [], action) => {
  switch (action.type) {
    case 'toggle_liked_flag':
      //makeRequestToDB();
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

const superReducer = combineReducers({
  results: resultsReducer,
  filter: filterReducer
});
const store = createStore(superReducer);
store.subscribe(() => console.log(store.getState())); //todo post
class Search extends React.Component {
  componentDidMount() {
    //there will be fetch
    const data = [];
    for (let i = 0; i < 5; i++) {
      data.push({
        link: 'https://instagram.com/annayatsuta',
        price: faker.random.number(2000, 3000),
        description: faker.random.words(10),
        rating: faker.random.number({min: 3, max: 5, precision: 3}),
        isLiked: faker.random.boolean(),
        image: faker.image.city(),
        currency: 'usd',
        id: i
      });
    }
    store.dispatch({type: 'change_list', results: data});
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
