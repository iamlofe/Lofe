import axios from 'axios';
import {getCookie} from '../cookies';

export const addReview = ({review, userid, id, rating}) => {
  return dispatch => {
    axios
      .get(`http://localhost:3030/getUser?_id=${userid}`)
      .then(({data}) => {
        const {username} = data;
        const object = {
          ...review,
          id,
          rating,
          username
        };
        console.log(object);
        axios
          .post('http://localhost:3030/createComment', {
            ...review,
            id,
            rating,
            username
          })
          .then(res => {
            if (res.status === 200) {
              dispatch({type: 'add_review', review});
              dispatch({type: 'change_status', status: 'success'});
            } else {
              dispatch({type: 'change_status', status: res.status});
            }
          })
          .catch(() => {
            dispatch({
              type: 'add_review',
              review: {...review, rating, username}
            });
            dispatch({type: 'change_status', status: 'fail'});
          });
      })
      .catch(() => {
        window.location.replace('http://localhost:3000/login');
      });
  };
};

export const getWishList = session => {
  return dispatch => {
    axios
      .post('http://localhost:3030/getWishList', {session})
      .then(({data}) => dispatch({type: 'data_loaded', data}))
      .catch(() =>
        dispatch({type: 'add_error', error: 'no internet connection'})
      );
  };
};

export const removeFromWishList = id => {
  return dispatch => {
    console.log(id);
    axios
      .post('http://localhost:3030/removeFromWishList', {
        houseId: id,
        session: getCookie('userid')
      })
      .then(() => dispatch({type: 'remove_completely', id}))
      .catch(() => dispatch({type: 'remove_completely', id}));
  };
};

export const getHouses = ({request, price, rating}) => dispatch => {
  axios
    .get(
      `http://localhost:3030/search?q=${request}&minprice=${
        price.min
      }&maxprice=${price.max}&minrating=${rating.min}&maxrating=${rating.max}`
    )
    .then(data => {
      if (data.status === 200)
        dispatch({type: 'change_list', results: data.data});
      else
        dispatch({
          type: 'change_list',
          results: []
        });
    })
    .catch(error => console.log(error));
};
