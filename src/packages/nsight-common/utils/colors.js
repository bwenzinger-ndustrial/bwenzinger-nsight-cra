import { isNumber } from 'lodash';
import { mix } from 'polished';

function mixFactory(mixColor) {
  return function(baseColor, multiplier) {
    if (!(isNumber(multiplier) && mixColor && baseColor)) {
      return '';
    }

    return mix(multiplier, mixColor, baseColor);
  };
}

const blacken = mixFactory('#000');
const whiten = mixFactory('#fff');

export { blacken, whiten };
