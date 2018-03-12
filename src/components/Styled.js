import React from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';

const Center = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

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

const StyledTextArea = styled.textarea`
  border-radius: 3px;
  border: 1px solid #888;
  width: 100%;
  padding: 10px 30px;
  height: 300px;
  margin: 10px 0;
`;

export {StyledError, Center, StyledInput, StyledTextArea};
