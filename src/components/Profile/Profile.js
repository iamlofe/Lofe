import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import {Provider, connect} from 'react-redux';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {reducer as reduxFormReducer} from 'redux-form';
import Input from 'material-ui';
import {Error} from '../Styled';

const StyledInput = styled.input``;

const StyledLine = styled.div`
  margin: 10px 0;
  .fa {
    margin: auto;
    color: ${props => (props.disabled ? '#000' : '#aaa')};
    float: right;
  }
  input {
    margin: auto;
    border-radius: 1px;
    display: inline-block;
    width: 70%;
    padding: 10px 30px;
    border: 1px solid #aaa;
    transition: all 0.3s ease;
    :focus {
      outline: none;
      transform: translate(0, 1px);
      box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px,
        rgba(0, 0, 0, 0.12) 0px 1px 4px;
    }
    border: 1px solid #fff;
    border-color: ${props => (props.disabled ? '' : '#aaa')};
    background-color: #fff;
  }
`;

class InputLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: props.initialValue ? true : false
    };
  }
  render() {
    const {disabled} = this.state;
    const {
      label,
      input,
      initialValue,
      meta: {touched, error}
    } = this.props;
    return (
      <StyledLine disabled={disabled}>
        <Row>
          <Col md={3}>
            <div style={{display: 'flex', height: '100%'}}>
              <div style={{margin: 'auto 0'}}>{label}:</div>{' '}
            </div>
          </Col>
          <Col md={9}>
            <div style={{display: 'flex'}}>
              <input
                {...input}
                disabled={disabled}
                value={input.value || initialValue}
                placeholder={disabled ? '' : 'fill it, please'}
              />
              <FontAwesome
                name="cog"
                onClick={() => this.setState({disabled: !this.state.disabled})}
              />
            </div>
            {input.value && touched && error && <Error error={error} />}
          </Col>
        </Row>
      </StyledLine>
    );
  }
}

let ProfileForm = props => {
  const {handleSubmit, submitting} = props;
  const {
    initialName,
    initialDate,
    initialPhone,
    initialEmail,
    initialInstagram
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <h1 style={{textAlign: 'center', margin: '40px 0'}}>
        Here you can add your house
      </h1>
      <Grid>
        <Row>
          <Col md={6}>
            <Field
              name="name"
              label="name"
              initialValue={initialName}
              component={InputLine}
            />
            <Field
              name="date"
              label="date"
              initialValue={initialDate}
              component={InputLine}
            />
          </Col>
          <Col md={6}>
            <Field
              name="phone"
              label="phone"
              initialValue={initialPhone}
              component={InputLine}
            />
            <Field
              name="email"
              label="email"
              initialValue={initialEmail}
              component={InputLine}
            />
            <Field
              name="instagram"
              label="instagram"
              initialValue={initialInstagram}
              component={InputLine}
            />
          </Col>
        </Row>
        <Button type="submit" disabled={submitting} bsStyle="success">
          submit
        </Button>
      </Grid>
      <div style={{margin: '30px 0'}} />
    </form>
  );
};

const validate = ({name, date, phone, email, instagram}) => {
  const errors = {};
  if (date && new Date(date) + '' === 'Invalid Date')
    errors.date = 'invalid date';
  if (phone && !/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(phone))
    errors.phone = 'invalid number';
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
    errors.email = 'invalid email';
  return errors;
};

ProfileForm = reduxForm({
  form: 'profile',
  validate
})(ProfileForm);

const rootReducer = combineReducers({
  form: reduxFormReducer
});
const store = createStore(rootReducer);

class Profile extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Grid>
          <Row>
            <Col md={6} />
          </Row>
        </Grid>
      </Provider>
    );
  }
}

store.subscribe(() => console.log(store.getState()));

const component = () => (
  <Provider store={store}>
    <ProfileForm
      initialName="antarid"
      initialInstagram="annayatsuta"
      onSubmit={values => console.log(values)}
    />
  </Provider>
);

export default component;
