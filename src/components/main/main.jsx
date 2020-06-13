import React from 'react';

const Main = (props) => {
  // eslint-disable-next-line react/prop-types
  const {rentCount} = props;

  return <div>
    <p>Предложений аренды: {rentCount}</p>
  </div>;
};

export default Main;
