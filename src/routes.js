const baseUrl = 'http://localhost:3030';
const userPrefix = baseUrl + '/user';
const housePrefix = baseUrl + '/house';
const reviewPrefix = baseUrl + '/review';

const urls = {
  house: {
    get: {
      houseBasicInfo: houseId => `${housePrefix}/${houseId}`,
      search: ({query, rating, price, page}) =>
        `${housePrefix}/search?q=${query}&minprice=${price[0]}&maxprice=${
          price[1]
        }&minrating=${rating[0]}&maxrating=${rating[1]}`, //&page=${page}`,
      houseReviews: houseId => `${housePrefix}/${houseId}/reviews`
    },
    post: {
      addReview: houseId => `${housePrefix}/addReview`,
      order: houseId => `${housePrefix}/${houseId}/order`,
      addToWishList: houseId => `${housePrefix}/${houseId}/addToWishList`
    }
  },
  review: {
    get: {
      reviewBasicInfo: reviewId => `${reviewPrefix}/${reviewId}`
    },
    post: {
      createReview: ({session, advantages, disadvantages, description}) =>
        `${reviewPrefix}/create`
    }
  },
  user: {
    get: {
      userBasicInfo: userId => `${userPrefix}/${userId}`,
      usernameExists: username =>
        `${userPrefix}/usernameExists?username=${username}`,
      emailExists: email => `${userPrefix}/emailExists?email=${email}`
    },
    post: {
      userExists: () => `${userPrefix}/userExists`,
      changeProfile: () => `${userPrefix}/changeProfile`,
      wishList: () => `${userPrefix}/getWishList`,
      addToWishList: () => `${userPrefix}/addToWishList`,
      removeFromWishList: () => `${userPrefix}/removeFromWishList`,
      signup: () => `${userPrefix}/signup`,
      signin: () => `${userPrefix}/signin`,
      isLoggedIn: () => `${userPrefix}/isLoggedIn`
    }
  }
};

export default urls;
