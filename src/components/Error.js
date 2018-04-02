import React from 'react';
import {Center} from './Styled';

const Error = ({error}) => (
  <Center height="100vh">
    <h1 style={{textAlign: 'center'}}>{error}</h1>
  </Center>
);

export default Error;
