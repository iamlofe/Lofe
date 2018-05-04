import {combineReducers} from 'redux';
import form, * as fromForm from './form';
import content, * as fromContent from './content';
import error from './error';
import {reducer as reduxFormReducer} from 'redux-form';

const rating = (state = 0, action) =>
  action.type === 'CHANGE_RATING' ? action.rating : state;

const rootReducer = combineReducers({
  rating,
  form: reduxFormReducer,
  content,
  error
});

export default rootReducer;

export const getInfo = state => fromContent.getInfo(state.content);
export const getReviewIds = state => fromContent.getReviewIds(state.content);
export const getReviews = state => fromContent.getReviews(state.content);
export const getRating = state => state.rating;
