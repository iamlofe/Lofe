import React, {Component} from 'react';
import Search from './components/Search/Search';
import AddHouse from './components/AddHouse';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SearchBar from './components/Search/SearchBar';

class App extends Component {
  render() {
    //return
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/add-house" component={AddHouse} />
          <Route path="/test" component={Search} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
