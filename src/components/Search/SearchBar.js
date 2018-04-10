import React from 'react';
import Rheostat from 'rheostat';
import '../../rheostat.css';
import {Row, Col, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import {deleteCookie, getCookie} from '../../cookies';
import styled from 'styled-components';
import Menu from '../Menu/Menu';
import Input from 'material-ui/Input';
import {getHouses} from '../../actions/asyncactions';

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
      values: props.values || [0],
      isAvailableForRequest: true
    };

    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(sliderState) {
    if (this.state.isAvailableForRequest) {
      this.setState({...this.state, isAvailableForRequest: false});
      setTimeout(() => {
        this.props.dispatch({
          type: `change_${this.props.type}`,
          min: this.state.values[0],
          max: this.state.values[1]
        });
        this.setState({...this.state, isAvailableForRequest: true});
        this.props.makeRequest({
          ...this.props.filter,
          session: getCookie('userid')
        });
      }, 500);
    }
    this.setState({
      values: sliderState.values
    });
  }

  render() {
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

const Slider = connect(
  ({filter}) => {
    return {filter};
  },
  dispatch => {
    return {
      makeRequest: args => dispatch(getHouses(args)),
      dispatch
    };
  }
)(LabeledSlider);
const StyledSearchBar = styled.div`
  padding: 30px 0;
`;

class SmartInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isAvailableForRequest: true
    };
  }
  onChange(e) {
    if (this.state.isAvailableForRequest) {
      this.setState({isAvailableForRequest: false});
      setTimeout(() => {
        this.props.dispatch({
          type: `change_request`,
          request: this.state.text
        });
        this.setState({...this.state, isAvailableForRequest: true});
        this.props.makeRequest({
          ...this.props.filter,
          session: getCookie('userid')
        });
      }, 500);
    }
    this.setState({
      text: e.target.value
    });
  }
  render() {
    return (
      <Input
        label="search"
        autoFocus={true}
        fullWidth={true}
        onChange={this.onChange.bind(this)}
        placeholder="search"
      />
    );
  }
}
const SmartInputComponent = connect(
  ({filter}) => {
    return {filter};
  },
  dispatch => {
    return {
      makeRequest: args => dispatch(getHouses(args)),
      dispatch
    };
  }
)(SmartInput);

const SearchBar = () => (
  <StyledSearchBar>
    <Row>
      <Col md={6}>
        <SmartInputComponent />
      </Col>

      <Col md={2}>
        <ExpansionPanel>
          <ExpansionPanelSummary>Price</ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Slider
              type="price"
              handle={MyHandle}
              min={0}
              max={2000}
              values={[0, 2000]}
              metrics="usd"
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
      <Col md={2}>
        <Menu active="search" />
      </Col>
    </Row>
  </StyledSearchBar>
);
export default SearchBar;
