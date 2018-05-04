import {combineReducers} from 'redux';
import form from './form';
import content from './content';
import error from './error';

const rootReducer = combineReducers({
  form,
  content,
  error
});

export default rootReducer;
