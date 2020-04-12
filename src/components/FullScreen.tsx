import React, { useState } from 'react';

export default (props) => {
  const containerId = `fullscreen-${+new Date()}`;
  const [fullScreenId, setFullScreenId] = useState(containerId);

}

