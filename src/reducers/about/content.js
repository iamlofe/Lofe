import {combineReducers} from 'redux';
import {RECIEVE_INFO, ADD_REVIEW} from '../../actions/actionTypes';
const initialInfoState = {
  description: '',
  advantages: [],
  price: '',
  coords: {}
};

const info = (state = initialInfoState, action) => {
  switch (action.type) {
    case RECIEVE_INFO:
      return action.response;
    default:
      return state;
  }
};

const reviews = (state = [], action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return [...state, action.review];
    default:
      return state;
  }
};

const content = combineReducers({
  reviews,
  info
});

export default content;
export const getReviews = state => state.reviews;
export const getInfo = state => state.info;
