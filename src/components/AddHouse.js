import React from 'react';
import {connect} from 'react-redux';
import FA from 'react-fontawesome';
import LeftPart from './Form/LeftPart';
import RightPart from './Form/RightPart';
import {
  Row,
  Grid,
  Col,
  Button,
  DropdownButton,
  MenuItem,
  Clearfix,
  ButtonToolbar,
  ButtonGroup
} from 'react-bootstrap';
import {Input, TextArea} from './Input';

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
      <Grid>
        <Row>
          <LeftPart />
          <RightPart />
          <CompleteButton />
        </Row>
      </Grid>
    );
  }
}

export default AddHouse;
