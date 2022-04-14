## `@ndustrial/nd-date-picker-react`

### Install

```bash
npm install @ndustrial/nd-date-picker-react
```

or

```bash
yarn add @ndustrial/nd-date-picker-react
```

### Usage

There are a few named exports out of this package as shown below:

```javascript
import {
  DateRangeComparisonController,
  DateRangePicker,
  SingleDatePicker,
  SingleDatePickerAdapter
} from '@ndustrial/nd-date-picker-react';
```

All of the named exports are [`styled-components`](https://www.styled-components.com/) so you should be able to use them just like
any other styled component.

The date picker components leverage [`react-day-picker`](http://react-day-picker.js.org/) with a few additional styles added. Please see their documentation on how to use.

This package also includes the styles that are included to make this package work (which were bundled with `react-day-picker`). You'll need to be able to do something like

```css
/* in a css file */
@import '@ndustrial/nd-date-picker-react/lib/index.css';
```

```javascript
/* in a js file */
import '@ndustrial/nd-date-picker-react/lib/index.css';
```

#### MonthPicker

A controlled component that facilitates setting a date range based on month selections (i.e. 01/2000 - 05/2001). It will render an
input where the range can be typed, as well as a clickable calendar where dates can be clicked. Years can be toggled via a horizontal scrolling selector. Relies heavily on [moment.js](https://momentjs.com/docs/)

required props:

```
range: PropTypes.shape({
    from: momentPropTypes.momentObj,
    to: momentPropTypes.momentObj
}).isRequired

onSetRange: PropTypes.func.isRequired

```

```jsx
render() {
  return (
    <MonthPicker
      range={range}
      onSetRange={onSetRange} />
  );
}
```

optional props:

```
minDate: momentPropTypes.momentObj - smallest date to show (only uses the year part)
maxDate: momentPropTypes.momentObj - largest date to show (only uses the year part)
initialDate: momentPropTypes.momentObj - the initial calendar year to show (only uses the year)
color: PropTypes.string - a valid css color string to use ass accent color for selections
disabled: PropTypes.bool - is the datepicker disabled and unclickable
renderCalendarInfo: PropTypes.func - content to be rendered between date input, and date picker when the picker is focused
maxSelectable: momentPropTypes.momentObj - the max date that can be selected as part of the range
endDateOffset: PropTypes.func - a function that takes a moment object parameter and returns another moment object parameter to use as an end date.  Used to auto-select an end date after only clicking on a start date
```

#### MultiCalendarComparisonWidget

A controlled component that renders two date pickers of the same type, `MonthPicker` or `DateRangePicker`, that display a calendar of months or days, respectively. The date pickers are used to create two relative date ranges, a primary date range, and a comparison date range (which is derived from the primary). Uses `datePickerConstants` to set the date picker type. Relies heavily on [moment.js](https://momentjs.com/docs/)

required props:

```
label: PropTypes.string,
  onComparisonDatesChange: PropTypes.func - sets the comparison date range.  Takes an object {startDate, endDate} as a param
  onPrimaryDatesChange: PropTypes.func - sets the primary date range.  Takes an object {startDate, endDate} as a param

  comparisonDates: PropTypes.shape({
    from: momentPropTypes.momentObj,
    to: momentPropTypes.momentObj
  }) - an initial comparison date range

  primaryDates: PropTypes.shape({
    from: momentPropTypes.momentObj,
    to: momentPropTypes.momentObj
  }) - an initial primary date range

```

```jsx
<MultiCalendarComparisonWidget
  onPrimaryDatesChange={onPrimaryDatesChange}
  onComparisonDatesChange={onComparisonDatesChange}
  primaryDates={primaryDates}
  comparisonDates={comparisonDates}
  calendarType={constants.calendarTypes.MONTH}
  autoFillComparisonRangeEndDate={false}
/>
```

optional props:

```
calendarType: PropTypes.oneOf([...Object.values(datePickerConstants.calendarTypes)]) - determines the type of calendar MonthPicker or DateRangePicker.  Should be set using datePickerConstants
autoFillComparisonRangeEndDate: PropTypes.bool - should the comparison end date be set automatically when the start date is selected, based on the length of the primary date range
label: PropTypes.string - a label
```

#### DatePickerInput

This semi-controlled component pairs `DayPickerInput` from `react-day-picker` with `InputText` from `nd-inputs-react` to create a styled date picker input field. The base `DayPickerInput` maintains an internal state, but for our purposes we will be treating it lke a fully controlled component. Calendar selections and valid typed inputs are exposed via an `onDayChange` prop. `DatePickerInput` also handles `label` and `helperText` placement:

```jsx
render() {
  return (
    <DatePickerInput
      label="Basic Date Picker Input"
      name="basic-date-picker-input"
      onDayChange={handleChange('basic-date-picker-input')}
      value={state['basic-date-picker-input']}
    />
  );
}
```

#### Final Form Adapter

`<DatePickerInputAdapter />` is provided for use with [`react-final-form`](https://github.com/final-form/react-final-form). This component is intended to be passed to the `{ Field } from 'react-final-form'` from via the `component?` prop, but could also be used with the `render?` or `children?` props as well. In any case it exists to translate from the [`FieldRenderProps`](https://github.com/final-form/react-final-form#fieldrenderprops) API to the expected `nd-date-picker-react` component props and by extension the `react-day-picker` `<DayPickerInput />` props:

```jsx
render() {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="startDate"
            component={DatePickerInputAdapter}
            label="Start Date"
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
