import { useEffect } from 'react';

export function useKeyPress(callback, keyCodes, target) {
  const handler = (event) => {
    if (event.target === target.current && keyCodes.includes(event.code)) {
      event.preventDefault();
      callback(event.code);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
