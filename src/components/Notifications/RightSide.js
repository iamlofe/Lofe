import React from 'react';
import styled from 'styled-components';
import Zoom from 'material-ui/transitions/Zoom';
import {Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';

const StyledRightSide = styled.div`
  margin-top: 10px;
  padding: 20px 40px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  width: 100%;
  height: 100%;
  .title {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    text-transform: capitalize;
  }
`;

let RightSide = ({visible, title, message, sender, time}) =>
  sender && sender.id ? (
    <Row>
      <Col md={12}>
        <Zoom in={visible}>
          <StyledRightSide>
            <div className="title">{title}</div>
            <div className="message">{message}</div>
            <div className="sender">
              <a href={`https://localhost:3000/user/${sender.id}`}>
                {sender.name}
              </a>
            </div>
          </StyledRightSide>
        </Zoom>
      </Col>
    </Row>
  ) : null;

RightSide = connect(state => {
  return {
    ...state.active,
    visible: state.visible
  };
})(RightSide);

export default RightSide;
