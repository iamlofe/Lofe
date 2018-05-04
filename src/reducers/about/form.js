import {combineReducers} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import {DISABLE_FORM, ENABLE_FORM} from '../../actions/actionTypes';

const rating = (state = 0, action) =>
  action.type === 'CHANGE_RATING' ? action.rating : state;

const formStatus = (state = true, action) => {
  switch (action.type) {
    case DISABLE_FORM:
      return false;
    case ENABLE_FORM:
      return true;
    default:
      return state;
  }
};

export default reduxFormReducer;

export const getRating = state => state.rating;
