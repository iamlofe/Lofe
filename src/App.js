import React, {Component} from 'react';
import Search from './components/Search/Search';
import AddHouse from './components/AddHouse/AddHouse';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import About from './components/About/About';
import Login from './components/Login/Login';
import {Grid, Col, Row} from 'react-bootstrap';
import {Provider} from 'react-redux';
<<<<<<< HEAD
import component from './components/WishList/WishList';
=======
import component from './components/About/AboutRedux';
>>>>>>> 3150674f6d2866208a5c0936fe19495acf1b4630

class App extends Component {
  render() {
    //return
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/add-house" component={AddHouse} />
          <Route path="/about/:id" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/test" component={component} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
