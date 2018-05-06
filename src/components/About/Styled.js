import React from 'react';
import styled from 'styled-components';
import {CircularProgress} from 'material-ui/Progress';
import {CenterRow} from '../Styled';
export const Padding = styled.div`
  padding: 30px 0;
`;
export const Center = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Error = ({error}) => <h1>{error}</h1>;

export const Pending = () => (
  <Center height="90vh">
    <CenterRow justifyContent="center">
      <CircularProgress size={120} thickness={2} />
    </CenterRow>
  </Center>
);
