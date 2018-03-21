import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {StyledError, StyledInput, Center, CenterRow} from '../Styled';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import {CircularProgress} from 'material-ui/Progress';
import {connect} from 'react-redux';

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
  <div>
    <StyledInput
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

let Status = ({status}) => {
  switch (status) {
    case 'normal':
      return (
        <Button type="submit" bsStyle="primary">
          login
        </Button>
      );
    case 'pending':
      return <CircularProgress />;
    case 'success':
      return (
        <Button type="submit" disabled={true} bsStyle="success">
          your logged in
        </Button>
      );
    case 'network_error':
      return (
        <Button type="submit" bsStyle="danger">
          error occured. try again
        </Button>
      );
    case 'incorrect_pair':
      return (
        <div>
          <Button type="submit" bsStyle="primary">
            login
          </Button>
          <StyledError>the wrong username/password pair</StyledError>
        </div>
      );
    default:
      return null;
  }
};
Status = connect(({status}) => {
  return {status: status.signIn};
})(Status);

let SignIn = props => {
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
                  label="password"
                  name="password"
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

      <Center height="100vh" />
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
