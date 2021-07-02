
export = ReactSingletonHook;
export as namespace ReactSingletonHook;

declare namespace ReactSingletonHook {
  function singletonHook<ValueType, Args extends any[]>(initialState: ValueType | (() => ValueType), useHook: (...args: Args) => ValueType): (...args: Args) => ValueType;
  function SingletonHooksContainer(): any;
}
