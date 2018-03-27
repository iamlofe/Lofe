import React from 'react';
import axios from 'axios';
import {getCookie} from '../../cookies';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      array: []
    };
    this.userid = getCookie('userid');
    if (!this.userid) window.location.replace('http://localhost:3000/login');
  }
  componentDidMount() {
    axios
      .get(`http://localhost:3030/getUser?_id=${this.userid}`)
      .then(({data}) => {
        const array = [];
        for (var key in data) array.push({key, value: data[key]});
        this.setState({
          array
        });
      });
  }
  render() {
    return (
      <ul>
        {this.state.array &&
          this.state.array.map((item, index) => (
            <li key={index}>
              {item.key} : {item.value}
            </li>
          ))}
      </ul>
    );
  }
}

export default Home;
