import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import {
  Row,
  Grid,
  Col,
  Button,
  DropdownButton,
  MenuItem,
  Clearfix,
  ButtonToolbar,
  ButtonGroup
} from 'react-bootstrap';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';

let StyledRating = styled.div`
  display: inline-block;
  line-height: 0;
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

let StyledPrice = styled.div`
  float: right;
  display: inline-block;
  font-weight: bold;
  line-height: 20px;
  span {
    font-size: 30px;
  }
`;

const Price = ({price, currency}) => (
  <StyledPrice>
    <span>{price}</span> {currency}
  </StyledPrice>
);

let StyledDescriptionText = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  height: 1.2em;
  white-space: nowrap;
`;
const DescriptionText = ({description}) => (
  <StyledDescriptionText>{description}</StyledDescriptionText>
);

const StyledDescription = styled.div`
  border: 1px solid #000;
  padding: 15px 20px;
  font-size: 1.1em;
`;

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

let StyledImageWrap = styled.div`
  border: 1px solid #000;
  width: 100%;
  overflow: hidden;
  img {
    width: 100%;
  }
`;

let StyledLike = styled.div`
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

const ImageWrap = ({img, isLiked}) => (
  <StyledImageWrap>
    <Like isLiked={isLiked} />
    <img src={img} alt="test" />
  </StyledImageWrap>
);

class Like extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: props.isLiked
    };
  }
  render() {
    return (
      <StyledLike
        isLiked={this.state.isLiked}
        onClick={e => {
          e.preventDefault();
          this.setState({isLiked: !this.state.isLiked});
          //toggleLikeQuery();
        }}
      />
    );
  }
}

const SearchResult = ({
  link,
  price,
  description,
  rating,
  isLiked,
  image,
  currency
}) => (
  <Col md={4} style={{margin: '30px 0'}}>
    <a href={link} style={{color: '#000', textDecoration: 'none'}}>
      <ImageWrap img={image} isLiked={isLiked} />
      <Description
        description={description}
        price={price}
        rating={rating}
        currency={currency}
      />
    </a>
  </Col>
);

const SearchResults = ({results}) => (
  <Grid>
    <Row>{results.map(result => <SearchResult {...result} />)}</Row>
  </Grid>
);

export default SearchResults;
