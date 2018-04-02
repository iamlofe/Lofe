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
        .get('http://localhost:3030/about?_id=' + this.id)
        .then(data => this.setState({data}))
        .catch(error => console.log(error));
    }
  }
  constructor(props) {
    super(props);
    console.log(props);
    this.id = props.match.params.id;
    this.state = {
      data: {}
    };
  }
  componentDidMount() {
    this.makeRequest();
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
