[Automatic batching for fewer renders in React 18](https://github.com/reactwg/react-18/discussions/21)
1. react 18之前只会针对浏览器事件中的setState进行批量更新，在异步回掉等函数中不会批量更新，可以使用ReactDOM.unstable_batchedUpdate
2. react 18将promise、setTimeout异步回调函数中的setState也纳入批量更新中。
3. react 18将promise、setTimeout异步回调函数中的setState也默认纳入批量更新中。
4. 如果不想使用批量更新，可以使用ReactDOM.flushSync

[codesandbox](https://codesandbox.io/s/automatic-batching-17-vk3o3?file=/src/App.js:0-805)
```jsx
import React, { useState } from "react";
// import {unstable_batchedUpdates} from "react-dom";
// import {flushSync} from 'react';
import "./styles.css";

export default function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    setFlag((f) => !f);
    setCount((c) => c + 1);
  }

  // function handleClick() {
  //   setTimeout(() => {
  //     // unstable_batchedUpdates(() => {
  //     //   setCount((c) => c + 1);
  //     //   setFlag((f) => !f);
  //     // });
  //     setCount((c) => c + 1);
  //     setFlag((f) => !f);
  //   });
  // }

  console.log("render");

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
    </div>
  );
}
```
