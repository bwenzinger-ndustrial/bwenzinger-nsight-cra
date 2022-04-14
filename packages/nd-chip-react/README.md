## `@ndustrial/nd-chip-react`

### Install

```bash
npm install @ndustrial/nd-chip-react
```

or

```bash
yarn add @ndustrial/nd-chip-react
```

### Usage

```javascript
import { Chip, ChipGroup, ChipIcon, ChipLabel } from '@ndustrial/nd-chip-react';
import { Close } from '@ndustrial/nd-icons-svg';

render() {
  return (
    <Chip>
      <ChipIcon onClick={() => {
        alert('You clicked the Remove icon');
      }}>
        <Close />
      </ChipIcon>
      <ChipLabel>
        Chip Label goes here
      </ChipLabel>
    </Chip>
  );
}
```
