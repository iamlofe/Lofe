import {combineReducers} from 'redux';
import form, * as fromForm from './form';
import content, * as fromContent from './content';
import status, * as fromStatus from './status';
import {reducer as reduxFormReducer} from 'redux-form';

const rating = (state = 0, action) =>
  action.type === 'CHANGE_RATING' ? action.rating : state;

const rootReducer = combineReducers({
  rating,
  form: reduxFormReducer,
  content,
  status
});

export default rootReducer;

export const getInfo = state => fromContent.getInfo(state.content);
export const getReviewIds = state => fromContent.getReviewIds(state.content);
export const getReviews = state => fromContent.getReviews(state.content);
export const getRating = state => state.rating;
export const getFormStatus = state => fromStatus.getFormStatus(state.status);
export const getInfoStatus = state => fromStatus.getInfoStatus(state.status);
export const getReviewsStatus = state =>
  fromStatus.getReviewsStatus(state.status);
