import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {StyledInput, StyledError, CenterRow} from '../Styled';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import {CircularProgress} from 'material-ui/Progress';
import {connect} from 'react-redux';

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
  <div>
    <StyledInput
      {...input}
      margin="10px auto"
      placeholder={label}
      type={type}
    />
    {touched && error && <StyledError>{error}</StyledError>}
  </div>
);

let Status = ({status}) => {
  switch (status) {
    case 'normal':
      return (
        <Button type="submit" bsStyle="primary">
          register
        </Button>
      );
    case 'pending':
      return <CircularProgress />;
    case 'success':
      return (
        <Button type="submit" disabled={true} bsStyle="success">
          you have rigistered
        </Button>
      );
    case 'network_error':
      return (
        <Button type="submit" bsStyle="danger">
          network error occured. try again
        </Button>
      );
    case 'user_already_exists':
      return (
        <div>
          <Button type="submit" bsStyle="primary">
            register
          </Button>
          <StyledError>user with such username already exists</StyledError>
        </div>
      );
    default:
      return null;
  }
};
Status = connect(({status}) => {
  return {status: status.signUp};
})(Status);

let SignUp = props => {
  const {handleSubmit, submitting} = props;
  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Row>
          <Col md={4} className="offset-md-4">
            <Row>
              <Col md={12}>
                <Field
                  label="username"
                  name="username"
                  component={renderField}
                  type="text"
                />
              </Col>
              <Col md={12}>
                <Field
                  label="email"
                  name="email"
                  component={renderField}
                  type="email"
                />
              </Col>
              <Col md={12}>
                <Field
                  label="password"
                  name="password"
                  component={renderField}
                  type="password"
                />
              </Col>
              <Col md={12}>
                <Field
                  label="confirm password"
                  name="confirmPassword"
                  component={renderField}
                  type="password"
                />
              </Col>
              <Col md={12}>
                <CenterRow justifyContent="center">
                  <Status />
                </CenterRow>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
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
