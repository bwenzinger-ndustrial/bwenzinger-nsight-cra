## `@ndustrial/nd-table-react`

### Install

```bash
npm install @ndustrial/nd-table-react
```

or

```bash
yarn add @ndustrial/nd-table-react
```

### Documentation

The `@ndustrial/nd-table-react` component leverages [`react-table`](https://github.com/tannerlinsley/react-table/tree/v6/). Please see their documentation on how to use.

The two main exports from `react-table` can be accessed as named exports like below:

```javascript
import { ReactTable, ReactTableDefaults } from '@ndustrial/nd-table-react';
```

This package also exports the [`HOC Extensions`](https://github.com/tannerlinsley/react-table/tree/v6#hoc-extensions) that are included with `react-table`. You can access them as named exports like below:

```javascript
import {
  treeTableHOC,
  selectTableHOC,
  foldableTableHOC,
  advancedExpandTableHOC
} from '@ndustrial/nd-table-react';
```

### Usage

This package also includes the styles that are included to make this package work (which were bundled with `react-table`). If you're using Weback with something like PostCSS you can use [`postcss-import`](https://github.com/postcss/postcss-import) and try some of the following:

```css
/* in a css file */
@import '@ndustrial/nd-table-react/lib/index.css';
```

```javascript
/* in a js file */
import '@ndustrial/nd-table-react/lib/index.css';
```
