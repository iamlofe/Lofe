import axios from 'axios';

export const addReview = ({review, userid, id, rating}) => {
  return dispatch => {
    axios
      .get(`http://localhost:3030/getUser?_id=${userid}`)
      .then(({data}) => {
        const {username} = data;
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
            console.log(username);
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
