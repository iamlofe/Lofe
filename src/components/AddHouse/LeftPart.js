import React from 'react';
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

const PriceAndCurrency = () => (
  <Row>
    <Col md={8}>
      <InputContainer type="price" />
    </Col>

    <Col md={4}>
      <ButtonGroup
        style={{margin: '10px 50% ', transform: 'translate(-50%, 5px)'}}
      >
        <CurrencyButton currency="EUR" />
        <CurrencyButton currency="USD" />
        <CurrencyButton currency="RUB" />
      </ButtonGroup>
    </Col>
  </Row>
);

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

export default LeftPart;
