import { useEffect, useState } from 'react';
import { addHook } from './components/SingletonHooksContainer';
import { batch } from './utils/env';

export const singletonHook = (initValue, useHookBody) => {
  let mounted = false;
  let lastKnownState = initValue;
  let consumers = [];

  const applyStateChange = (newState) => {
    lastKnownState = newState;
    batch(() => consumers.forEach(c => c(newState)));
  };

  return () => {
    const [state, setState] = useState(lastKnownState);

    if (!mounted) {
      mounted = true;
      addHook({ initValue, useHookBody, applyStateChange });
    }

    useEffect(() => {
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
