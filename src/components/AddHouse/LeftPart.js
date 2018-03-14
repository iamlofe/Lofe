/*import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import {StyledInput, StyledTextArea} from '../Styled';

let CurrencyButton = ({dispatch, currency, active}) => (
  <Button
    bsStyle={active ? 'primary' : 'default'}
    onClick={() => dispatch({type: 'change_currency', currency})}
  >
    {currency}
  </Button>
);
CurrencyButton = connect(
  (state, props) => {
    return {
      active: state.form.currency === props.currency
    };
  },
  dispatch => {
    return {dispatch};
  }
)(CurrencyButton);



const Input = ({dispatch, type}) => (
  <StyledInput
    placeholder={type}
    onChange={e => dispatch({type: `change_${type}`, value: e.target.value})}
  />
);

const TextArea = ({dispatch, type}) => (
  <StyledTextArea
    placeholder={type}
    onChange={e => dispatch({type: `change_${type}`, value: e.target.value})}
  />
);

const InputContainer = connect()(Input);
const Description = connect()(TextArea);

const LeftPart = () => (
  <Col md={6}>
    <PriceAndCurrency />
    <InputContainer type="address" />
    <Description type="description" />
  </Col>
);

export default LeftPart;*/
import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {Provider} from 'react-redux';
import {StyledError, StyledInput, CenterRow, StyledTextArea} from '../Styled';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const Advantages = ({fields, meta: {error}}) => (
  <ul>
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
      <button
        type="button"
        disabled={fields.length >= 5}
        onClick={() => fields.push()}
      >
        Add advantage
      </button>
    </li>
    {fields.length >= 5 && <StyledError>No more</StyledError>}
  </ul>
);

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
      {touched && error && <span>{error}</span>}
    </div>
  </div>
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

let LeftPart = props => {
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
          <button type="submit" disabled={submitting}>
            Submit
          </button>
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
    if (advantages.length >= 5) errors.advantages._error = 'too much';
  }
  return errors;
};

LeftPart = reduxForm({
  form: 'advantages',
  validate
})(LeftPart);

export default LeftPart;
