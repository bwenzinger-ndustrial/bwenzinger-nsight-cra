## `@ndustrial/nd-dropdown-react`

### Install

```bash
npm install @ndustrial/nd-dropdown-react
```

or

```bash
yarn add @ndustrial/nd-dropdown-react
```

### Documentation

`@ndustrial/nd-dropdown-react` is meant to be used as a replacement for a `select` element. It will usually be a controlled component driven by a tool like `react-final-form`. It is built with [`@ndustrial/nd-menu-button-react`](https://github.com/ndustrialio/nd-react-common/tree/v1/base/packages/nd-menu-button-react) and [`react-aria-menubutton`](https://github.com/davidtheclark/react-aria-menubutton) and additional documentation can be found in their repositories.

### Usage

```javascript
import {
  DropdownButton,
  Menu,
  MenuItem,
  Wrapper
} from '@ndustrial/nd-dropdown-react';

function ParentComponent({ selectedValue, onChange }) {
  return (
    <Fragment>
      <label>Counties</label>
      <Wrapper onSelection={(newValue) => onChange((newValue)}>
        <DropdownButton>{selectedValue}</DropdownButton>
        <Menu>
          <MenuItem>Alamance</MenuItem>
          <MenuItem>Durham</MenuItem>
          <MenuItem>Orange</MenuItem>
          <MenuItem>Wake</MenuItem>
        </Menu>
      </Wrapper>
    </Fragment>
  );
}
```

### Future Development

- Creating another wrapper element that involves an actual, hidden `select` element might be useful for non-controlled forms.
