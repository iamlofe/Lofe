import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {Field, reduxForm} from 'redux-form';
import {Provider} from 'react-redux';
import {StyledError, StyledInput, Center} from '../Styled';
import {Button} from 'react-bootstrap';

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
  <div>
    <StyledInput
      width="30%"
      margin="10px auto"
      {...input}
      placeholder={label}
      type={type}
    />
    {touched && error && <StyledError>{error}</StyledError>}
  </div>
);

let LoginButton = ({onClick, disabled, text}) => (
  <Button
    type="submit"
    style={{margin: '40px auto'}}
    onClick={onClick}
    disabled={disabled}
    bsStyle="primary"
  >
    {text}
  </Button>
);

let SignIn = props => {
  const {handleSubmit, submitting} = props;
  return (
    <form onSubmit={handleSubmit}>
      <Center height="100vh">
        <Field
          label="username"
          name="username"
          component={renderField}
          type="text"
        />
        <Field
          label="password"
          name="password"
          component={renderField}
          type="password"
        />
        <LoginButton disabled={submitting} text="login" />
      </Center>
    </form>
  );
};

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 10) {
    errors.username = 'Must be 10 characters or less';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

SignIn = reduxForm({
  form: 'signIn',
  validate
})(SignIn);

export default SignIn;
