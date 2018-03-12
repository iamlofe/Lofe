import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import '../../web-fonts-with-css/css/fontawesome-all.min.css';

const StyledUl = styled.ul`
  list-style-type: none;
  padding: 20px 0;
  margin: 0;
`;
const StyledLi = styled.li`
  padding: 0;
  margin: 0;
  display: block;
  span {
    font-size: 1.1em;
    margin-left: 10px;
  }
`;

const Advantages = ({advantages}) => (
  <StyledUl>
    {advantages.map(
      (advantage, index) =>
        index < 10 ? (
          <StyledLi key={index}>
            <FontAwesome className="super-crazy-colors" name="check" />
            <span>{advantage}</span>
          </StyledLi>
        ) : null
    )}
  </StyledUl>
);

export default Advantages;
