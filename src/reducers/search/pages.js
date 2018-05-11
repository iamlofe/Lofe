const pagesInitialState = {
  currentPage: 1,
  totalPages: 0
};

const pages = (state = pagesInitialState, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_PAGE':
      return {...state, currentPage: action.page};
    case 'FETCH_HOUSES_SUCCESS':
      return {currentPage: 1, totalPages: action.totalPages};
    default:
      return state;
  }
};

export default pages;

export const getCurrentPage = state => state.currentPage;
export const getTotalPages = state => state.totalPages;
