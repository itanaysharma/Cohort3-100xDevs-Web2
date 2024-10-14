// ### What is `useRef`?

import { useRef } from "react";

// In React, `useRef` is a hook that provides a way to create a **reference** to a value or a DOM element that persists across renders but **does not trigger a re-render** when the value changes.

// ### Key Characteristics of `useRef`:

// 1. **Persistent Across Renders**: The value stored in `useRef` persists between component re-renders. This means the value of a `ref` does not get reset when the component re-renders, unlike regular variables.
// 2. **No Re-Renders on Change**: Changing the value of a `ref` (`ref.current`) does **not** cause a component to re-render. This is different from state (`useState`), which triggers a re-render when updated.

function UseRefUse1() {
  const inputRef = useRef();
  function focusInput() {
    //Not recommended because
    //1. May cause inconsistency between virtual DOM and Actual DOM
    //2. Unique IDs: In React, IDs should be unique within the entire application. If you use the same id="name" somewhere else in another component, this can cause unexpected behavior.
    inputRef.current.focus();
  }
  return (
    <div>
      Sign Up
      <input ref={inputRef} />
      <input />
      <button onClick={focusInput}>Focus on the input</button>
    </div>
  );
}
export { UseRefUse1 };
