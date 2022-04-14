## `@ndustrial/nd-theme-react`

### Install

```bash
npm install @ndustrial/nd-theme-react
```

or

```bash
yarn add @ndustrial/nd-theme-react
```

### Documentation

The `@ndustrial/nd-theme-react` package exports the following:

1. A `defaultTheme` to be used with Styled Components`[`<ThemeProvider />`](https://www.styled-components.com/docs/advanced)
1. A `<GlobalStyle />` component to be used with Styled Components
1. A `themeHelper` object with helper functions which can be used to mix colors, blacken, and lighten colors

### Usage

#### Default Theme

```javascript
import { defaultTheme } from '@ndustrial/nd-theme-react';
import { ThemeProvider } from 'styled-components';

const Example = () => (
  <ThemeProvider theme={defaultTheme}>
    <div>Example</div>
  </ThemeProvider>
);
```

#### Global Style

```javascript
import { GlobalStyle } from '@ndustrial/nd-theme-react';

const Example = () => (
  <Fragment>
    <GlobalStyle/>
    {other JSX}
  </Fragment>
);
```

#### Theme Helper

```javascript
import { themeHelper } from '@ndustrial/nd-theme-react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) =>
    themeHelper.blacken(theme.colors.primary, 0.8)};
  border-color: ${({ theme }) =>
    themeHelper.mixFactory(theme.colors.secondary)(
      theme.colors.secondary,
      0.5
    )};
  color: ${({ theme }) => themeHelper.whiten(theme.colors.primary, 0.8)};
`;

const Example = () => (
  <Fragment>
    <Button>A button</Button>
  </Fragment>
);
```
