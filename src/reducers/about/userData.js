const userData = (state = {isLoggedIn: false, username: ''}, action) => {
  switch (action.type) {
    case LOG_IN:
      return {isLoggedIn: true, username: action.username};
    case LOG_OUT:
      return {isLoggedIn: false, username: ''};
    default:
      return state;
  }
};

export default userData;
