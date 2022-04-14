import { defaultTheme } from '@ndustrial/nd-theme-react';

export const getTheme = () => {
  return new Promise((resolve, reject) => {
    resolve(defaultTheme);
  });
};
