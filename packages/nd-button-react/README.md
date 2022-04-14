## `@ndustrial/nd-button-react`

### Install

```bash
npm install @ndustrial/nd-button-react
```

or

```bash
yarn add @ndustrial/nd-button-react
```

### Usage

There are a few named exports out of this package as shown below:

```javascript
import {
  ButtonGroup,
  DangerButton,
  GhostButton,
  PrimaryButton,
  SecondaryButton
} from '@ndustrial/nd-button-react';

render() {
  return (
    <ButtonGroup>
      <PrimaryButton>Primary</PrimaryButton>
      <SecondaryButton>Secondary</SecondaryButton>
      <GhostButton>Ghost</GhostButton>
      <DangerButton>Warning</DangerButton>
    </ButtonGroup>
  );
}
```

All of the named exports are [`styled-components`](https://www.styled-components.com/) so you should be able to use them just like
any other styled component.

A common situation is when you may need to style a link like a button. You can utilize the ["as" polymorphic prop](https://www.styled-components.com/docs/api#as-polymorphic-prop) to do something like below:

```javascript
import { PrimaryButton } from '@ndustrial/nd-button-react';
import { Link } from 'react-router-dom';

render() {
  return (
    <PrimaryButton as={Link} to="/some-link">
      Link with Primary styles
    </PrimaryButton>
  );
}

// or if you're not using React Router

render() {
  return (
    <PrimaryButton as="a" href="/some-link">
      Link with Primary styles
    </PrimaryButton>
  );
}
```

NOTE: If you use the basic `<Button />` component you may need additional styles which you can do something like so:

```javascript
import { PrimaryButton } from '@ndustrial/nd-button-react';
import styled from 'styled-components';

const StyledLink = styled(PrimaryButton)`
  // additional styles here
`;

render() {
  return (
    <StyledLink as="a" href="/some-link">
      Extra stylish link button
    </StyledLink>
  );
}
```

### PropTypes

```javascript
Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func
};

// along with any other props you can pass to a button component
```
