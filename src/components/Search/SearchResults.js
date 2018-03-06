import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import {Row, Grid, Col} from 'react-bootstrap';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';

const StyledPrice = styled.div`
  float: right;
  display: inline-block;
  font-weight: bold;
  line-height: 20px;
  span {
    font-size: 30px;
  }
`;

const StyledRating = styled.div`
  display: inline-block;
  line-height: 0;
`;

const StyledDescriptionText = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  height: 1.2em;
  white-space: nowrap;
`;

const StyledImageWrap = styled.div`
  border: 1px solid #000;
  width: 100%;
  overflow: hidden;
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
  border: 1px solid #000;
  padding: 15px 20px;
  font-size: 1.1em;
`;

const Rating = ({rating}) => (
  <StyledRating>
    <StarRatings
      rating={rating}
      starRatedColor="#c5ea2e"
      numberOfStars={5}
      starDimension="20px"
      starSpacing="2px"
    />
  </StyledRating>
);

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
      //toggleLikeQuery();
    }}
  />
);
Like = connect()(Like);

const DescriptionText = ({description}) => (
  <StyledDescriptionText>{description}</StyledDescriptionText>
);

const Price = ({price, currency}) => (
  <StyledPrice>
    <span>{price}</span> {currency}
  </StyledPrice>
);

const Description = ({price, description, rating, currency}) => (
  <StyledDescription>
    <DescriptionText description={description} />
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 0'
      }}
    >
      <Rating rating={rating} />
      <Price currency={currency} price={price} />
    </div>
  </StyledDescription>
);

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
  <Col md={4} style={{margin: '30px 0'}}>
    <a href={link} style={{color: '#000', textDecoration: 'none'}}>
      <ImageWrap img={image} isLiked={isLiked} id={id} />
      <Description
        description={description}
        price={price}
        rating={rating}
        currency={currency}
      />
    </a>
  </Col>
);

let SearchResults1 = ({results}) =>
  results ? (
    <Row>
      {results.map(result => <SearchResult key={result.id} {...result} />)}
    </Row>
  ) : null;

const SearchResults = connect(({results}) => {
  return {results};
}, null)(SearchResults1);

export default SearchResults;
