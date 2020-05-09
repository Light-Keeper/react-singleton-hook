import { useEffect, useState } from 'react';
import { addHook } from './components/SingletonHooksContainer';
import { batch } from './utils/env';

export const singletonHook = (initValue, useHookBody) => {
  let mounted = false;
  let initStateCalculated = false;
  let lastKnownState = undefined;
  let consumers = [];

  const applyStateChange = (newState) => {
    lastKnownState = newState;
    batch(() => consumers.forEach(c => c(newState)));
  };

  const stateInitializer = () => {
    if (!initStateCalculated) {
      lastKnownState = typeof initValue === 'function' ? initValue() : initValue;
      initStateCalculated = true;
    }
    return lastKnownState;
  };

  return () => {
    const [state, setState] = useState(stateInitializer);

    useEffect(() => {
      if (!mounted) {
        mounted = true;
        addHook({ initValue, useHookBody, applyStateChange });
      }

      consumers.push(setState);
      if (lastKnownState !== state) {
        setState(lastKnownState);
      }
      return () => { consumers.splice(consumers.indexOf(setState), 1); };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return state;
  };
};
