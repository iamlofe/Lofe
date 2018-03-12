import React from 'react';
import {connect, Provider} from 'react-redux';
import FA from 'react-fontawesome';
import LeftPart from './LeftPart';
import RightPart from './RightPart';
import {createStore, combineReducers} from 'redux';
import {Row, Grid, Col, Button} from 'react-bootstrap';

let nextAdvantageId = 0;

const advantages = (state = [], action) => {
  switch (action.type) {
    case 'add_advantage':
      return [...state, {id: nextAdvantageId++, text: action.text}];
    case 'remove_advantage':
      return state.filter(advantage => advantage.id !== action.id);
    default:
      return state;
  }
};

const form = (state = {}, action) => {
  switch (action.type) {
    case 'change_address':
      return {...state, address: action.value};
    case 'change_price':
      return {...state, price: action.value};
    case 'change_description':
      return {...state, description: action.value};
    case 'change_currency':
      return {...state, currency: action.currency};
    default:
      return state;
  }
};

const superReducer = combineReducers({
  advantages,
  form
});
const store = createStore(superReducer);

let CompleteButton = ({state}) => (
  <Col md={12}>
    <Button
      style={{margin: '50px 50%', transform: 'translate(-50%, 0)'}}
      onClick={() => console.log(state)}
      bsStyle="success"
      bsSize="large"
    >
      Add your house
    </Button>
  </Col>
);
CompleteButton = connect(state => {
  return {state};
}, null)(CompleteButton);

class AddHouse extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Grid>
          <Row>
            <LeftPart />
            <RightPart />
            <CompleteButton />
          </Row>
        </Grid>
      </Provider>
    );
  }
}

export default AddHouse;
