import React, { useState, useEffect } from 'react';
import { SingleItemContainer } from './SingleItemContainer';
import { mount } from '../utils/env';
import { warning } from '../utils/warning';

let SingletonHooksContainerMounted = false;
let SingletonHooksContainerRendered = false;
let SingletonHooksContainerMountedAutomatically = false;

let mountQueue = [];
const mountIntoContainerDefault = (item) => {
  mountQueue.push(item);
  return () => {
    throw new Error('Can not unmount container! It is like a bug in react-singleton-hook library, because of unmountIfNoConsumers: true');
    // mountQueue = mountQueue.filter(i => i !== item);
  };
};
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
  }, []);

  const [hooks, setHooks] = useState([]);

  useEffect(() => {
    mountIntoContainer = item => {
      setHooks(hooks => [...hooks, item]);
      return () => {
        setHooks(hooks => hooks.filter(i => i !== item));
      };
    };
    setHooks(mountQueue);
  }, []);

  return <>{hooks.map((h, i) => <SingleItemContainer {...h} key={i}/>)}</>;
};


export const addHook = hook => {
  if (!SingletonHooksContainerRendered && !SingletonHooksContainerMountedAutomatically) {
    SingletonHooksContainerMountedAutomatically = true;
    mount(SingletonHooksContainer);
  }
  return mountIntoContainer(hook);
};

export const resetLocalStateForTests = () => {
  SingletonHooksContainerMounted = false;
  SingletonHooksContainerRendered = false;
  SingletonHooksContainerMountedAutomatically = false;
  mountQueue = [];
  mountIntoContainer = mountIntoContainerDefault;
};
