import React from 'react';
import styled from 'styled-components';
import {Rating, Price} from '../Styled';
import {Button} from 'react-bootstrap';

const Container = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Text = styled.p`
  margin: 20px;
`;

const Description = ({description, rating, price, currency}) => (
  <Container>
    <Rating rating={rating} />
    <Text>{description}</Text>
    <Price price={price} currency={currency} />
    <Button style={{margin: '20px auto'}} bsSize="large" bsStyle="primary">
      Order
    </Button>
  </Container>
);

export default Description;
