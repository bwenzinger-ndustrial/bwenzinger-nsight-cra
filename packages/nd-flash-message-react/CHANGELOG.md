# Changelog

## v2.0.5 (2021-03-23)

- Upgraded `nd-theme-react` to 2.2.2

## v2.0.4 (2021-02-22)

- Upgraded `nd-theme-react` to 2.2.1

## v2.0.3 (2020-12-07)

- No module changes, storybook code only

## v2.0.2 (2020-12-03)

- Upgraded `nd-theme-react` to 2.2.0

## v2.0.1 (2019-01-14)

### Changed

- Upgraded underlying `styled-components` dependency to v5

## v2.0.0 (2019-09-26)

- In `@ndustrial/nd-icons-svg`, changed stroke to control color outline instead of fill. Fill now controls the background of the icon.

## v1.0.4 (2019-09-27)

- Updated underlying `@ndustrial/nd-icons-svg` package

## 1.0.3 (2019-09-18)

### Fixed

- Allow `Link` to be inline with plain text

## 1.0.2 (2019-09-17)

### Changed

- Parent `nd-react-common` hit 1.0.0!

## 1.0.1 (2019-09-10)

### Fixed

- `onDismiss` prop is now invoked when dismissing a flash message
- Fixed issue where Action button was only a small portion of the flash message when there were multiple lines of content in the message

### Changed

- Updated fade out animation to:
  - Use shared keyframes from nd-theme-react
  - Work off a prop instead of a class name

## 1.0.0 (2019-09-09)

### Added

- Added Flash Message component ([183](https://github.com/ndustrialio/nd-react-common/pull/183))
