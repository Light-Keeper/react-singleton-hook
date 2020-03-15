import React, { useRef, useState, useEffect } from 'react';
import { SingleItemContainer } from './SingleItemContainer';
import { mount } from '../utils/env';
import { warning } from '../utils/warning';

let singletonContainerMounted = false;
let mountQueue = [];
let mountIntoContainer = (item) => {
  mountQueue.push(item);
};

const useValidations = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isFirstRender = useRef(true);
  if (isFirstRender && singletonContainerMounted) {
    warning('SingletonContainer is mounted after singletonHook was used first time by some '
      + 'component. You should mount SingletonContainer before any other component. '
      + 'Alternatively, dont use SingletonContainer it at all, we will handle that for you.');
  }
  isFirstRender.current = false;
  singletonContainerMounted = true;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    return () => {
      warning('SingletonContainer is removed from DOM. its not supported, singleton hooks will stop updating.');
    };
  }, []);
};

export const SingletonContainer = () => {
  useValidations();
  const [hooks, setHooks] = useState([]);

  useEffect(() => {
    mountIntoContainer = item => setHooks(hooks => [...hooks, item]);
    setHooks(mountQueue);
  }, []);

  return <>{hooks.map((h, i) => <SingleItemContainer {...h} key={i}/>)}</>;
};

let singletonContainerMountedAutomatically = false;

export const addHook = hook => {
  if (!singletonContainerMounted && !singletonContainerMountedAutomatically) {
    singletonContainerMountedAutomatically = true;
    mount(SingleItemContainer);
  }

  mountIntoContainer(hook);
};
