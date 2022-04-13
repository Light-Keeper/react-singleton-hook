import { useEffect, useState } from 'react';
import { addHook } from './components/SingletonHooksContainer';
import { batch } from './utils/env';

export const singletonHook = (initValue, useHookBody, options = {}) => {
  let mounted = false;
  let removeHook = undefined;
  let initStateCalculated = false;
  let lastKnownState = undefined;
  let consumers = [];
  let {
    unmountIfNoConsumers = false
  } = options;

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
        removeHook = addHook({ initValue, useHookBody, applyStateChange });
      }

      consumers.push(setState);
      if (lastKnownState !== state) {
        setState(lastKnownState);
      }
      return () => {
        consumers.splice(consumers.indexOf(setState), 1);
        if (consumers.length === 0 && unmountIfNoConsumers) {
          removeHook();
          mounted = false;
        }
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return state;
  };
};
