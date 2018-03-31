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
        <SearchResults />
      </Grid>
    );
  }
}
const Search = connect(
  ({filter}) => {
    return {filter};
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
