import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import {Row, Grid, Col} from 'react-bootstrap';
import styled from 'styled-components';
import {Rating, Price} from '../Styled';

const StyledDescriptionText = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  height: 1.4em;
  white-space: nowrap;
`;

const StyledImageWrap = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 250px;
  img {
    width: 100%;
  }
`;

const StyledLike = styled.div`
  border: 2px solid pink;
  position: absolute;
  top: 10%;
  right: 10%;
  transform: translate(-10%, -10%);
  border-radius: 10em;
  width: 30px;
  height: 30px;
  background-color: ${props => (props.isLiked ? 'pink' : 'transparent')};
`;

const StyledDescription = styled.div`
  padding: 15px 20px;
  font-size: 1.1em;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const ImageWrap = ({img, isLiked, id}) => (
  <StyledImageWrap>
    <Like isLiked={isLiked} id={id} />
    <img src={img} alt="test" />
  </StyledImageWrap>
);

let Like = ({dispatch, id, isLiked}) => (
  <StyledLike
    isLiked={isLiked}
    onClick={e => {
      e.preventDefault();
      dispatch({type: 'toggle_liked_flag', id});
    }}
  />
);
Like = connect()(Like);

const DescriptionText = ({description}) => (
  <StyledDescriptionText>{description}</StyledDescriptionText>
);

const Description = ({price, description, rating, currency}) => (
  <StyledDescription>
    <DescriptionText description={description} />
    <Flex>
      <Rating rating={rating} />
      <Price currency={currency} price={price} />
    </Flex>
  </StyledDescription>
);

const StyledSearchResult = styled.div`
  margin: 30px 0;
  padding: 0;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  a {
    text-decoration: none;
  }
`;

const SearchResult = ({
  link,
  price,
  description,
  rating,
  isLiked,
  image,
  currency,
  id
}) => (
  <Col md={4}>
    <StyledSearchResult>
      <a
        href={link}
        style={{
          color: '#000',
          textDecoration: 'none'
        }}
      >
        <ImageWrap img={image} isLiked={isLiked} id={id} />
        <Description
          description={description}
          price={price}
          rating={rating}
          currency={currency}
        />
      </a>
    </StyledSearchResult>
  </Col>
);

let SearchResults = ({results}) =>
  results ? (
    <Row>
      {results.map(result => <SearchResult key={result.id} {...result} />)}
    </Row>
  ) : null;

export default (SearchResults = connect(({results}) => {
  //connected
  return {results};
}, null)(SearchResults));
