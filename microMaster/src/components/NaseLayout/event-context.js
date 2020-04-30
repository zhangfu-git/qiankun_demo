import React from 'react';

export const EventContext = React.createContext({
  onClickLink: () => {},
  onCollect: () => {},
})