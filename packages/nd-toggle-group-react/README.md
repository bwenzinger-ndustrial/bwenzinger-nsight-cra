## `@ndustrial/nd-toggle-group-react`

### Install

```bash
npm install @ndustrial/nd-toggle-group-react
```

or

```bash
yarn add @ndustrial/nd-toggle-group-react
```

### Usage

There are two named exports used to compose a complete ToggleGroup:

```javascript
import { ToggleGroup, ToggleOption } from '@ndustrial/nd-toggle-group-react';
```

All of the named exports are [`styled-components`](https://www.styled-components.com/) so you should be able to use them just like
any other styled component.

#### As a controlled components

The main way of using the ToggleGroup is as a controlled component where your parent component controls which item is selected:

```jsx
class ParentComponent extends Component {
  state = {
    selectedValue: 1
  };

  render() {
    return (
      <ToggleGroup>
        <ToggleOption
          isSelected={this.state.selectedValue === 1}
          onClick={() => this.setState({ selectedValue: 1 })}
        >
          Option 1
        </ToggleOption>
        <ToggleOption
          isSelected={this.state.selectedValue === 2}
          onClick={() => this.setState({ selectedValue: 2 })}
        >
          Option 2
        </ToggleOption>
      </ToggleGroup>
    );
  }
}
```

#### ToggleOption Props

- disabled: This will disable that option.
- size: You can put `small` here and get a smaller version. Leaving it off will give you the default size
