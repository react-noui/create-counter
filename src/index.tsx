import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

/**
 * Interface for `useContext(MyCounter);`. See `createCounter()`.
 */
interface ICreateCounter {
  count: number;
  /**
   * Adds n to context.count
   * @n number - defaults to 1
   */
  add: (n?: number) => void;
}

export interface CreateCounter {
  Context: React.Context<ICreateCounter>;
  Provider: (props: PropsWithChildren) => JSX.Element;
}

/**
 * Create a CreateCounter.
 * @example
 * const ClickCounter = createCounter();
 * function Parent() {
 *   return <ClickCounter.Provider><Consumer /></ClickCounter.Provider>
 * }
 */
export function createCounter(): CreateCounter {
  const Context = createContext<ICreateCounter>({
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
 * Use counter from `createCounter()`.
 * @example
 * const ClickCounter = createCounter();
 * function Parent() {
 *   return <ClickCounter.Provider><Consumer /></ClickCounter.Provider>
 * }
 * function Consumer() {
 *   const { count, add: countClick } = useCounter(ClickCounter);
 *   const handleClick = () => { countClick() }
 *   //...
 * }
 */
export function useCounter(counter: CreateCounter) {
  return useContext(counter.Context);
}
