import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  border-radius: 3px;
  display: block;
  padding: 10px 30px;
  border: 1px solid #888;
  width: 100%;
  margin: 10px 0;
`;

const StyledTextArea = styled.textarea`
  border-radius: 3px;
  border: 1px solid #888;
  width: 100%;
  padding: 10px 30px;
  height: 300px;
  margin: 10px 0;
`;

export { StyledInput, StyledTextArea };
