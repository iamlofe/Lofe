import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import {StyledInput} from '../Input';
import styled from 'styled-components';

let AddAdvantage = ({dispatch}) => {
  let input;
  return (
    <Row>
      <Col md={8}>
        <StyledInput
          block
          innerRef={node => {
            input = node;
          }}
        />
      </Col>
      <Col md={4}>
        <Button
          style={{margin: '10px 50% ', transform: 'translate(-50%, 5px)'}}
          block
          onClick={() => dispatch({type: 'add_advantage', text: input.value})}
        >
          Add advantage
        </Button>
      </Col>
    </Row>
  );
};
AddAdvantage = connect()(AddAdvantage);

const Advantage = styled.li`
  display: block;
`;

const StyledAdvantagesList = styled.ul`
  list-style-type: none;
`;
let AdvantagesList = ({advantages}) => (
  <StyledAdvantagesList>
    {advantages.map(advantage => (
      <Advantage key={advantage.id}>{advantage.text}</Advantage>
    ))}
  </StyledAdvantagesList>
);
AdvantagesList = connect(state => {
  return {advantages: state.advantages};
}, null)(AdvantagesList);

const RightPart = () => (
  <Col md={6}>
    <Col md={12}>
      <AddAdvantage />
    </Col>
    <Row>
      <AdvantagesList />
    </Row>
  </Col>
);

export default RightPart;
