## `@ndustrial/nd-flash-message-react`

### Install

```bash
npm install @ndustrial/nd-flash-message-react
```

or

```bash
yarn add @ndustrial/nd-flash-message-react
```

### Documentation

The `@ndustrial/nd-flash-message-react` component is used to display an important message to the end user, usually at the top of the viewable screen area.

Additional styles are added via [styled-components](https://www.styled-components.com/) and rely on a theme. There should be a [`<ThemeProvider />`](https://www.styled-components.com/docs/advanced) at the top level of your application. If a custom theme is not needed, a base theme is available [here](https://github.com/ndustrialio/nd-react-common/tree/v1/base/packages/nd-theme-react).

### Usage

Below displays how to use `FlashMessageGroup` which displays multiple flash messages:

```javascript
import {
  FlashMessage,
  FlashMessageGroup
} from '@ndustrial/nd-flash-message-react';
import {
  CheckCircle,
  Information,
  WarningTriangle
} from '@ndustrial/nd-icons-svg';

render() {
  return (
    <FlashMessageGroup>
      <FlashMessage
        icon={(props) => <WarningTriangle {...props} />}
        type="failure"
      >
        Test Flash Message
      </FlashMessage>
      <FlashMessage
        icon={(props) => <Information {...props} />}
        type="primary"
      >
        Test Flash Message
      </FlashMessage>
      <FlashMessage
        icon={(props) => <CheckCircle {...props} />}
        type="success"
      >
        Test Flash Message
      </FlashMessage>
    </FlashMessageGroup>
  );
}
```

Below displays how to use a singular flash message, such as FlashMessage with a type of failure:

```javascript
import {
  FlashMessage
} from '@ndustrial/nd-flash-message-react';
import { WarningTriangle } from '@ndustrial/nd-icons-svg';

render() {
  return (
    <FlashMessage
      icon={(props) => <WarningTriangle {...props} />}
      type="failure"
    >
      Test Flash Message
    </FlashMessage>
  );
}
```

Below displays how to use a singular flash message with an action button, such as FlashMessage with a dismiss button:

```javascript
import { FlashMessage } from '../src/index';
import { WarningTriangle } from '@ndustrial/nd-icons-svg';

render() {
  return (
    <FlashMessage
      dismissible
      icon={(props) => <WarningTriangle {...props} />}
      type="failure"
    >
      Test Flash Message
    </FlashMessage>
  );
}
```

### PropTypes

```
FlashMessage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dismissible: PropTypes.bool,
  icon: PropTypes.func,
  onDismiss: PropTypes.func,
  type: PropTypes.string
}
```
