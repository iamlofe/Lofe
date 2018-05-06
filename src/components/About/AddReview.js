import React from 'react';
import {reducer as reduxFormReducer, Field, reduxForm} from 'redux-form';
import {
  StyledInput,
  StyledTextArea,
  StyledError,
  CenterRow,
  Rating,
  Status
} from '../Styled';
import {Row, Col, Button} from 'react-bootstrap';

const FormRating = ({onRatingChange, rating}) => (
  <Rating
    isSelectable={true}
    rating={rating}
    centered={true}
    onChange={onRatingChange}
  />
);

const Description = ({input, meta: {touched, error}}) => (
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
            <Field name="description" component={Description} />
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
            <Button type="submit">hello</Button>
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

const AddReview = props => (
  <div>
    <FormRating {...props} />
    <Form {...props} />
  </div>
);

export default AddReview;
