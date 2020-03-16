import React from 'react';
/* eslint-disable import/no-unresolved */
import { unstable_batchedUpdates, render } from 'react-dom';
import { warning } from './warning';

export const batch = cb => unstable_batchedUpdates(cb);
export const mount = C => {
  if (window && window.document) {
    render(<C/>, window.document.createElement('div'));
  } else {
    warning('Can not mount SingletonHooksContainer on server side. '
      + 'Did you manage to run useEffect on server? '
      + 'Please mount SingletonHooksContainer into your components tree manually.');
  }
};
