import React from 'react';
import faker from 'faker';
import axios from 'axios';

class Generator extends React.Component {
  constructor(props) {
    super(props);
    for (let i = 0; i < props.number; i++) {
      const values = {
        images: [
          'https://beebom-redkapmedia.netdna-ssl.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg',
          'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg',
          'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/4/11/1397210130748/Spring-Lamb.-Image-shot-2-011.jpg'
        ],
        address: faker.address.streetAddress(),
        price: parseInt(Math.random() * 150) * 10 + 200,
        description: faker.lorem.sentences(4),
        coords: {lat: faker.address.latitude(), lng: faker.address.longitude()},
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
