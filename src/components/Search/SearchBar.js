import React from 'react';
import Rheostat from 'rheostat';
import './rheostat.css';
import './nav.css';
import {Row, Col, Button, Grid} from 'react-bootstrap';
import {connect} from 'react-redux';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import Input from 'material-ui/Input';
import {deleteCookie, getCookie} from '../../cookies';
import styled from 'styled-components';
import Menu from '../Menu/Menu';
import {getHouses} from '../../actions/asyncactions';
import {getSetup, getValues} from '../../reducers/search';
import {makeRequest} from '../../actions/search';
import {DebounceInput} from 'react-debounce-input';

const StyledSearchBar = styled.div`
  padding: 30px 0;
`;

const Slider = ({setup, values, onChange, type, makeRequest}) => {
  const customOnChange = ({values}) =>
    onChange(type, values.map(value => value * setup.step));
  const propsToRheostat = {
    min: parseInt(setup.min / setup.step),
    max: parseInt(setup.max / setup.step),
    values: values.map(value => parseInt(value / setup.step))
  };
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>{type}</ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div style={{width: '100%'}}>
          <p style={{textAlign: 'center'}}>{`${values[0]} - ${values[1]}`}</p>
          <Rheostat
            onValuesUpdated={customOnChange}
            {...propsToRheostat}
            onChange={makeRequest}
          />
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

let SearchBar = ({
  priceSetup,
  priceValues,
  ratingSetup,
  ratingValues,
  query,
  onChange,
  makeRequest
}) => {
  return (
    <Grid>
      <StyledSearchBar>
        <Row>
          <Col md={6}>
            <DebounceInput
              style={{width: '100%'}}
              element={Input}
              debounceTimeout={500}
              onChange={e => {
                onChange('query', e.target.value);
                makeRequest();
              }}
            />
          </Col>
          <Col md={2}>
            <Slider
              type="price"
              setup={priceSetup}
              values={priceValues}
              onChange={onChange}
              makeRequest={makeRequest}
            />
          </Col>
          <Col md={2}>
            <Slider
              type="rating"
              setup={ratingSetup}
              values={ratingValues}
              onChange={onChange}
              makeRequest={makeRequest}
            />
          </Col>
        </Row>
      </StyledSearchBar>
    </Grid>
  );
};

/*
<Col md={2}>
        <Menu active="search" />
      </Col>
*/
SearchBar = connect(
  state => ({
    priceSetup: getSetup(state, 'price'),
    ratingSetup: getSetup(state, 'rating'),
    priceValues: getValues(state, 'price'),
    ratingValues: getValues(state, 'rating'),
    query: getValues(state, 'query')
  }),
  dispatch => ({
    onChange: (filter, value) => dispatch(changeFilterValue(filter, value)),
    makeRequest: () => dispatch(makeRequest())
  })
)(SearchBar);

const changeFilterValue = (filter, values) => ({
  type: `CHANGE_${filter.toUpperCase()}_FILTER_VALUES`,
  values
});

export default SearchBar;
