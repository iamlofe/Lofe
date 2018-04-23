const baseUrl = 'http://localhost:3030';
const userPrefix = baseUrl + '/user';
const housePrefix = baseUrl + '/house';
const reviewPrefix = baseUrl + '/review';

const urls = {
  house: {
    get: {
      houseBasicInfo: houseId => `${housePrefix}/${houseId}`,
      houseReviews: houseId => `${housePrefix}/${houseId}/reviews`
    },
    post: {
      search: ({q, rating, price, page}) =>
        `${housePrefix}/search?q=${q}&minprice=${price.min}&maxprice=${
          price.max
        }&minrating=${rating.min}&maxrating=${rating.max}&page=${page}`,
      addReview: houseId => `${housePrefix}/addReview`,
      order: houseId => `${housePrefix}/${houseId}/order`,
      addToWishList: houseId => `${housePrefix}/${houseId}/addToWishList`
    }
  },
  review: {
    get: {
      reviewBasicInfo: reviewId => `${reviewPrefix}/${reviewId}`
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
