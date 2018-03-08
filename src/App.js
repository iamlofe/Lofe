import React, {Component} from 'react';
import Search from './components/Search/Search';
import AddHouse from './components/AddHouse';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import About from './components/About/About';
class App extends Component {
  render() {
    //return
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/add-house" component={AddHouse} />
          <Route path="/test" component={About} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
