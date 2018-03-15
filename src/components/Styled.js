import React from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import StarRatings from 'react-star-ratings';
import FontAwesome from 'react-fontawesome';

const CenterRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
`;

const StyledRating = styled.div`
  display: inline-block;
  line-height: 0;
`;

const Center = styled.div`
  display: flex;
  height: ${props => props.height || 'auto'};
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

const Point = ({input, remove, label, type, meta: {touched, error}}) => (
  <div>
    <div>
      <CenterRow>
        <StyledInput
          width="80%"
          margin="10px 0"
          placeholder={label}
          {...input}
          type={type}
        />
        <FontAwesome style={{margin: 'auto'}} name="times" onClick={remove} />
      </CenterRow>
      {touched && error && <StyledError>{error}</StyledError>}
    </div>
  </div>
);

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

const StyledError = styled.div`
  text-align: center;
  color: red;
`;

const StyledInput = styled.input`
  border-radius: 3px;
  display: block;
  padding: 10px 30px;
  border: 1px solid #888;
  width: ${props => props.width || '100%'};
  margin: ${props => props.margin || '0 0 0 0'};
`;

const StyledPrice = styled.div`
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

const StyledTextArea = styled.textarea`
  border-radius: 3px;
  border: 1px solid #888;
  width: 100%;
  padding: 10px 30px;
  height: 300px;
  margin: ${props => props.margin || '0 0 0 0'};
`;

export {
  StyledError,
  Center,
  StyledInput,
  StyledTextArea,
  CenterRow,
  Rating,
  Price,
  Point
};
