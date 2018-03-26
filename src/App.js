import React, {Component} from 'react';
import Search from './components/Search/Search';
import AddHouse from './components/AddHouse/AddHouse';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import About from './components/About/About';
import Login from './components/Login/Login';
import {Grid, Col, Row} from 'react-bootstrap';
import {Provider} from 'react-redux';
import AboutRedux from './components/About/AboutRedux';
import WishListComponent from './components/WishList/WishList';

class App extends Component {
  render() {
    //return
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/add-house" component={AddHouse} />
          <Route path="/about/:id" component={AboutRedux} />
          <Route path="/login" component={Login} />
          <Route path="/wish-list" component={WishListComponent} />
          <Route path="/test/:id" component={About} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
