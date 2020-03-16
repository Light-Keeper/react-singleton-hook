import React, { useState, useEffect } from 'react';
import { SingleItemContainer } from './SingleItemContainer';
import { mount } from '../utils/env';
import { warning } from '../utils/warning';

let SingletonHooksContainerMounted = false;
let SingletonHooksContainerRendered = false;
let SingletonHooksContainerMountedAutomatically = false;

let mountQueue = [];
const mountIntoContainerDefault = (item) => { mountQueue.push(item); };
let mountIntoContainer = mountIntoContainerDefault;

export const SingletonHooksContainer = () => {
  SingletonHooksContainerRendered = true;
  useEffect(() => {
    if (SingletonHooksContainerMounted) {
      warning('SingletonHooksContainer is mounted second time. '
        + 'You should mount SingletonHooksContainer before any other component and never unmount it.'
        + 'Alternatively, dont use SingletonHooksContainer it at all, we will handle that for you.');
    }
    SingletonHooksContainerMounted = true;
    return () => process.env.NODE_ENV !== 'test' && warning('SingletonHooksContainer is removed from DOM. its not supported, singleton hooks will stop updating.');
  }, []);

  const [hooks, setHooks] = useState([]);

  useEffect(() => {
    mountIntoContainer = item => setHooks(hooks => [...hooks, item]);
    setHooks(mountQueue);
  }, []);

  return <>{hooks.map((h, i) => <SingleItemContainer {...h} key={i}/>)}</>;
};


export const addHook = hook => {
  if (!SingletonHooksContainerRendered && !SingletonHooksContainerMountedAutomatically) {
    SingletonHooksContainerMountedAutomatically = true;
    mount(SingletonHooksContainer);
  }

  mountIntoContainer(hook);
};

export const resetLocalStateForTests = () => {
  SingletonHooksContainerMounted = false;
  SingletonHooksContainerRendered = false;
  SingletonHooksContainerMountedAutomatically = false;
  mountQueue = [];
  mountIntoContainer = mountIntoContainerDefault;
};
