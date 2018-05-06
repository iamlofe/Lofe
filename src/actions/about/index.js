import axios from 'axios';
import urls from '../../routes';
import {getReviewIds, getRating} from '../../reducers/about';
import {getCookie} from '../../cookies';

export const fetchInfo = id => (dispatch, getState) => {
  dispatch({type: 'FETCH_INFO'});
  return axios
    .get(urls.house.get.houseBasicInfo(id))
    .then(response => response.data[0])
    .then(
      response => dispatch({type: 'FETCH_INFO_SUCCESS', response}),
      error => dispatch({type: 'FETCH_INFO_FAILURE', error: error.message})
    );
};

export const fetchReviews = () => (dispatch, getState) => {
  dispatch({type: 'FETCH_REVIEWS'});
  const reviewIds = getReviewIds(getState());
  const reviewPromises = reviewIds.map(id =>
    axios.get(urls.review.get.reviewBasicInfo(id))
  );
  Promise.all(reviewPromises)
    .then(response => response.map(review => review.data))
    .then(response =>
      dispatch({
        type: 'FETCH_REVIEWS_SUCCESS',
        response
      })
    )
    .then(() => console.log(getState()));
};

export const letAddReviews = () => dispatch => {
  axios
    .post(urls.user.post.userExists(), {session: getCookie('userid')})
    .then(({data}) => {
      if (data === true) dispatch({type: 'LET_ADD_REVIEWS'});
    });
};

export const changeRating = rating => ({
  type: 'CHANGE_RATING',
  rating
});

export const addReview = review => ({
  type: 'ADD_REVIEW',
  review
});

export const onSubmit = (values, houseId) => (dispatch, getState) => {
  console.log('submit', values);
  const rating = getRating(getState());
  if (rating === 0) return;
  const data = {
    ...values,
    houseId,
    rating,
    session: getCookie('userid')
  };
  console.log(data);
  axios
    .post(urls.review.post.createReview(data))
    .then(review => dispatch(addReview(review)));
};
