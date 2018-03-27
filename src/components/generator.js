import React from 'react';
import faker from 'faker';
import axios from 'axios';

class Generator extends React.Component {
  constructor(props) {
    super(props);
    for (let i = 0; i < props.number; i++) {
      const values = {
        address: faker.address.streetAddress(),
        price: parseInt(Math.random() * 150) * 10 + 200,
        description: faker.lorem.sentences(4),
        advantages: faker.random
          .words(4)
          .toLowerCase()
          .split(' '),
        rating: parseInt(Math.random() * 6)
      };
      axios.post('http://localhost:3030/add-house', values);
    }
  }
  render() {
    return <div>You added {this.props.number} houses</div>;
  }
}

export default Generator;
