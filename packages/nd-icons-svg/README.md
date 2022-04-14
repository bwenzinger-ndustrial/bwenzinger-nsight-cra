## `@ndustrial/nd-icons-svg`

### Install

```bash
npm install @ndustrial/nd-icons-svg
```

or

```bash
yarn add @ndustrial/nd-icons-svg
```

### Documentation

The `@ndustrial/nd-icons-svg` package contains SVG icons.

### Usage

There are two ways to use this package.

#### 1. React Components

When building this package, it utilizes [`SVGR`](https://www.smooth-code.com/open-source/svgr/docs/getting-started/) which allows the package to export each SVG as a React component.

```javascript
import { NsightLogo } from '@ndustrial/nd-icons-svg';

function SomeComponent() {
  return (
    <div>
      // Other components
      <NsightLogo />
    </div>
  );
}
```

When building the React components with SVGR, the [icon option](https://www.smooth-code.com/open-source/svgr/docs/options/#icon) is set to `true` so that width and height, by default, will be set to `1em`. You can also pass/spread props down like you would any other component

```javascript
import { NsightLogo } from '@ndustrial/nd-icons-svg';

function SomeComponent(props) {
  const { height, width, ...rest } = props;

  return (
    <div>
      // Other components
      <NsightLogo height={height} width={width} stroke="#000" {...rest} />
    </div>
  );
}
```

#### 2. SVG files

This package contains regular SVG files (e.g. `nsight-logo.svg`, etc.) that you can import into your project and let your tooling (e.g. Webpack) handle them. You will import them from the icons directory and if you're using something like Webpack's [`file-loader`](https://webpack.js.org/loaders/file-loader/) you can do something like below

The outline color of an icon can be controlled by passing a prop of `stroke` into the component. The background color of an icon can be controlled by passing a prop of `fill` into the component.

```javascript
import nsightLogo from '@ndustrial/nd-icons-svg/icons/nsight-logo.svg';

function SomeComponent() {
  return (
    <div>
      <img src={nsightLogo} alt="nsight logo" style={{ stroke: '#000' }} />
    </div>
  );
}
```

### Caveats:

1. There are a couple icons/components that do not currently accept a stroke color on the root element. Their stroke should still be able to be customized with CSS, but it will require nested selectors:

- NsightLogo
