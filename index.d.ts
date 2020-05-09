
export = ReactSingletonHook;
export as namespace ReactSingletonHook;

declare namespace ReactSingletonHook {
  function singletonHook<ValueType>(initialState: ValueType | (() => ValueType), useHook: () => ValueType): () => ValueType;
  function SingletonHooksContainer(): any;
}
