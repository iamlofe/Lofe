import React from 'react';
import Rheostat from 'rheostat';
import '../../rheostat.css';
import {Grid, Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import {connect} from 'react-redux';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField
} from 'material-ui/ExpansionPanel';
import styled from 'styled-components';

import Input, {InputLabel, InputAdornment} from 'material-ui/Input';

function MyHandle({style, ...passProps}) {
  return (
    <div
      {...passProps}
      style={{
        ...style,
        backgroundColor: '#efefef',
        border: '1px solid #888',
        borderRadius: 4,
        cursor: 'ew-resize',
        marginLeft: -13,
        height: 24,
        width: 24,
        zIndex: 3
      }}
    />
  );
}

class LabeledSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: props.values || [0]
    };

    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(sliderState) {
    this.props.dispatch({
      type: `change_${this.props.type}`,
      min: sliderState.values[0],
      max: sliderState.values[1]
    });
    this.setState({
      values: sliderState.values
    });
  }

  render() {
    const {formatValue} = this.props;

    return (
      <div
        style={{
          margin: '0 10% 10% 10%',
          width: '100%'
        }}
      >
        <div style={{textAlign: 'center', marginBottom: '10px'}}>
          {`${this.state.values[0]} - ${this.state.values[1]} ${
            this.props.metrics
          }`}
        </div>
        <Rheostat
          {...this.props}
          onValuesUpdated={this.updateValue}
          values={this.state.values}
        />
      </div>
    );
  }
}

const Slider = connect()(LabeledSlider);
const StyledSearchBar = styled.div`
  padding: 30px 0;
`;

let SmartInput = ({dispatch}) => (
  <Input
    label="search"
    autoFocus={true}
    fullWidth={true}
    onChange={e => dispatch({type: 'change_request', request: e.target.value})}
    placeholder="search"
  />
);
SmartInput = connect()(SmartInput);

const SearchBar = () => (
  <StyledSearchBar>
    <Row>
      <Col md={6}>
        <SmartInput />
      </Col>
      <Col md={2}>
        <ExpansionPanel>
          <ExpansionPanelSummary>Price</ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Slider
              type="price"
              handle={MyHandle}
              min={0}
              max={100}
              values={[0, 100]}
              metrics="usd"
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Col>
      <Col md={2}>
        <ExpansionPanel>
          <ExpansionPanelSummary>Distance</ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Slider
              type="distance"
              handle={MyHandle}
              min={0}
              max={1000}
              values={[0, 1000]}
              metrics="m"
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Col>
      <Col md={2}>
        <ExpansionPanel>
          <ExpansionPanelSummary>Rating</ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Slider
              type="rating"
              handle={MyHandle}
              min={0}
              max={5}
              values={[0, 5]}
              metrics="stars"
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Col>
    </Row>
  </StyledSearchBar>
);

export default SearchBar;
