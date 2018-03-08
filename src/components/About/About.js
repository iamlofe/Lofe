import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import ImageCarousel from './ImageCarousel';
import Map from './Map';
import faker from 'faker';
import styled from 'styled-components';
import Description from './Description';
import Advantages from './Advantages';
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
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }
  componentDidMount() {
    this.setState({
      data: {
        coords: {
          lat: Math.random() * -90 + Math.random() * 90,
          lng: Math.random() * -90 + Math.random() * 90
        },
        description: faker.lorem.paragraph(5),
        rating: parseInt(Math.random() * 3 + 2),
        advantages: faker.lorem.paragraph(1).split(' '),
        price: parseInt(Math.random() * 100) * 10 + 200,
        images: [
          'http://placekitten.com/g/400/200',
          'http://placekitten.com/g/200/400',
          'http://placekitten.com/g/300/600',
          'http://placekitten.com/g/600/300'
        ],
        currency: 'USD'
      }
    });
    console.log(this.state.coords);
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
    return this.state.data && this.state.data.images ? (
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
          </Grid>
        </Bottom>
      </div>
    ) : null;
  }
}

export default About;
