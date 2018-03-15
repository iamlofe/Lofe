import React from 'react';
import {render} from 'react-dom';
import {reducer as reduxFormReducer} from 'redux-form';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {StyledError, StyledInput, CenterRow, StyledTextArea} from '../Styled';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    margin: 0;
    padding: 0;
  }
`;

const Advantage = ({input, remove, label, type, meta: {touched, error}}) => (
  <div>
    <div>
      <CenterRow>
        <StyledInput
          width="80%"
          margin="10px 0"
          placeholder={label}
          {...input}
          type={type}
        />
        <FontAwesome style={{margin: 'auto'}} name="times" onClick={remove} />
      </CenterRow>
      {touched && error && <StyledError>{error}</StyledError>}
    </div>
  </div>
);

const Advantages = ({fields, meta: {error}}) => (
  <Ul>
    {fields &&
      fields.map((advantage, index) => (
        <li key={index}>
          <Field
            name={advantage}
            type="text"
            component={Advantage}
            remove={() => fields.remove(index)}
            label={`Advantage #${index + 1}`}
          />
        </li>
      ))}
    <li>
      <CenterRow>
        <Button
          style={{margin: '10px auto'}}
          type="button"
          onClick={() => fields.push()}
        >
          Add advantage
        </Button>
      </CenterRow>
    </li>
    {error && <StyledError>{error}</StyledError>}
  </Ul>
);

const PriceAndCurrency = ({input, meta: {touched, error}}) => (
  <div>
    <StyledInput margin="10px 0" placeholder="price" {...input} />
    {touched && error && <StyledError>{error}</StyledError>}
  </div>
);

const Address = ({input, meta: {touched, error}}) => (
  <div>
    <StyledInput margin="10px 0" placeholder="address" {...input} />
    {touched && error && <StyledError>{error}</StyledError>}
  </div>
);

const Description = ({input, meta: {touched, error}}) => (
  <div>
    <StyledTextArea margin="10px 0" placeholder="description" {...input} />
    {touched && error && <StyledError>{error}</StyledError>}
  </div>
);

let AddHouseForm = props => {
  const {handleSubmit, submitting} = props;
  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Row>
          <Col md={6}>
            <Field name="price" component={PriceAndCurrency} />
            <Field name="address" component={Address} />
            <Field name="description" component={Description} />
          </Col>
          <Col md={6}>
            <FieldArray name="advantages" component={Advantages} />
          </Col>
        </Row>
        <Row>
          <CenterRow>
            <Button
              style={{margin: '10px auto'}}
              type="submit"
              disabled={submitting}
            >
              Submit
            </Button>
          </CenterRow>
        </Row>
      </Grid>
    </form>
  );
};

const validate = ({advantages, price, description, address}) => {
  const errors = {};
  if (!address) errors.address = 'We are not CIA, please add the address';
  else if (address.length > 30) errors.address = 'Is it address?';
  if (!price) errors.price = 'Required';
  else if (!Number.isInteger(price - 0))
    errors.price = 'Price should be in numerals';
  else if (price.length > 10) errors.price = 'Be a bit more modest, sir';
  if (!description) errors.description = 'You would better write something';
  else if (description.length > 300)
    errors.description = 'It is not a twitter, but try to use less symbols';
  if (advantages) {
    const advantageErrors = [];
    advantages.forEach((advantage, advantageIndex) => {
      if (!advantage) {
        advantageErrors[advantageIndex] =
          'Oh, please, type anything or click the cross';
      }
    });
    errors.advantages = advantageErrors;
    if (advantages.length > 5)
      errors.advantages._error = 'only five advantages allowed';
  }
  return errors;
};

AddHouseForm = reduxForm({
  form: 'addHouse',
  validate
})(AddHouseForm);

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
});
const store = createStore(reducer);

const AddHouse = () => (
  <Provider store={store}>
    <AddHouseForm onSubmit={values => console.log(values)} />
  </Provider>
);

export default AddHouse;
