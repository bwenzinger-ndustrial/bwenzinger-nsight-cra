## `@ndustrial/nd-tooltip-react`

### Install

```bash
npm install @ndustrial/nd-tooltip-react
```

or

```bash
yarn add @ndustrial/nd-tooltip-react
```

### Usage

There is one named export out of this package as shown below:

```javascript
import { Tooltip } from '@ndustrial/nd-tooltip-react';
```

The tooltip component leverages [`@tippy.js/react`](https://github.com/atomiks/tippy.js-react) with a few additional styles added.

For more information on Tippy.js, check the following documentation:

- [`@tippy.js/react`](https://github.com/atomiks/tippy.js-react)
- [Tippy.js](https://atomiks.github.io/tippyjs/)

#### Tooltip

The simplest use of `<Tooltip />` wraps a target element and provide text as content. The tooltip position defaults to up, but will adjust to keep the popover on screen:

```jsx
render() {
  return (
      <Tooltip content="Tooltip content.">
        Target
      </Tooltip>
  );
}
```
