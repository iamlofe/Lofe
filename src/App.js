import React, {Component} from 'react';
import Search from './components/Search/Search';
import AddHouse from './components/AddHouse';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    //return <LabeledSlider values={[0, 100]} />;
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/add-house" component={AddHouse} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
