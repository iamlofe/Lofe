import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import {Provider, connect} from 'react-redux';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {reducer as reduxFormReducer} from 'redux-form';
import Input from 'material-ui';

const StyledInput = styled.input``;

const StyledLine = styled.div`
  margin: 10px 0;
  .fa {
    color: ${props => (props.disabled ? '#aaa' : '#000')};
    float: right;
  }
  input {
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
    border: 1px solid #eee;
    border-color: ${props => (props.disabled ? '' : '#aaa')};
    background-color: #fff;
  }
`;

class InputLine extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true
    };
  }
  render() {
    const {disabled} = this.state;
    const {
      label,
      input,
      meta: {touched, error}
    } = this.props;
    return (
      <StyledLine disabled={disabled}>
        <Row>
          <Col md={4}>{label}: </Col>
          <Col md={8}>
            <input {...input} />
            <FontAwesome
              name="cog"
              onClick={() => this.setState({disabled: !this.state.disabled})}
            />
          </Col>
        </Row>
      </StyledLine>
    );
  }
}

let ProfileForm = props => {
  const {handleSubmit, submitting} = props;
  return (
    <form onSubmit={handleSubmit}>
      <h1 style={{textAlign: 'center', margin: '40px 0'}}>
        Here you can add your house
      </h1>
      <Grid>
        <Row>
          <Col md={6}>
            <Field name="name" label="name" component={InputLine} />
            <Field name="date" label="date" component={InputLine} />
          </Col>
          <Col md={6}>
            <Field name="phone" label="phone" component={InputLine} />
            <Field name="email" label="email" component={InputLine} />
            <Field name="instagram" label="instagram" component={InputLine} />
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

ProfileForm = reduxForm({
  form: 'profile'
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
    <ProfileForm onSubmit={values => console.log(values)} />
  </Provider>
);

export default component;
