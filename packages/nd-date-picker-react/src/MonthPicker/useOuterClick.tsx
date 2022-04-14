// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';

/**
 * {@link [stackoverlfow](https://stackoverflow.com/a/54292872/844620)}
 */
function useOuterClick(callback: (e: MouseEvent) => void) {
  const callbackRef = useRef<(e: MouseEvent) => void>(); // initialize mutable callback ref
  const innerRef = useRef<any>(); // returned to client, who sets the "border" element

  // update callback on each render, so second useEffect has most recent callback
  useEffect(() => {
    callbackRef.current = callback;
  });
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
    function handleClick(e: MouseEvent) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      ) {
        callbackRef.current(e);
      }
    }
  }, []); // no dependencies -> stable click listener

  return innerRef;
}

export default useOuterClick;
