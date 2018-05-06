import {combineReducers} from 'redux';
import {RECIEVE_INFO, ADD_REVIEW} from '../../actions/actionTypes';
const initialInfoState = {
  description: '',
  advantages: [],
  price: '',
  coords: {},
  reviewIds: []
};

const info = (state = initialInfoState, action) => {
  switch (action.type) {
    case 'FETCH_INFO_SUCCESS':
      return {
        ...action.response,
        reviewIds: action.response.reviews,
        coords: {
          lat: action.response.coords.lat - '',
          lng: action.response.coords.lng - ''
        }
      };
    default:
      return state;
  }
};

const reviews = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_REVIEWS_SUCCESS':
      return action.response;
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
export const getReviewIds = state => state.info.reviewIds;
export const getReviews = state => state.reviews;
export const getInfo = state => state.info;
