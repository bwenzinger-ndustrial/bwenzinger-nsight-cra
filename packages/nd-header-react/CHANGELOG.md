# Changelog

## v2.1.2 (2020-02-19)

### Fixed

- Fixed typo in prop types

## v2.1.1 (2020-02-19)

### Updated

- updated`homeRoute` to be an object so search params can be updated correctly

## v2.1.0 (2020-02-17)

### Added

- `homeRoute` added to props to allow for dynamic routing when clicking logo

## v2.0.2 (2019-01-14)

### Changed

- Upgraded underlying `styled-components` dependency to v5

## v2.0.1 (2019-09-17)

### Changed

- Parent `nd-react-common` hit 1.0.0!

## v2.0.0 (2019-08-15)

### Changed

- Adjusted the handling of the theme prop for the new structure of `@ndustrial/nd-theme-react`;

## v1.3.0 (2019-07-11)

## Changed

- Set up Header to allow content to stretch vertically while keeping shorter elements vertically centered

## v1.2.2 (2019-07-08)

## Updated

- The overlay gradient was removed

## v1.2.1 (2019-06-28)

### Updated

- Color was updated from the secondary theme color to the primary theme color
- A child for the header is no longer required

## v1.2.0 (2019-06-24)

### Added

- DEFAULT_HEADER_HEIGHT export that can be used for positioning siblings in parent applications

### Updated

- Adjusted how the Logo Link is laid out within the Header
- Changed breakpoint in Logo Link to include new bigger phones (like the iPhone Xs and Xs Max, or Samsung S10) in the mobile design category

## v1.1.2 (2019-06-17)

### Updated

- Updated `Header` and `HeaderContent` to better support multiple children
  - Children are no longer forced to take up the entire height of the header
  - Children are laid out at either end of the `HeaderContent` container

## v1.1.1 (2019-06-07)

- Fix issue where `Header` gradient bleeds into the rest of the page

## v1.1.0 (2019-06-05)

### Added

- Update `Header` style to keep component at top of page ([#135](https://github.com/ndustrialio/nd-react-common/pull/135))

## v0.0.1 (2019-05-08)

### Added

- Named export `Header` component ([#118](https://github.com/ndustrialio/nd-react-common/pull/118))
