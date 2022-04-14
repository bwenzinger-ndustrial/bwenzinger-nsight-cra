import { keyframes } from 'styled-components';

export const createFadeOut = function (maxHeight = '400px') {
  return keyframes`
    0% {
      opacity: 1;
      max-height: ${maxHeight};
    }

    100% {
      opacity: 0;
      max-height: 0;
      visibility: hidden;
    }
  `;
};
