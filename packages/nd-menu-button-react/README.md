## `@ndustrial/nd-menu-button-react`

### Install

```bash
npm install @ndustrial/nd-menu-button-react
```

or

```bash
yarn add @ndustrial/nd-menu-button-react
```

### Documentation

The `@ndustrial/nd-menu-button-react` component leverages [`react-aria-menubutton`](https://github.com/davidtheclark/react-aria-menubutton). Please see their documentation on how to use.

#### Extended features

The standard `react-aria-menubutton` package allows the `Menu` component to be children as a regular React node or a render prop that receives the `isOpen` state. We have extended the `Wrapper` component to also work this way. Please see the usage section below or the Storybook examples for more information.

### Usage

A regular menu without the state passed further down the chain:

```javascript
import {
  Button,
  Menu,
  MenuItem,
  Wrapper
} from '@ndustrial/nd-menu-button-react';

function ExampleMenu() {
  return (
    <Wrapper onSelection={(value) => alert(value)}>
      <Button>Actions</Button>
      <Menu>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    </Wrapper>
  );
}
```

A menu with dynamic content (or styling) based on if the menu is open:

```javascript
import {
  Button,
  Menu,
  MenuItem,
  Wrapper
} from '@ndustrial/nd-menu-button-react';

function ExampleMenu() {
  return (
    <Wrapper onSelection={(value) => alert(value)}>
      {({ isOpen }) => (
        <Fragment>
          <Button>{isOpen ? 'Close Menu' : 'Open Menu'}</Button>
          <Menu>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
          </Menu>
        </Fragment>
      )}
    </Wrapper>
  );
}
```

If `MenuItems` are anything other than a `Link` or `a` tag, `Wrapper`'s' `onSelection` prop should be used to dispatch actions (it will close the menu for you and handles click AND selection with the keyboard). For more information on is, please see the [`react-aria-menubutton` documentation](https://github.com/davidtheclark/react-aria-menubutton#wrapper).
