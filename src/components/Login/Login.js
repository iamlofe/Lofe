import React from 'react';
import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {Provider, connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import SignIn from './SignIn';
import SignUp from './SignUp';
import axios from 'axios';

const authType = (state = 'sign_in', action) => {
  // make normal understandable names
  switch (action.type) {
    case 'toggle':
      return state === 'sign_in' ? 'sign_up' : 'sign_in';
    default:
      return state;
  }
};

let ToggleButton = ({onClick, authType}) => (
  <Button style={{margin: 'auto'}} onClick={() => onClick()}>
    {authType.split('_').join(' ')}
  </Button>
);

ToggleButton = connect(
  ({authType}) => {
    return {authType};
  },
  dispatch => {
    return {
      onClick: () => dispatch({type: 'toggle'})
    };
  }
)(ToggleButton);

const onSignIn = values => {
  store.dispatch({type: 'change_signin_status', status: 'pending'});
  axios
    .post('http://localhost:3030/signin', values)
    .then(res => {
      switch (res) {
        case 'incorrect_pair':
          store.dispatch({
            type: 'change_signin_status',
            status: 'incorrect_pair'
          });
          break;
        default:
          //success
          store.dispatch({type: 'change_signin_status', status: 'success'});
          break;
      }
    })
    .catch(() =>
      store.dispatch({type: 'change_signin_status', status: 'network_error'})
    );
};

const onSignUp = values => {
  store.dispatch({type: 'change_signup_status', status: 'pending'});
  axios
    .post('http://localhost:3030/signup', values)
    .then(res => {
      switch (res) {
        case 'user_already_exists':
          store.dispatch({
            type: 'change_signup_status',
            status: 'user_already_exists'
          });
          break;
        default:
          //success
          store.dispatch({type: 'change_signup_status', status: 'success'});
          break;
      }
    })
    .catch(() =>
      store.dispatch({type: 'change_signup_status', status: 'network_error'})
    );
};

let Authorization = ({authType}) =>
  authType === 'sign_in' ? (
    <SignIn onSubmit={onSignIn} />
  ) : (
    <SignUp onSubmit={onSignUp} />
  );

Authorization = connect(({authType}) => {
  return {authType};
})(Authorization);

let status = (state = {signIn: 'normal', signUp: 'normal'}, action) => {
  switch (action.type) {
    case 'change_signin_status':
      return {...state, signIn: action.status};
    case 'change_signup_status':
      return {...state, signUp: action.status};
    default:
      return state;
  }
};

const rootReducer = combineReducers({status, form: formReducer, authType});
const store = createStore(rootReducer);

const Login = () => (
  <Provider store={store}>
    <div>
      <ToggleButton />
      <Authorization />
    </div>
  </Provider>
);

export default Login;
