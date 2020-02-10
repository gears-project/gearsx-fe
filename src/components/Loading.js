import React from 'react';
import { Progress } from 'reactstrap';

const Loading = (props) => {
  return (
    <Progress multi>
      <Progress bar animated color="success" value="100">Loading</Progress>
    </Progress>
  );
};

export default Loading;

