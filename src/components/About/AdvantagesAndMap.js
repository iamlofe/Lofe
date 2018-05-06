import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Padding, Center} from './Styled';
import Advantages from './Advantages';
import Map from './Map';

const AdvantagesAndMap = ({coords, advantages}) => (
  <Padding>
    <Grid>
      <Row>
        {advantages.length && (
          <Col md={6}>
            <Center>
              <Advantages advantages={advantages} />
            </Center>
          </Col>
        )}
        <Col md={advantages.length ? 6 : 12} style={{margin: 0, padding: 0}}>
          <Center>{!isNaN(coords.lat) && <Map coords={coords} />}</Center>
        </Col>
      </Row>
    </Grid>
  </Padding>
);

export default AdvantagesAndMap;
