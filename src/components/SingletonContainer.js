import React, { useState, useEffect } from 'react';
import { SingleItemContainer } from './SingleItemContainer';
import { mount } from '../utils/env';
import { warning } from '../utils/warning';

let singletonContainerMounted = false;
let singletonContainerRendered = false;
let singletonContainerMountedAutomatically = false;

let mountQueue = [];
const mountIntoContainerDefault = (item) => { mountQueue.push(item); };
let mountIntoContainer = mountIntoContainerDefault;

export const SingletonContainer = () => {
  singletonContainerRendered = true;
  useEffect(() => {
    if (singletonContainerMounted) {
      warning('SingletonContainer is mounted second time. '
        + 'You should mount SingletonContainer before any other component and never unmount it.'
        + 'Alternatively, dont use SingletonContainer it at all, we will handle that for you.');
    }
    singletonContainerMounted = true;
    return () => process.env.NODE_ENV !== 'test' && warning('SingletonContainer is removed from DOM. its not supported, singleton hooks will stop updating.');
  }, []);

  const [hooks, setHooks] = useState([]);

  useEffect(() => {
    mountIntoContainer = item => setHooks(hooks => [...hooks, item]);
    setHooks(mountQueue);
  }, []);

  return <>{hooks.map((h, i) => <SingleItemContainer {...h} key={i}/>)}</>;
};


export const addHook = hook => {
  if (!singletonContainerRendered && !singletonContainerMountedAutomatically) {
    singletonContainerMountedAutomatically = true;
    mount(SingletonContainer);
  }

  mountIntoContainer(hook);
};

export const resetLocalStateForTests = () => {
  singletonContainerMounted = false;
  singletonContainerRendered = false;
  singletonContainerMountedAutomatically = false;
  mountQueue = [];
  mountIntoContainer = mountIntoContainerDefault;
};
