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
import {getRating} from '../../reducers/about';
import {Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import {getCookie} from '../../cookies';
import urls from '../../routes';

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

const chageRating = rating => ({
  type: 'CHANGE_RATING',
  rating
});

let FormRating = ({chageRating, rating}) => (
  <Rating
    isSelectable={true}
    rating={rating}
    centered={true}
    onChange={chageRating}
  />
);
FormRating = connect(
  state => ({
    rating: getRating(state)
  }),
  dispatch => ({
    chageRating: rating => dispatch(chageRating(rating))
  })
)(Rating);

let AddReview = ({onSubmit}) => (
  <div>
    <FormRating />
    <Form onSubmit={onSubmit} />
  </div>
);

const addReview = review => ({
  type: 'ADD_REVIEW',
  review
});

AddReview = connect(null, (dispatch, ownProps) => {
  return {
    onSubmit: values => (dispatch, getState) => {
      const rating = getRating(getState());
      if (rating === 0) return;
      const data = {
        ...values,
        houseId: ownProps.match.params.id,
        rating,
        session: getCookie('userid')
      };
      console.log(data);
      axios
        .post(urls.review.post.createReview(data))
        .then(review => dispatch(addReview(review)));
    }
  };
})(AddReview);

export default AddReview;
