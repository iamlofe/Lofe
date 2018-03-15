import React from 'react';
import {
  reducer as reduxFormReducer,
  Field,
  FieldArray,
  reduxForm
} from 'redux-form';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {StyledInput, StyledTextArea, StyledError, Point} from '../Styled';
import {Row, Grid, Col, Button} from 'react-bootstrap';

const Review = ({input, meta: {touched, error}}) => (
  <div>
    <StyledTextArea margin="10px 0" placeholder="review" {...input} />
    {touched && error && <StyledError>{error}</StyledError>}
  </div>
);

const AddPoint = ({input, fields, meta: {touched, error}}) => (
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
);

let Form = ({handleSubmit, submitting}) => (
  <Grid>
    <form onSubmit={handleSubmit}>
      <Row>
        <Col md={4}>
          <FieldArray name="advantages" component={AddPoint} />
          <FieldArray name="disadvantages" component={AddPoint} />
        </Col>
        <Col md={8}>
          <Field name="review" component={Review} />
        </Col>
      </Row>
    </form>
  </Grid>
);

const validate = ({review, advantages, disadvantages}) => {
  const errors = {};
  if (!review) errors.review = 'Why are you adding a blank review?';
  else if (review.length > 300)
    errors.review = 'We have also copied some twitter features)';
  if (advantages) {
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
  }
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

export const component = () => (
  <Provider store={store}>
    <Form onSubmit={values => console.log(values)} />
  </Provider>
);
