import React from 'react';
import {reducer as reduxFormReducer, Field, reduxForm} from 'redux-form';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import {
  StyledInput,
  StyledTextArea,
  StyledError,
  CenterRow,
  Rating
} from '../Styled';
import {Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import {CircularProgress} from 'material-ui/Progress';
import {getCookie} from '../../cookies';

const Review = ({input, meta: {touched, error}}) => (
  <div>
    <StyledTextArea margin="10px 0" placeholder="review" {...input} />
    {touched && error && <StyledError>{error}</StyledError>}
  </div>
);

const Point = ({placeholder, input, meta: {touched, error}}) => (
  <div>
    <StyledInput
      style={{color: placeholder === 'advantages' ? 'green' : 'red'}}
      placeholder={placeholder}
      margin="10px 0"
      {...input}
    />
    {touched && error && <StyledError>{error}</StyledError>}
  </div>
);

let Status = ({status}) => {
  switch (status) {
    case 'normal':
      return (
        <Button type="submit" bsStyle="primary">
          add review
        </Button>
      );
    case 'pending':
      return <CircularProgress />;
    case 'success':
      return (
        <Button type="submit" disabled={true} bsStyle="success">
          your review added
        </Button>
      );
    default:
      return (
        <Button type="submit" bsStyle="danger">
          {status.split('_').join(' ')}
        </Button>
      );
  }
};
Status = connect(({status}) => {
  return {status};
})(Status);

let Form = ({handleSubmit, submitting}) => (
  <form onSubmit={handleSubmit}>
    <Row>
      <Col md={10} className="offset-md-1">
        <Row>
          <Col md={12}>
            <Field name="description" component={Review} />
          </Col>
          <Col md={6}>
            <Field
              name="advantages"
              placeholder="advantages"
              component={Point}
            />
          </Col>
          <Col md={6}>
            <Field
              name="disadvantages"
              placeholder="disadvantages"
              component={Point}
            />
          </Col>
          <Col md={12}>
            <Status />
          </Col>
        </Row>
      </Col>
    </Row>
  </form>
);

const validate = ({review, advantages, disadvantages}) => {
  const errors = {};
  if (!review) errors.review = 'Why are you adding a blank review?';
  else if (review.length > 300)
    errors.review = 'We have also copied some twitter features)';
  if (advantages)
    if (advantages.length > 40) errors.advantages = 'too much letters';
  if (disadvantages)
    if (disadvantages.length > 40) errors.disadvantages = 'too much letters';
  return errors;
};

Form = reduxForm({
  form: 'reviewForm',
  validate
})(Form);

let FormRating = ({onChange, rating}) => (
  <Rating isSelectable={true} rating={rating} onChange={onChange} />
);
FormRating = connect(
  ({rating}) => {
    return {rating};
  },
  dispatch => {
    return {onChange: rating => dispatch({type: 'change_rating', rating})};
  }
)(Rating);

let AddReview = ({id, addReview, rating, askToPickRating, dispatch}) => (
  <div>
    <FormRating />
    <Form
      onSubmit={values => {
        if (rating) addReview(values, id, rating);
        else askToPickRating();
      }}
    />
  </div>
);
AddReview = connect(
  ({about, rating}) => {
    return {rating, id: about.id, formDisabled: about.formDisabled};
  },
  dispatch => {
    return {
      addReview: (review, id, rating) => {
        const session = getCookie('userid');
        if (session) {
          dispatch({type: 'change_status', status: 'pending'});
          axios.get('http://localhost:3030/userExists?session');
          axios
            .post('http://localhost:3030/', {
              ...review,
              id,
              rating
            })
            .then(res => {
              if (res.status === 200) {
                dispatch({type: 'add_review', review});
                dispatch({type: 'change_status', status: 'success'});
              }
            })
            .catch(() => {
              console.log(review, id);
              dispatch({type: 'add_review', review: {...review, rating}});
              dispatch({type: 'change_status', status: 'fail'});
              dispatch({type: 'disable_form'});
            });
        } else {
          window.location.replace('http://localhost:3000');
        }
      },
      askToPickRating: () =>
        dispatch({type: 'change_status', status: 'pick_the_rating'}),
      dispatch
    };
  }
)(AddReview);

export default AddReview;
