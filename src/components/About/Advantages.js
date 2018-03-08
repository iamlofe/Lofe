import React from 'react';

const Advantages = ({advantages}) => (
  <ul>
    {advantages.map(
      (advantage, index) =>
        index < 10 ? <li key={index}>{advantage}</li> : null
    )}
  </ul>
);

export default Advantages;
