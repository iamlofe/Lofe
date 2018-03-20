import React from 'react';
import {reducer as reduxFormReducer, Field, reduxForm} from 'redux-form';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {StyledInput, StyledTextArea, StyledError} from '../Styled';
import {Row, Col, Button} from 'react-bootstrap';

const Review = ({input, meta: {touched, error}}) => (
  <div>
    <StyledTextArea margin="10px 0" placeholder="review" {...input} />
    {touched && error && <StyledError>{error}</StyledError>}
  </div>
);

/*const AddPoint = ({input, fields, meta: {touched, error}}) => (
  <div>
    {fields.map((point, index) => (
      <Field
        remove={() => fields.remove(index)}
        name={point}
        component={Point}
      />
    ))}
    <Button style={{margin: '10px 0'}} onClick={() => fields.push()}>
      Add
    </Button>
  </div>
);*/

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
        <Field name="review" component={Review} />
      </Col>
    </Row>
    <Row>
      <Col md={5} className="offset-md-1">
        <Field name="advantages" placeholder="advantages" component={Point} />
      </Col>
      <Col md={5}>
        <Field
          name="disadvantages"
          placeholder="disadvantages"
          component={Point}
        />
      </Col>
      <Col md={11}>
        <Button type="submit" style={{float: 'right'}} bsStyle="primary">
          add review
        </Button>
      </Col>
    </Row>
  </form>
);

const validate = ({review, advantages, disadvantages}) => {
  const errors = {};
  if (!review) errors.review = 'Why are you adding a blank review?';
  else if (review.length > 300)
    errors.review = 'We have also copied some twitter features)';
  /*if (advantages) {
    const advantagesErrors = [];
    advantages.forEach(
      (advantage, index) =>
        (advantagesErrors[index] = advantage ? '' : 'type smth')
    );
    errors.advantages = advantagesErrors;
  }
  if (disadvantages) {
    const disadvantagesErrors = [];
    disadvantages.forEach(
      (disadvantage, index) =>
        (disadvantagesErrors[index] = disadvantage ? '' : 'beggin you')
    );
    errors.disadvantages = disadvantagesErrors;
  }*/
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

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
});
const store = createStore(reducer);

const AddReview = () => (
  <Provider store={store}>
    <Form onSubmit={values => console.log(values)} />
  </Provider>
);

export default AddReview;
