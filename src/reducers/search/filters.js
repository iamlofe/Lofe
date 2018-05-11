import {combineReducers} from 'redux';

const createFilterWithDiapazon = filter => {
  const setup = (state = {min: 0, max: 100, step: 10}, action) => {
    switch (action.type) {
      case 'SETUP_' + filter.toUpperCase():
        return action.setup;
      default:
        return state;
    }
  };
  const values = (state = [0, 100], action) => {
    switch (action.type) {
      case `CHANGE_${filter.toUpperCase()}_FILTER_VALUES`:
        return action.values;
      default:
        return state;
    }
  };
  return combineReducers({
    setup,
    values
  });
};

const query = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_QUERY_FILTER_VALUES':
      return action.values;
    default:
      return state;
  }
};

export default combineReducers({
  query,
  rating: createFilterWithDiapazon('rating'),
  price: createFilterWithDiapazon('price')
});

export const getValues = (state, filter) => {
  if (filter === 'query') return state.query;
  return state[filter].values;
};
export const getSetup = (state, filter) => state[filter].setup;
