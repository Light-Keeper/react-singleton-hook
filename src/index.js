import { singletonHook } from './singletonHook';
import { SingletonHooksContainer, resetLocalStateForTests } from './components/SingletonHooksContainer';

export {
  singletonHook,
  SingletonHooksContainer,
  resetLocalStateForTests
};

const ReactSingletonHook = {
  singletonHook,
  SingletonHooksContainer,
  resetLocalStateForTests
};

export default ReactSingletonHook;
