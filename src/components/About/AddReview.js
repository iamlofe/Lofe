import React from 'react';
import {reducer as reduxFormReducer, Field, reduxForm} from 'redux-form';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import {
  StyledInput,
  StyledTextArea,
  StyledError,
  CenterRow,
  Rating,
  Status
} from '../Styled';
import {Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import {getCookie} from '../../cookies';
import {addReview} from '../../actions/asyncactions';

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
            <Status normalMessage="add review" />
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
  <Rating
    isSelectable={true}
    rating={rating}
    centered={true}
    onChange={onChange}
  />
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
        if (rating) addReview({review: values, id, rating});
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
      addReview: ({review, rating, id}) => {
        if (getCookie('userid')) {
          const params = {
            userid: getCookie('userid'),
            review,
            rating,
            id
          };
          dispatch(addReview(params));
        } else window.location.replace('http://localhost:3000/login');
      },
      askToPickRating: () =>
        dispatch({type: 'change_status', status: 'pick_the_rating'}),
      dispatch
    };
  }
)(AddReview);

export default AddReview;
