import React, {Component} from 'react';
import Search from './components/Search/Search';
import AddHouse from './components/AddHouse/AddHouse';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import About from './components/About/About';
import Login from './components/Login/Login';
import LeftPart from './components/AddHouse/LeftPart';
import {createStore, combineReducers} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import {Grid, Col, Row} from 'react-bootstrap';
import {Provider} from 'react-redux';

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
});
const store = createStore(reducer);

const component = () => (
  <Provider store={store}>
    <Grid>
      <Row>
        <Col md={12}>
          <LeftPart onSubmit={values => console.log(values)} />
        </Col>
      </Row>
    </Grid>
  </Provider>
);

class App extends Component {
  render() {
    //return
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/add-house" component={AddHouse} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/test" component={component} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
