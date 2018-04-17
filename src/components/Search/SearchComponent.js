import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider, connect} from 'react-redux';
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
import ReactPaginate from 'react-paginate';

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

let Navigation = ({dispatch, currentPage, totalCount = 20}) =>
  totalCount && (
    <ReactPaginate
      pageCount={10}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      onPageChange={page => console.log(page)}
    />
  );
Navigation = connect(
  state => {
    return {
      currentPage: state.filter.page,
      totalCount: 20
    };
  },
  dispatch => {
    return {
      dispatch
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
      checkLogin: session => {
        if (session)
          axios
            .get('http://localhost:3030/getUser?_id=' + session)
            .then(res => {
              dispatch({type: 'login', username: res.data.username});
            })
            .catch(() => console.log('user is not logged in'));
      }
    };
  }
)(SearchComponent);

export default Search;
