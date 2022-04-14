const mount = require('enzyme').mount;
const ThemeProvider = require('styled-components').ThemeProvider;

const theme = {
  colors: {},
  fonts: {}
};

module.exports = function(Component) {
  return mount(Component, {
    wrappingComponent: ThemeProvider,
    wrappingComponentProps: { theme }
  });
};
