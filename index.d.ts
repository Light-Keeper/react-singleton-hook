
export = ReactSingletonHook;
export as namespace ReactSingletonHook;

declare namespace ReactSingletonHook {
  function singletonHook<ValueType>(
      initialState: ValueType | (() => ValueType),
      useHook: () => ValueType,
      options?: {
        unmountIfNoConsumers?: boolean
      }
  ): () => ValueType;

  function SingletonHooksContainer(): any;
}
