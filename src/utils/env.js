import React from 'react';
import { createRoot } from 'react-dom/client';
import { unstable_batchedUpdates } from 'react-dom';
import { warning } from './warning';

// from https://github.com/purposeindustries/window-or-global/blob/master/lib/index.js
// avoid direct usage of 'window' because `window is not defined` error might happen in babel-node
const globalObject = (typeof self === 'object' && self.self === self && self)
  || (typeof global === 'object' && global.global === global && global)
  || this;


export const batch = cb => unstable_batchedUpdates(cb);
export const mount = C => {
  if (globalObject.document && globalObject.document.createElement) {
    const container = globalObject.document.createElement('div');
    const root = createRoot(container);
    root.render(<C automaticContainerInternalUseOnly={true}/>);
  } else {
    warning('Can not mount SingletonHooksContainer on server side. '
      + 'Did you manage to run useEffect on server? '
      + 'Please mount SingletonHooksContainer into your components tree manually.');
  }
};
