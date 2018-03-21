import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import ImageCarousel from './ImageCarousel';
import Map from './Map';
import faker from 'faker';
import styled from 'styled-components';
import Description from './Description';
import Advantages from './Advantages';
import Reviews from './Review';
import AddReview from './AddReview';
import FourOFour from './404';
import axios from 'axios';
const Top = styled.div`
  padding: 30px 0;
`;
const Bottom = styled.div`
  padding: 30px 0;
`;
const Center = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

class About extends React.Component {
  makeRequest() {
    if (this.id) {
      axios
        .get('http://localhost:3030/about?id=' + this.id)
        .then(data => this.setState({data}))
        .catch(error => console.log(error));
    }
  }
  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.state = {
      data: {}
    };
  }
  componentDidMount() {
    //this.makeRequest();
    this.setState({
      data: {
        coords: {
          lat: Math.random() * -90 + Math.random() * 90,
          lng: Math.random() * -90 + Math.random() * 90
        },
        description: faker.lorem.paragraph(5),
        rating: parseInt(Math.random() * 3 + 2),
        advantages: faker.lorem.paragraph(5).split('. '),
        price: parseInt(Math.random() * 100) * 10 + 200,
        images: [
          'http://placekitten.com/g/400/200',
          'http://placekitten.com/g/200/400',
          'http://placekitten.com/g/300/600',
          'http://placekitten.com/g/600/300'
        ],
        currency: 'USD'
      },
      review: {
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        rating: 4,
        author: 'Andrei Malahov',
        advantages: 'Perferendis cum vel culpa nesciunt blanditiis odit.',
        disadvantages:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, quisquam.'
      }
    });
  }

  render() {
    const {
      images,
      price,
      advantages,
      description,
      coords,
      rating,
      currency
    } = this.state.data;
    const {review} = this.state;
    if (this.state.data.error === 'not found') return <FourOFour />;
    else
      return this.state.data && images ? (
        <div>
          <Top>
            <Grid>
              <Row>
                <Col md={6} style={{margin: 0, padding: 0}}>
                  <Center>
                    <ImageCarousel images={images} />
                  </Center>
                </Col>
                <Col md={6}>
                  <Center>
                    <Description
                      description={description}
                      price={price}
                      rating={rating}
                      currency={currency}
                    />
                  </Center>
                </Col>
              </Row>
            </Grid>
          </Top>
          <Bottom>
            <Grid>
              <Row>
                <Col md={6}>
                  <Center>
                    <Advantages advantages={advantages} />
                  </Center>
                </Col>
                <Col md={6} style={{margin: 0, padding: 0}}>
                  <Center>
                    <Map coords={coords} />
                  </Center>
                </Col>
              </Row>

              <Reviews reviews={[review, review]} />
              <AddReview id={this.id} />
            </Grid>
          </Bottom>
        </div>
      ) : null;
  }
}

export default About;
