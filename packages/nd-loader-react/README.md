## `@ndustrial/nd-loader-react`

### Install

```bash
npm install @ndustrial/nd-loader-react
```

or

```bash
yarn add @ndustrial/nd-loader-react
```

### Usage

```javascript
import { Loader } from '@ndustrial/nd-loader-react';

render() {
  return (
    <Loader />
  );
}
```

The Loader component can also take a `label` prop like below:

```javascript
import { Loader } from '@ndustrial/nd-loader-react';

render() {
  return (
    <Loader label="This will show below the loader" />
  );
}
```

### PropTypes

```javascript
Loader.propTypes = {
  label: PropTypes.string
};
```
