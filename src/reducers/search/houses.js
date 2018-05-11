const houses = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_HOUSES_SUCCESS':
      return {1: action.response};
    case 'FETCH_PAGE_OF_HOUSES_SUCCESS':
      return {...state, [action.page]: action.response};
    default:
      return state;
  }
};

export default houses;

export const getHousesByPage = (state, page) => state[page];
