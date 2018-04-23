import React from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import {Rating, Price} from '../Styled';
import {getCookie} from '../../cookies';
import axios from 'axios';
import {like} from '../../actions/asyncactions';

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
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
  <StyledImageWrap img={img}>
    <Like isLiked={isLiked} id={id} />
  </StyledImageWrap>
);

let Like = ({loggedIn, id, isLiked, like}) => (
  <StyledLike
    isLiked={isLiked}
    onClick={e => {
      e.preventDefault();
      if (loggedIn) {
        like({session: getCookie('userid'), id, loggedIn});
      } else {
        window.location.replace('http://localhost:3000/login');
      }
    }}
  />
);
Like = connect(
  state => {
    return {
      username: state.session.username,
      loggedIn: state.session.loggedIn
    };
  },
  dispatch => {
    return {
      like: data => dispatch(like(data))
    };
  }
)(Like);

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
  :hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 30px,
      rgba(0, 0, 0, 0.23) 0px 6px 10px;
    transform: translate(0, 3px);
  }
  transition: all 0.3s ease;
  border-radius: 2px;
  a {
    text-decoration: none;
  }
`;

const SearchResult = ({
  address,
  price,
  description,
  rating,
  isLiked,
  image,
  id
}) => (
  <Col lg={4} md={6} sm={6}>
    <StyledSearchResult>
      <a
        href={`/about/${id}`}
        style={{
          color: '#000',
          textDecoration: 'none'
        }}
      >
        <ImageWrap
          img={
            image ||
            'http://www.joshuacasper.com/contents/uploads/joshua-casper-samples-free.jpg'
          }
          isLiked={isLiked || false}
          id={id}
        />
        <Description
          description={address}
          price={price}
          rating={rating}
          currency="usd"
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

export default (SearchResults = connect(({results, ...rest}) => {
  //connected
  return {rest, results};
}, null)(SearchResults));
