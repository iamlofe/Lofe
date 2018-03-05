import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
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

class Search extends React.Component {
  render() {
    <Provider>
      <Grid>
        <SearchBar />
        <SearchResults></SearchResults>
        <Navigation></Navigation>
      </Grid>
    </Provider>

  }
}