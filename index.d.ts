export = ReactSingletonHook;
export as namespace ReactSingletonHook;

declare namespace ReactSingletonHook {
  function singletonHook<ValueType>(
    initialState: ValueType | (() => ValueType),
    useHook: () => ValueType
  ): () => ValueType;

  function SingletonHooksContainer(): JSX.Element;
  /**
   * Callback that resets the local state for tests.
   *
   * Do not use in production!
   */
  function resetLocalStateForTests(): void;
}
