import React from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import {Rating, Price} from '../Styled';
import {getCookie} from '../../cookies';
import axios from 'axios';

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

let Like = ({loggedIn, username, dispatch, id, isLiked}) => (
  <StyledLike
    isLiked={isLiked}
    onClick={e => {
      e.preventDefault();
      if (loggedIn) {
        const data = {session: getCookie('userid'), houseId: id};
        if (isLiked) {
          axios
            .post('http://localhost:3030/removeFromWishList', data)
            .then(({data}) => {
              console.log(data);
              if (data === 'success') dispatch({type: 'toggle_liked_flag', id});
            });
        } else {
          axios
            .post('http://localhost:3030/addToWishList', data)
            .then(({data}) => {
              if (data === 'success') dispatch({type: 'toggle_liked_flag', id});
            });
        }
      } else {
        window.location.replace('http://localhost:3000/login');
      }
    }}
  />
);
Like = connect(state => {
  return {
    username: state.session.username,
    loggedIn: state.session.loggedIn
  };
})(Like);

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
  _id
}) => (
  <Col md={4}>
    <StyledSearchResult>
      <a
        href={`/about/${_id}`}
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
          id={_id}
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
