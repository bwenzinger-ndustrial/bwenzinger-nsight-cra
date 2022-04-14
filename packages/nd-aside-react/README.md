## `@ndustrial/nd-aside-react`

### Install

```bash
npm install @ndustrial/nd-aside-react
```

or

```bash
yarn add @ndustrial/nd-aside-react
```

### Documentation

The `@ndustrial/nd-aside-react` component is used to display an aside message to the end user, usually within the main content of a page.

Additional styles are added via [styled-components](https://www.styled-components.com/) and rely on a theme. There should be a [`<ThemeProvider />`](https://www.styled-components.com/docs/advanced) at the top level of your application. If a custom theme is not needed, a base theme is available [here](https://github.com/ndustrialio/nd-react-common/tree/v1/base/packages/nd-theme-react).

### Usage

Below displays how to use `AsideGroup` which displays multiple aside messages:

```javascript
import {
  Aside,
  AsideGroup
} from '@ndustrial/nd-aside-react';
import {
  CheckCircle,
  WarningCircle,
  WarningTriangle
} from '@ndustrial/nd-icons-svg';

render() {
  return (
    <AsideGroup>
      <Aside
        icon={(props) => <WarningTriangle {...props} />}
        type="failure"
        title="Failure Message"
      >
        Test Aside Message
      </Aside>
      <Aside
        icon={(props) => <WarningCircle {...props} />}
        type="primary"
        title="Informational Message"
      >
        Test Aside Message
      </Aside>
      <Aside
        icon={(props) => <CheckCircle {...props} />}
        type="success"
        title="Success Message"
      >
        Test Aside Message
      </Aside>
    </AsideGroup>
  );
}
```

Below displays how to use a singular aside message, such as Aside with a type of failure:

```javascript
import {
  Aside
} from '@ndustrial/nd-aside-react';
import { WarningTriangle } from '@ndustrial/nd-icons-svg';

render() {
  return (
    <Aside
      icon={(props) => <WarningTriangle {...props} />}
      type="failure"
      title="Failure Message"
    >
      Test Aside Message
    </Aside>
  );
}
```

Below displays how to use a singular aside message with an action button, such as Aside with a dismiss button:

```javascript
import { Aside } from '../src/index';
import { WarningTriangle } from '@ndustrial/nd-icons-svg';

render() {
  return (
    <Aside
      dismissible
      icon={(props) => <WarningTriangle {...props} />}
      type="failure"
      title="Failure Message"
    >
      Test Aside Message
    </Aside>
  );
}
```

### PropTypes

```
Aside.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dismissible: PropTypes.bool,
  icon: PropTypes.func,
  onDismiss: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string
}
```
