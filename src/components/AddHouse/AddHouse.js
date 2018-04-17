import React from 'react';
import {reducer as reduxFormReducer} from 'redux-form';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {
  StyledError,
  StyledInput,
  CenterRow,
  StyledTextArea,
  Status,
  Error
} from '../Styled';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import axios from 'axios';
import {CircularProgress} from 'material-ui/Progress';
import {connect} from 'react-redux';

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
    <CenterRow>
      <StyledInput
        width="80%"
        margin="4px 0"
        placeholder={label}
        {...input}
        type={type}
      />
      <FontAwesome style={{margin: 'auto'}} name="times" onClick={remove} />
    </CenterRow>
    {touched && error && <Error error={error} />}
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
            label={`advantage #${index + 1}`}
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
    {error && <Error error={error} />}
  </Ul>
);

const PriceAndCurrency = ({input, meta: {touched, error}}) => (
  <div>
    <StyledInput margin="4px 0" placeholder="price" {...input} />
    {touched && error && <Error error={error} />}
  </div>
);

const Address = ({input, meta: {touched, error}}) => (
  <div>
    <StyledInput margin="8px 0" placeholder="address" {...input} />
    {touched && error && <Error error={error} />}
  </div>
);

const Description = ({input, meta: {touched, error}}) => (
  <div>
    <StyledTextArea margin="10px 0" placeholder="description" {...input} />
    {touched && error && <Error error={error} />}
  </div>
);

const status = (state = 'normal', action) => {
  switch (action.type) {
    case 'change_status':
      return action.status;
    default:
      return state;
  }
};

let AddHouseForm = props => {
  const {handleSubmit, submitting} = props;
  return (
    <form onSubmit={handleSubmit}>
      <h1 style={{textAlign: 'center', margin: '40px 0'}}>
        Here you can add your house
      </h1>
      <Grid>
        <div
          style={{
            padding: '30px 40px',
            boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 30px'
          }}
        >
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
            <Col md={12}>
              <CenterRow>
                <Status normalMessage="add house" />
              </CenterRow>
            </Col>
          </Row>
        </div>
      </Grid>
      <div style={{margin: '30px 0'}} />
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

const asyncValidate = ({address}) => {
  if (address) {
    const formattedAddress = address.split(' ').join('+');
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=AIzaSyAPgp2up9kVOEq2H1wBDhmSS4EmHGdssbw`;
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (
          !(
            data.status === 'OK' &&
            data.results.length === 1 &&
            data.results[0].types.includes('street_address')
          )
        )
          throw {address: 'this is not an address'};
      });
  } else return new Promise((res, rej) => rej());
};

AddHouseForm = reduxForm({
  form: 'addHouse',
  validate,
  asyncValidate
})(AddHouseForm);

const reducer = combineReducers({
  status,
  form: reduxFormReducer
});
const store = createStore(reducer);

const onSubmit = values => {
  store.dispatch({type: 'change_status', status: 'pending'});
  axios
    .post('http://localhost:3030/add-house', values)
    .then(res => {
      switch (res.data) {
        case 'success':
          store.dispatch({
            type: 'change_status',
            status: 'success'
          });
          break;
        default:
          break;
      }
    })
    .catch(() =>
      store.dispatch({type: 'change_status', status: 'network_error'})
    );
};

const AddHouse = () => (
  <Provider store={store}>
    <AddHouseForm onSubmit={onSubmit} />
  </Provider>
);

export default AddHouse;
