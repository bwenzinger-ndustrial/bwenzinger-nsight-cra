import isNumber from 'lodash.isnumber';
import { mix } from 'polished';

function mixFactory(mixColor: string) {
  return function (baseColor: string, multiplier: string | number) {
    if (!(isNumber(multiplier) && mixColor && baseColor)) {
      return '';
    }

    return mix(multiplier, mixColor, baseColor);
  };
}

const blacken = mixFactory('#000');
const whiten = mixFactory('#fff');

export default {
  blacken,
  mixFactory,
  whiten
};
