# create-counter
[![gzip size](https://img.badgesize.io/https://unpkg.com/react-noui/create-counter?compression=gzip&amp;style=flat-square)](https://unpkg.com/react-noui/create-counter)
[![npm version](https://img.shields.io/npm/v/react-noui/create-counters.svg?style=flat-square)](https://www.npmjs.com/package/react-noui/create-counter)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

`create-counter` is a simple state tracker for a number you want to add to.

# Installation
```bash
yarn add @react-noui/create-counter
```
Or with `npm`
```bash
npm install --save @react-noui/create-counter
```

# Example
This example shows how you can track different values.
```jsx
import { createCounter } from '@react-noui/create-counter';
// Tracks the total number of clicks within it.
const ClickCounter = createCounter();
// Tracks the total async time spent in ms.
const AsyncTimer = createCounter();

function App() {
  return (
    <AsyncTimer.Provider>
      <ClickCounter.Provider>
        Total clicks <ShowClicks />
        <ClickCounter.Provider>
          Click A totoal: <ShowClicks />
          <AddButton>Button A</AddButton>
        </ClickCounter.Provider>
        <ClickCounter.Provider>
          Click B total: <ShowClicks />
          <AddButton>Button B</AddButton>
        </ClickCounter.Provider>
      </ClickCounter.Provider>
    </AsyncTimer.Provider>
  )
}

function ShowClicks() {
  const { count } = useCounter(ClickCounter);
  return <span>{count}</span>
}
function AddButton({children}) {
  const { add: addClick } = useCounter(ClickCounter);
  const { add: addTime } = useCounter(AsyncTimer);
  const handleClick = useCallback(() => {
    const backThen = Date.now();
    addClick();
    fetch('/stuff').then(() => {
      addTime(Date.now() - backThen);
    });
  }, [addClick, addTime]);
  return <button onClick={handleClick}>{children}</button>;
}
```
