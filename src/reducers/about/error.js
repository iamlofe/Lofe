import {ADD_ERROR, REMOVE_ERROR} from '../../actions/actionTypes';

const error = (state = '', action) => {
  switch (action.type) {
    case ADD_ERROR:
      return action.error;
    case REMOVE_ERROR:
      return '';
    default:
      return state;
  }
};

export default error;
