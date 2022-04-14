## `@ndustrial/nd-header-react`

### Install

```bash
npm install @ndustrial/nd-header-react
```

or

```bash
yarn add @ndustrial/nd-header-react
```

### Documentation

The `@ndustrial/nd-header-react` component renders the main header containing the application logo and any children passed.

This package requires [React Router](https://github.com/ReactTraining/react-router).

Additional styles are added via [styled-components](https://www.styled-components.com/) and rely on a theme. There should be a [`<ThemeProvider />`](https://www.styled-components.com/docs/advanced) at the top level of your application. If a custom theme is not needed, a base theme is available [here](../nd-theme-react).

By default, clicking the logo routes you to `/`. If you pass in a prop for `homePath`, clicking the logo routes there instead.

### Usage

```javascript
import { Header } from '@ndustrial/nd-header-react';

render() {
  return (
    <Header appName="nSight" logoSrc="../images/logoUrl.svg" />
  );
}

```

```javascript
import { Header } from '@ndustrial/nd-header-react';

render() {
  return (
    <Header appName="nSight" homePath={{pathname: '/new-path', search: '?foo=bar'}} logoSrc="../images/logoUrl.svg" />
  );
}

```

```javascript
import { Header } from '@ndustrial/nd-header-react';

render() {
  return (
    <Header appName="nSight" logoSrc="../images/logoUrl.svg">
      <div>Child</div>
    </Header>
  );
}
```

```
propTypes = {
  appName: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  homePath: PropTypes.string,
  logoSrc: PropTypes.string
};
```

```
defaultProps = {
  homePath: '/'
}
```
