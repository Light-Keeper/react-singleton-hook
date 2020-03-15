import { useLayoutEffect, useRef } from 'react';

export const SingleItemContainer = ({ initValue, useHookBody, applyStateChange }) => {
  const lastState = useRef(initValue);
  if (typeof useHookBody !== 'function') {
    throw new Error(`function expected as hook body parameter. got ${typeof useHookBody}`);
  }
  const val = useHookBody();

  //useLayoutEffect is safe from SSR perspective because SingleItemContainer should never be rendered on server
  useLayoutEffect(() => {
    if (lastState.current !== val) {
      lastState.current = val;
      applyStateChange(val);
    }
  }, [applyStateChange, val]);

  return null;
};
