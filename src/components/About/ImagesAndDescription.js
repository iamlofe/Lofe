import React from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import {Padding, Center} from './Styled';
import ImageCarousel from './ImageCarousel';
import Description from './Description';

const ImagesAndDescription = ({
  images,
  description,
  price,
  rating,
  currency
}) => (
  <Padding>
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
              currency={currency || 'usd'}
            />
          </Center>
        </Col>
      </Row>
    </Grid>
  </Padding>
);

export default ImagesAndDescription;
