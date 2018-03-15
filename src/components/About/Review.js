import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Rating, CenterRow} from '../Styled';
import styled from 'styled-components';

const Description = styled.p``;

const Points = styled.ul`
  margin-top: 20px;
  list-style-type: none;
  padding: 0;
`;

const Point = styled.li`
  margin: 0;
  padding: 0;
  color: ${props => (props.advantage ? 'green' : 'red')};
`;

const Container = styled.li`
  padding: 30px 0;
`;

const Author = styled.div`
  display: inline-block;
  float: right;
`;

const StyledReviews = styled.ul`
  list-style-type: none;
  margin: 40px 0;
`;

const Review = ({
  key,
  description,
  rating,
  author,
  advantages,
  disadvantages
}) => (
  <Container key={key}>
    <Row>
      <Col md={4}>
        <CenterRow>
          <Rating rating={rating} />
        </CenterRow>

        <Points>
          {advantages &&
            advantages.map(advantage => (
              <Point advantage={true}>{advantage}</Point>
            ))}
        </Points>

        <Points>
          {disadvantages &&
            disadvantages.map(disadvantage => (
              <Point advantage={false}>{disadvantage}</Point>
            ))}
        </Points>
      </Col>
      <Col md={8}>
        <Description>{description}</Description>
        <Author>{author}</Author>
      </Col>
    </Row>
  </Container>
);

const Reviews = ({reviews}) => (
  <StyledReviews>
    {reviews.map((review, index) => <Review key={index} {...review} />)}
  </StyledReviews>
);

export default Reviews;
