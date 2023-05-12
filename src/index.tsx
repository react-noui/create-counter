import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

/**
 * Interface for `useContext(MyCounter);`. See `makeCounterContext()`.
 */
interface ICounterContext {
  count: number;
  /**
   * Adds n to context.count
   * @n number - defaults to 1
   */
  add: (n?: number) => void;
}

export interface CounterContext {
  Context: React.Context<ICounterContext>;
  Provider: (props: PropsWithChildren) => JSX.Element;
}

/**
 * Make a CounterContext.
 * @example
 * const ClickCounter = makeCounterContext();
 * function Parent() {
 *   return <ClickCounter.Provider><Consumer /></ClickCounter.Provider>
 * }
 */
export function makeCounterContext(): CounterContext {
  const Context = createContext<ICounterContext>({
    count: 0,
    add: () => undefined,
  });
  function Provider(props: PropsWithChildren) {
    const parent = useContext(Context);
    const [count, setCount] = useState(0);
    const add = useCallback(
      (n = 1) => {
        setCount((old) => old + n);
        parent.add(n);
      },
      [setCount, parent],
    );
    return <Context.Provider value={{ count, add }} {...props} />;
  }
  return { Context, Provider };
}

/**
 * Use counter from `makeCounterContext()`.
 * @example
 * const ClickCounter = makeCounterContext();
 * function Parent() {
 *   return <ClickCounter.Provider><Consumer /></ClickCounter.Provider>
 * }
 * function Consumer() {
 *   const { count, add: countClick } = useCounter(ClickCounter);
 *   const handleClick = () => { countClick() }
 *   //...
 * }
 */
export function useCounter(counter: CounterContext) {
  return useContext(counter.Context);
}
