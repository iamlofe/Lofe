import React, {Component} from 'react';
import Search from './components/Search';
import AddHouse from './components/AddHouse/AddHouse';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/Login/Login';
import {Grid, Col, Row} from 'react-bootstrap';
import {Provider} from 'react-redux';
import AboutRedux from './components/About';
import WishListComponent from './components/WishList/WishList';
import Generator from './components/generator';
import Home from './components/Home/Home';
import axios from 'axios';
import Profile from './components/Profile/Profileview';
import Rheostat from 'rheostat';

class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {}
    };
  }
  makeRequest() {}
  render() {
    return (
      <div>
        <input
          type="file"
          onChange={e => this.setState({file: e.target.files[0]})}
        />
        <button>click me</button>
      </div>
    );
  }
}

const Test = () => (
  <div style={{margin: '40px'}}>
    <Rheostat
      onChange={values => console.log(values)}
      min={1}
      max={100}
      values={[1, 100]}
    />
  </div>
);

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
          <Route path="/wishList" component={WishListComponent} />
          <Route path="/home" component={Home} />
          <Route
            path="/generate"
            component={() => <Generator number={100} />}
          />
          <Route
            path="/user/:userId"
            component={props => <Profile id={props.match.params.userId} />}
          />
          <Route path="/rheostat" component={Test} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
