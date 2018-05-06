import {combineReducers} from 'redux';

const info = (
  state = {
    fetching: false,
    error: ''
  },
  action
) => {
  switch (action.type) {
    case 'FETCH_INFO':
      return {...state, fetching: true};
    case 'FETCH_INFO_SUCCESS':
      return {error: '', fetching: false};
    case 'FETCH_INFO_FAILURE':
      return {fetching: false, error: action.error};
    default:
      return state;
  }
};

const reviews = (
  state = {
    fetching: false,
    error: ''
  },
  action
) => {
  switch (action.type) {
    case 'FETCH_REVIEWS':
      return {...state, fetching: true};
    case 'FETCH_REVIEWS_SUCCESS':
      return {error: '', fetching: false};
    case 'FETCH_REVIEWS_FAILURE':
      return {fetching: false, error: action.error};
    default:
      return state;
  }
};

const formState = {
  abilityToAddReviews: false,
  fetching: false,
  message: '',
  visibility: false
};

const form = (state = formState, action) => {
  switch (action.type) {
    case 'LET_ADD_REVIEWS':
      return {...state, abilityToAddReviews: true};
    case 'OPEN_FORM':
      return {...state, visibility: true};
    case 'CLOSE_FORM':
      return {...state, visibility: false};
    case 'SEND_FORM':
      return {...state, fetching: true};
    case 'SEND_FORM_SUCCESS':
      return {...state, visibility: false, message: 'review has been added'};
    case 'SEND_FORM_FAILURE':
      return {...state, message: action.error};
    default:
      return state;
  }
};

const status = combineReducers({
  info,
  reviews,
  form
});

export default status;

export const getInfoStatus = state => state.info;
export const getReviewsStatus = state => state.reviews;
export const getFormStatus = state => state.form;
