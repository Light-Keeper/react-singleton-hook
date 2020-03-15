import { useRef } from 'react';

export const SingleItemContainer = ({ initValue, useHookBody, applyStateChange }) => {
  const lastState = useRef(initValue);
  const val = useHookBody();
  if (lastState.current !== val) {
    lastState.current = val;
    applyStateChange(val);
  }

  return null;
};
