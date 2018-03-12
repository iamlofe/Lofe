import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {StyledInput, StyledError, Center} from '../Styled';
import {Button} from 'react-bootstrap';

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

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
  <div>
    <StyledInput
      {...input}
      margin="10px auto"
      width="30%"
      placeholder={label}
      type={type}
    />
    {touched && error && <StyledError>{error}</StyledError>}
  </div>
);

let SignUp = props => {
  const {handleSubmit, submitting} = props;
  return (
    <form onSubmit={handleSubmit}>
      <Center>
        <Field
          label="username"
          name="username"
          component={renderField}
          type="text"
        />
        <Field
          label="email"
          name="email"
          component={renderField}
          type="email"
        />
        <Field
          label="password"
          name="password"
          component={renderField}
          type="password"
        />
        <Field
          label="confirm password"
          name="confirmPassword"
          component={renderField}
          type="password"
        />
        <LoginButton disabled={submitting} text="register" />
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
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords should be equal';
  }
  return errors;
};

SignUp = reduxForm({
  form: 'signUp',
  validate
})(SignUp);

export default SignUp;
