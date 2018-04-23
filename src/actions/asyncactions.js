import axios from 'axios';
import {getCookie} from '../cookies';
import urls from '../routes';

export const addReview = ({review, userid, id, rating}) => {
  return dispatch => {
    axios
      .get(urls.user.get.userBasicInfo(userid))
      .then(({data}) => {
        const {username} = data;
        const object = {
          ...review,
          houseId: id,
          rating,
          username
        };
        axios
          .post(urls.house.post.addReview(), object)
          .then(res => {
            if (res.status === 200) {
              dispatch({type: 'add_review', review});
              dispatch({type: 'change_status', status: 'success'});
            } else {
              dispatch({type: 'change_status', status: res.status});
            }
          })
          .catch(() => {
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
      .post(urls.user.post.wishList(), {session})
      .then(({data}) =>
        data.map(item => {
          return {...item, image: item.images[0], id: item._id};
        })
      )
      .then(data => dispatch({type: 'data_loaded', data}))
      .catch(() =>
        dispatch({type: 'add_error', error: 'no internet connection'})
      );
  };
};

export const removeFromWishList = id => {
  return dispatch => {
    axios
      .post(urls.user.post.removeFromWishList(), {id})
      .then(() => dispatch({type: 'remove_completely', id}))
      .catch(e => console.log(e));
  };
};

export const getHouses = ({request, price, rating, page}) => dispatch => {
  axios
    .post(urls.house.post.search({q: request, price, rating, page}))
    .catch(() =>
      dispatch({
        type: 'change_status',
        status: 'show_message',
        message: 'server error'
      })
    )
    .then(({data}) => data)
    .then(data => {
      if (!data.length) {
        console.log('it is here');
        dispatch({
          type: 'change_status',
          status: 'show_message',
          message: 'No matches. Try another request'
        });
        return new Promise((res, rej) => rej('no matches'));
      }
      return data;
    })
    .then(data => {
      dispatch({type: 'change_list', results: data});
      dispatch({type: 'change_page', page});
      dispatch({type: 'change_status', status: 'display'});
    })
    .catch(error => console.log(error));
};

export const getAbout = id => dispatch => {
  axios
    .get(urls.house.get.houseBasicInfo(id))
    .then(res => {
      if (res.status === 200) {
        console.log(res.data);
        dispatch({type: 'data_loaded', data: res.data[0]});
      } else
        dispatch({
          type: 'add_error',
          error: (res.data && res.data.status) || 'other error'
        });
    })
    .catch(error => console.log(error));
};

export const like = ({id, isLiked}) => dispatch => {
  if (isLiked) {
    console.log(urls.user.post.removeFromWishList());
    axios.post(urls.user.post.removeFromWishList(), {id}).then(({data}) => {
      if (data === 'success') dispatch({type: 'toggle_liked_flag', id});
    });
  } else {
    console.log(urls.user.post.addToWishList());
    axios.post(urls.user.post.addToWishList(), {id}).then(({data}) => {
      if (data === 'success') dispatch({type: 'toggle_liked_flag', id});
    });
  }
};
