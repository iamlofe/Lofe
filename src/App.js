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
import Generator from './components/generator';
import Home from './components/Home/Home';

class App extends Component {
  render() {
    //return
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/add-house" component={AddHouse} />
          <Route
            path="/about/:id"
            component={props => <AboutRedux id={props.match.params.id} />}
          />
          <Route path="/login" component={Login} />
          <Route path="/wish-list" component={WishListComponent} />
          <Route path="/home" component={Home} />
          <Route
            path="/generate"
            component={() => <Generator number={100} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
