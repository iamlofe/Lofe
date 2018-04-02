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
          houseId: id,
          rating,
          username
        };
        axios
          .post('http://localhost:3030/addReview', object)
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
      .post('http://localhost:3030/getWishList', {session})
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
      .post('http://localhost:3030/removeFromWishList', {
        houseId: id,
        session: getCookie('userid')
      })
      .then(() => dispatch({type: 'remove_completely', id}))
      .catch(e => console.log(e));
  };
};

export const getHouses = ({request, price, rating, session}) => dispatch => {
  axios
    .get(
      `http://localhost:3030/search?q=${request}&minprice=${
        price.min
      }&maxprice=${price.max}&minrating=${rating.min}&maxrating=${rating.max}`
    )
    .catch(() =>
      dispatch({
        type: 'change_status',
        status: 'show_message',
        message: 'server error'
      })
    )
    .then(data => {
      if (data.status === 200) {
        return data.data.map(item => {
          return {...item, image: item.images[0], isLiked: false, id: item._id};
        });
      }
    })
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
      if (!session) {
        dispatch({type: 'change_list', results: data});
        dispatch({type: 'change_status', status: 'display'});
        return new Promise((res, rej) => rej('not logged in'));
      }
      return data;
    })
    .then(data => {
      const ids = data.map(item => item.id);
      axios
        .post('http://localhost:3030/getFilteredWishList', {
          session,
          ids
        })
        .then(({data}) => data)
        .then(likedIds => {
          const filteredData = data.map(
            item =>
              likedIds.includes(item.id) ? {...item, isLiked: true} : item
          );
          dispatch({type: 'change_list', results: filteredData});
          dispatch({type: 'change_status', status: 'display'});
        });
    })
    .catch(error => console.log(error));
};

export const getAbout = id => dispatch => {
  axios
    .get('http://localhost:3030/about?_id=' + id)
    .then(res => {
      if (res.status === 200) dispatch({type: 'data_loaded', data: res.data});
      else
        dispatch({
          type: 'add_error',
          error: (res.data && res.data.status) || 'other error'
        });
    })
    .catch(error => console.log(error));
};

export const like = ({session, id, isLiked}) => dispatch => {
  const data = {session, houseId: id};
  if (isLiked) {
    axios
      .post('http://localhost:3030/removeFromWishList', data)
      .then(({data}) => {
        if (data === 'success') dispatch({type: 'toggle_liked_flag', id});
      });
  } else {
    axios.post('http://localhost:3030/addToWishList', data).then(({data}) => {
      if (data === 'success') dispatch({type: 'toggle_liked_flag', id});
    });
  }
};
