## `@ndustrial/nd-inputs-react`

### Install

```bash
npm install @ndustrial/nd-inputs-react
```

or

```bash
yarn add @ndustrial/nd-inputs-react
```

### Usage

There are a few named exports out of this package as shown below:

```javascript
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormControlLabelAdapter,
  FormGroup,
  FormLabel,
  InputLabel,
  InputText,
  InputTextField,
  InputTextFieldAdapter,
  RadioButton,
  RadioGroup
} from '@ndustrial/nd-inputs-react';
```

#### Text Fields

The most convenient way to render a text or number input is via the `<InputTextField />` component which handles label placement:

```javascript
render() {
  return (
    <React.Fragment>
      <InputTextField
        id="basic-text-field"
        label="Basic Text Field"
        onChange={handleChange('basic-text-field')}
        value={state['basic-text-field']}
      />

      <InputTextField
        id="basic-number-field"
        label="Basic Number Field"
        onChange={handleChange('basic-number-field')}
        type="number"
        value={state['basic-number-field']}
      />
    </React.Fragment>
  );
}
```

It can also be built up from component pieces:

```javascript
render() {
  return (
    <FormControl>
      <InputLabel htmlFor="custom-text-field">Custom Text Field</InputLabel>
      <InputText
        id="custom-text-field"
        onChange={handleChange('custom-text-field')}
        value={state['custom-text-field']}
      />
    </FormControl>
  );
}
```

OR

```javascript
render() {
  return (
    <FormControl>
      <label>
        <InputLabel as="span">Custom Text Field</InputLabel>
        <InputText
          id="custom-text-field"
          onChange={handleChange('custom-text-field')}
          value={state['custom-text-field']}
        />
      </label>
    </FormControl>
  );
}
```

And can also be use to render a `<textarea></textarea>` tag using the `multiline` prop:

```javascript
render() {
  return (
    <InputTextField
      id="textarea-field"
      label="Textarea Field"
      multiline
      onChange={handleChange('textarea-field')}
      value={state['textarea-field']}
    />
  );
}
```

#### Checkboxes

A `<Checkbox />` can be used on its own, but more often it will be used as the control for a `<FormControlLabel />`:

```javascript
render() {
  return(
    <React.Fragment>
      <Checkbox
        aria-label="Basic Checkbox"
        checked={state['basic-checkbox']}
        id="basic-checkbox"
        onChange={handleChange('basic-checkbox')}
      />

      <FormControlLabel
        checked={state['control-label-checkbox']}
        control={(props) => <Checkbox {...props}/>}
        id="control-label-checkbox"
        label="Control Label Checkbox"
        onChange={handleChange('control-label-checkbox')}
      />
    </React.Fragment>
  );
}
```

Multiple checkboxes can be arranged using `<FormGroup></FormGroup>`. flex-direction can be controlled via the `inline` prop:

```javascript
render() {
  return(
    <FormControl>
      <FormLabel>Options (Select all that apply)</FormLabel>
      <FormGroup inline>
        <FormControlLabel
          checked={state['option-a']}
          control={(props) => <Checkbox {...props}/>}
          id="option-a"
          label="Option A"
          onChange={handleChange('option-a')}
        />
        <FormControlLabel
          checked={state['option-b']}
          control={(props) => <Checkbox {...props}/>}
          id="option-b"
          label="Option B"
          onChange={handleChange('option-b')}
        />
        <FormControlLabel
          checked={state['option-c']}
          control={(props) => <Checkbox {...props}/>}
          id="option-c"
          label="Option C"
          onChange={handleChange('option-c')}
        />
      </FormGroup>
    </FormControl>
  );
}
```

#### Radio Buttons

A `<RadioButton />` can be used on its own, but more often as the control for `<FormControlLabel />` inside of a `<RadioGroup></RadioGroup>`:

```javascript
render() {
  return(
    <React.Fragment>
      <RadioButton
        aria-label="Radio Button"
        checked={state['radio-button']}
        id="radio-button"
        onChange={handleChange('radio-button')}
      />

      <FormControl>
        <FormLabel>Radio Group</FormLabel>
        <RadioGroup
          id="radio-group"
          onChange={handleChange('radio-group')}
          value={state['radio-group']}
        >
          <FormControlLabel
            control={(props) => <RadioButton {...props} />}
            value="a"
            label="Option A"
          />
          <FormControlLabel
            control={(props) => <RadioButton {...props} />}
            value="b"
            label="Option B"
          />
          <FormControlLabel
            control={(props) => <RadioButton {...props} />}
            disabled
            value="c"
            label="Option C"
          />
        </RadioGroup>
      </FormControl>
    </React.Fragment>
  );
}
```

#### FormHelperText

The `<FormHelperText />` component can be used on its own or rendered as part of `<InputTextField />` or `<FormControl></FormControl>` via the prop `helperText`:

```javascript
render() {
  return (
    <React.Fragment>
       <FormControl>
        <InputLabel htmlFor="custom-text-field">Custom Text Field</InputLabel>
        <InputText
          id="custom-text-field"
          onChange={handleChange('custom-text-field')}
          value={state['custom-text-field']}
        />
        <FormHelpText>Something helpful</FormHelperText>
      </FormControl>

      <InputTextField
        id="validated-text-field"
        helperText={!value2 ? 'Please enter a value' : ''}
        invalid={!value2}
        label="Validated Text Field"
        onChange={(e) => setValue2(e.currentTarget.value)}
        placeholder="Validated"
        value={value2}
      />
    </React.Fragment>
  )
}
```

#### Final Form Adapters

Both `<FormControlLabelAdapter />` and `<InputTextFieldAdapter />` are provided for use with [`react-final-form`](https://github.com/final-form/react-final-form). These components are intended to be passed to the `{ Field } from 'react-final-form'` from via the `component?` prop, but could also be used with the `render?` or `children?` props as well. In any case they exist to translate from the [`FieldRenderProps`](https://github.com/final-form/react-final-form#fieldrenderprops) API to the expected `nd-inputs-react` component props. (In the case of `<FormControlLabelAdapter />` the `type` prop will determine whether a `<Checkbox />` or `<RadioButton />` is rendered):

```javascript
render() {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="text"
            component={InputTextFieldAdapter}
            label="Text"
          />

          <Field
            name="number"
            component={InputTextFieldAdapter}
            label="Number"
            type="number"
          />

          <Field
            name="radio"
            component={FormControlLabelAdapter}
            label="Option 1"
            type="radio"
            value="option 1"
          />
          <Field
            name="radio"
            component={FormControlLabelAdapter}
            label="Option 2"
            type="radio"
            value="option 2"
          />

          <Field
            name="checkbox"
            component={FormControlLabelAdapter}
            label="Checkbox"
            type="checkbox"
          />

          <button>
            Submit
          </button>
        </form>
      )}
    />
  )
}
```
