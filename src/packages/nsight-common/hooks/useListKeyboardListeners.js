import { useEffect, useRef, useState } from 'react';

import { useKeyPress } from './useKeyPress';

export default (inputRef, items, onEnterKey) => {
  const [
    selectedArrowNavigationIndex,
    setSelectedArrowNavigationIndex
  ] = useState(0);

  const selectedIndexRef = useRef(selectedArrowNavigationIndex); // need to use refs because the keyboard events dont have access to the local state
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current = items;
    setSelectedArrowNavigationIndex(0);
    selectedIndexRef.current = 0;
  }, [items]); // need to use refs here because the keyboard events dont have access to the local state

  function setIndexFromArrowNavigation(direction) {
    setSelectedArrowNavigationIndex((currentIndex) => {
      const newIndex = currentIndex + direction;

      if (newIndex > itemsRef.current.length - 1 || newIndex < 0) {
        return currentIndex;
      }

      selectedIndexRef.current = newIndex;
      return newIndex;
    });
  }

  function handleKeyDown(code) {
    switch (code) {
      case 'Enter':
        setSelectedArrowNavigationIndex(0);
        onEnterKey(itemsRef.current[selectedIndexRef.current]); // need to use refs because the keyboard events dont have access to the local state
        selectedIndexRef.current = 0;
        break;
      case 'ArrowUp':
        setIndexFromArrowNavigation(-1); // up - this doesn't need to use refs because we're passing a function in which does have access to the previous state
        break;
      case 'ArrowDown':
        setIndexFromArrowNavigation(1); // down - this doesn't need to use refs because we're passing a function in which does have access to the previous state
        break;
      default:
        break;
    }
  }

  useKeyPress(handleKeyDown, ['Enter', 'ArrowUp', 'ArrowDown'], inputRef);

  return selectedArrowNavigationIndex;
};
