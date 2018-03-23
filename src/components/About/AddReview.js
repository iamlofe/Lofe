import React from 'react';
import {reducer as reduxFormReducer, Field, reduxForm} from 'redux-form';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import {StyledInput, StyledTextArea, StyledError} from '../Styled';
import {Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import {CircularProgress} from 'material-ui/Progress';

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
    case 'fail':
      return (
        <Button type="submit" bsStyle="danger">
          error occured. try again
        </Button>
      );
    default:
      return null;
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
            <Field name="review" component={Review} />
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

const makeRequest = (id, values) => {
  const data = {
    id,
    values
  };
  store.dispatch({type: 'change_status', status: 'pending'});
  axios
    .post('http://localhost:3030/add-review', data)
    .then(res => {
      let status = res === 'ok' ? 'success' : 'fail';
      store.dispatch({type: 'change_status', status});
    })
    .catch(() => store.dispatch({type: 'change_status', status: 'fail'}));
};

const status = (state = 'normal', action) => {
  switch (action.type) {
    case 'change_status':
      return action.status;
    default:
      return state;
  }
};

const reducer = combineReducers({
  status,
  form: reduxFormReducer
});
const store = createStore(reducer);

const AddReview = ({id, addToList}) => (
  <Provider store={store}>
    <Form
      onSubmit={values => {
        addToList(values);
        makeRequest(id, values);
      }}
    />
  </Provider>
);

export default AddReview;
