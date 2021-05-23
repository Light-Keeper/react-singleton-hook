import React from 'react';
import { warning } from './warning';

let unstable_batchedUpdates, render;

try {
  const reactDom = require('react-dom');
  unstable_batchedUpdates = reactDom.unstable_batchedUpdates;
  render = reactDom.render;
} catch (e) {
  unstable_batchedUpdates = cb => cb();
  render = () => { throw new Error('can not render without react-dom. Mount SingletonHooksContainer manually'); };
}

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
