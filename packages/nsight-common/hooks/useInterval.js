import { useEffect, useRef } from 'react';

// For more info on how this works, visit : https://overreacted.io/making-setinterval-declarative-with-react-hooks/

function useInterval(callback, delay, conditions = []) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay, conditions]);
}

export default useInterval;
