## `@ndustrial/nd-user-dropdopdown-react`

### Install

```bash
npm install @ndustrial/nd-user-dropdopdown-react
```

or

```bash
yarn add @ndustrial/nd-user-dropdopdown-react
```

### Documentation

The `@ndustrial/nd-user-dropdopdown-react` component is used to show the logged in user's name, their avatar, and give them some basic menu options (such as logging out). It is built with [`@ndustrial/nd-menu-button-react`](https://github.com/ndustrialio/nd-react-common/tree/v1/base/packages/nd-menu-button-react) and [`react-aria-menubutton`](https://github.com/davidtheclark/react-aria-menubutton).

Additional styles are added via [styled-components](https://www.styled-components.com/) and rely on a theme. There should be a [`<ThemeProvider />`](https://www.styled-components.com/docs/advanced) at the top level of your application. If a custom theme is not needed, a base theme is available [here](../nd-theme-react).

### Usage

```javascript
import {
  UserDropdown,
  UserDropdownItem
} from '@ndustrial/nd-user-dropdown-react';

class Example extends Component {
  handleSelection = (value) => {
    switch (value) {
      case 'action1':
        return alert('Action 1 selected');
      case 'Action 2':
        return alert('Action 2 selected');
      case 'logOut':
        return alert('Logging out user');
    }
  };

  render() {
    return (
      <UserDropdown
        avatarSrc="https://readjack.files.wordpress.com/2010/11/e-train1.jpg"
        onSelection={this.handleSelection}
        userName="Test User"
      >
        <UserDropdownItem value="action1">Action 1</UserDropdownItem>
        <UserDropdownItem value="action2">Action 2</UserDropdownItem>
        <UserDropdownItem value="logOut">Log Out</UserDropdownItem>
      </UserDropdown>
    );
  }
}
```

### PropTypes

```
propTypes = {
  avatarSrc: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onSelection: PropTypes.func.isRequired,
  userName: PropTypes.string
};
```
