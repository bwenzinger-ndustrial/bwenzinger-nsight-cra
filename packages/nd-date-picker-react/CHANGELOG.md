# Changelog

## v4.3.2 (2022-2-28)

- Added missing dependency

## v4.3.0 (2021-10-19)

- Updates `DateRangePicker` to accept a onStartDateChange property

## v4.2.0 (2021-10-19)

- Updates `SingleDatePicker` to accept a width property, allowing users to set the width of the input

## v4.1.5 (2021-10-11)

- republish of v4.1.4 due to errors

## v4.1.4 (2021-10-11)

- fix: fixed layout issue where month datepicker content was not centered.

## v4.1.3 (2021-04-29)

- fix: adds a preventative check to `MonthRangeInput` so that blur events don't cause unnecessary date updates, which caused the month picker to unexpectedly collapse.

## v4.1.2 (2021-04-28)

- For MultiCalendarComparisonWidget, changing the onPrimaryDatesChange and onComparisonDatesChange callbacks passed in would not update the internal change callback used, as this was built on initial render and was not being regenerated on changes to the aforementioned props. This is now fixed.

## v4.1.1 (2021-04-26)

- Allow the caller to have some flexibility with defaultSelectedUnit, allowing for changes in this prop to change the selectedUnit. Previously, this value would only set the selectedUnit on initial load, and if the prop changed on any subsequent renders the selectedUnit would not change. This was resulting in a situation where the caller would provide a default value to defaultUnitSelection, but would then load some data and update the defaultUnitSelection. This updated defaultUnitSelection would not be used however. This change allows the caller to update this prop as the page loads, ensuring that the correct defaultUnitSelection is used.

## v4.1.0 (2021-02-23)

- Adds manual input error handling to `MonthPicker`

## v4.0.1 (2021-02-19)

- Updating icon library to 3.1.1

## v4.0.0 (2021-02-19)

**New**

- Exports:
  - `datePickerConstants`
  - `DateRangePicker` - A range picker that uses days as the unit of measure
  - `SingleDatePicker` - A single date picker that uses days as the unit of measure
  - `SingleDatePickerAdapter` - An input adapter for `redux-form` that utilizes the `SingleDatePicker`
  - `MultiCalendarComparisonWidget` -- A dynamic component for creating two date ranges using either a day calendar or a month calendar
  - `MonthPicker` - A range picker that uses months as the unit of measure

**BREAKING**

- The following exports no longer exist:
  - `DatePicker`
  - `DatePickerInput`
  - `DatePickerInputAdapter`
- Many, if not all props that can be passed down have changed
- The underlying library is now `react-dates` and requires new peer dependencies

## v3.1.0 (2020-03-30)

- Updating icon library to 3.1.0

## v3.0.5 (2019-02-26)

### Changed

- Updated underlying `@ndustrial/nd-inputs-react` package

## v3.0.4 (2019-01-14)

### Changed

- Upgraded underlying `styled-components` dependency to v5

## v3.0.3 (2019-01-01)

- Updated underlying `@ndustrial/nd-inputs-react` package

## v3.0.2 (2019-12-24)

- Updated underlying `@ndustrial/nd-inputs-react` package

## v3.0.1 (2019-10-31)

### Added

- Added `@ndustrial/nd-inputs-react` as a dependency

## v3.0.0 (2019-09-26)

- In `@ndustrial/nd-icons-svg`, changed stroke to control color outline instead of fill. Fill now controls the background of the icon.
- Updated `@ndustrial/nd-icons-svg` package to v3.0.0

## v2.0.2 (2019-09-17)

### Changed

- Parent `nd-react-common` hit 1.0.0!

## v2.0.1 (2019-08-15)

### Changed

- Imported `FormHelperText` from `@ndustrial/nd-inputs-react` is no longer undefined;

## v2.0.0 (2019-08-15)

### Changed

- Adjusted the handling of the theme prop for the new structure of `@ndustrial/nd-theme-react`;

## v1.1.0 (2019-07-19)

### Added

- DatePickerInputAdapter (react-final-form)
- Default Calendar icon to DatePickInput

## v1.0.0 (2019-06-11)

### Added

- Added DatePicker and DatePickerInput components([#140](https://github.com/ndustrialio/nd-react-common/pull/140))
