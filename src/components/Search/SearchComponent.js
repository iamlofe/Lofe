import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';

import {Grid} from 'react-bootstrap';
import faker from 'faker';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';
import axios from 'axios';
import {getCookie} from '../../cookies';
import {menu} from '../../reducer/menu';
import {getHouses} from '../../actions/asyncactions';
import Error from '../Error';
import {CircularProgress} from 'material-ui/Progress';
import {Center, CenterRow} from '../Styled';
import Pagination from 'react-js-pagination';
import './nav.css';

const Status = ({status, message}) => {
  switch (status) {
    case 'pending':
      return (
        <Center height="90vh">
          <CenterRow justifyContent="center">
            <CircularProgress size={120} thickness={2} />
          </CenterRow>
        </Center>
      );
    case 'show_message':
      return (
        <Center height="90vh">
          <CenterRow justifyContent="center">
            <h1>{message}</h1>
          </CenterRow>
        </Center>
      );
    default:
      return null;
  }
};

let Navigation = ({onChange, filter, currentPage}) => (
  <Pagination
    activePage={currentPage}
    initialPage={1}
    pageRangeDisplayed={5}
    itemsCountPerPage={1}
    totalItemsCount={40}
    containerClassName="navigation"
    pageClassName="page"
    onChange={page => onChange({page, ...filter})}
  />
);
Navigation = connect(
  state => {
    return {
      currentPage: state.filter.page,
      totalCount: 20,
      filter: state.filter
    };
  },
  dispatch => {
    return {
      onChange: data => getHouses(data)
    };
  }
)(Navigation);

class SearchComponent extends React.Component {
  componentDidMount() {
    const session = getCookie('userid');
    this.props.checkLogin(session);
    console.log(this.props);
    this.props.makeRequest({...this.props.filter, session});
  }

  render() {
    return (
      <Grid>
        <SearchBar />
        {this.props.status.status === 'display' ? (
          <div>
            <SearchResults />
            <Navigation />
          </div>
        ) : (
          <Status
            status={this.props.status.status}
            message={this.props.status.message}
          />
        )}
      </Grid>
    );
  }
}
const Search = connect(
  ({filter, status}) => {
    return {filter, status};
  },
  dispatch => {
    return {
      makeRequest: ({session, rating, price, request}) =>
        dispatch(getHouses({session, rating, price, request})),
      checkLogin: session => console.log(session)
    };
  }
)(SearchComponent);

export default Search;
