import React, { useState, useEffect, useRef } from 'react';
import { SingleItemContainer } from './SingleItemContainer';
import { mount } from '../utils/env';
import { warning } from '../utils/warning';

let nextKey = 1;
let automaticRender = false;
let manualRender = false;
const workingSet = [];
const renderedContainers = [];

const notifyContainersAsync = () => {
  renderedContainers.forEach(updateRenderedHooks => updateRenderedHooks());
};

export const SingletonHooksContainer = ({ automaticContainerInternalUseOnly }) => {
  const [hooks, setHooks] = useState([]);
  const currentHooksRef = useRef();
  currentHooksRef.current = hooks;

  // if there was no automaticRender, and this one is not automatic as well
  if (!automaticContainerInternalUseOnly && automaticRender === false) {
    manualRender = true;
  }

  useEffect(() => {
    let mounted = true;

    function updateRenderedHooks() {
      if (!mounted) return;

      if (renderedContainers[0] !== updateRenderedHooks) {
        if (!automaticContainerInternalUseOnly && automaticRender === true) {
          warning('SingletonHooksContainer is mounted after some singleton hook has been used.'
            + 'Your SingletonHooksContainer will not be used in favor of internal one.');
        }
        setHooks(_ => []);
        return;
      }

      setHooks([...workingSet]);
    }

    renderedContainers.push(updateRenderedHooks);
    notifyContainersAsync();

    return () => {
      mounted = false;

      if (currentHooksRef.current.length > 0) {
        warning('SingletonHooksContainer is unmounted, but it has active singleton hooks. '
          + 'They will be reevaluated once SingletonHooksContainer is mounted again');
      }

      renderedContainers.splice(renderedContainers.indexOf(updateRenderedHooks), 1);
      notifyContainersAsync();
    };
  }, [automaticContainerInternalUseOnly]);

  return <>{hooks.map(({ hook, key }) => <SingleItemContainer {...hook} key={key}/>)}</>;
};

export const addHook = hook => {
  const key = nextKey++;
  workingSet.push({ hook, key });

  // no container and no previous manually rendered containers
  if (renderedContainers.length === 0 && manualRender === false) {
    automaticRender = true;
    mount(SingletonHooksContainer);
  }

  notifyContainersAsync();

  return () => {
    workingSet.splice(workingSet.findIndex(h => h.key === key), 1);
    notifyContainersAsync();
  };
};

export const resetLocalStateForTests = () => {
  automaticRender = false;
  manualRender = false;
  workingSet.splice(0, workingSet.length);
  renderedContainers.splice(0, renderedContainers.length);
};
