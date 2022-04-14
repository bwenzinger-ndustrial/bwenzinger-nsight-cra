# Changelog

## v5.1.1 (2021-02-19)

- Updating icon library to 3.1.1

## v5.1.0 (2020-03-30)

- Updating icon library to 3.1.0

## v5.0.2 (2019-01-14)

### Changed

- Upgraded underlying `styled-components` dependency to v5

## v5.0.1 (2019-09-27)

### Changed

- User name is now hidden on mobile devices
- Menu uses auto width when in mobile layout to prevent super skinny buttons
- User avatar remains square by allowing the user info to fill remaining space

## v5.0.0 (2019-09-27)

- Changed stroke to control color outline instead of fill. Fill now controls the background of the icon.
- Updated `@ndustrial/nd-icons-svg` package to v3.0.0

## v4.2.4 (2019-09-27)

- Updated underlying `@ndustrial/nd-icons-svg` package

## v4.2.3 (2019-09-17)

### Changed

- Parent `nd-react-common` hit 1.0.0!

## v4.2.2 (2019-09-09)

- Updated underlying `@ndustrial/nd-icons-react` package

## v4.2.1 (2019-09-04)

- Updated underlying `@ndustrial/nd-menu-button-react` package

## v4.2.0 (2019-08-19)

### Changed

- Updated underlying `@ndustrial/nd-menu-button-react` package

## v4.1.0 (2019-08-19)

### Changed

- Adjusted the button font size to 1rem
- Added outline styles

## v4.0.0 (2019-08-15)

### Changed

- Adjusted the handling of the theme prop for the new structure of `@ndustrial/nd-theme-react`;

## v3.1.4 (2019-08-13)

- Updated underlying `@ndustrial/nd-icons-svg` package

## v3.1.3 (2019-08-02)

- Updated underlying `@ndustrial/nd-icons-svg` package

## v3.1.2 (2019-07-25)

### Updated

- Updated underlying `nd-menu-button-react` package

## v3.1.0 (2019-07-08)

### Updated

- Adjusted border on Menu and MenuItems to disappear into the MenuItem background when hovering or focused

## v3.0.0 (2019-07-03)

### Breaking Changes

- Added props to pass through an onSelection function handler to underlying `@ndustrial/nd-menu-button-react` package.
- Added props to pass `UserDropdownItem` child nodes to `UserDropdown`

## v2.0.1 (2019-06-17)

### Changes

- Updated @ndustrial/nd-icons-svg dependency
- Updated storybook to better show component

## v2.0.0 (2019-06-07)

### Breaking Changes

- Switched underlying menu button package to use [`@ndustrial/nd-menu-button-react`](https://github.com/ndustrialio/nd-react-common/blob/v1/base/packages/nd-menu-button-react/README.md) (which uses [`react-aria-menubutton`](https://github.com/davidtheclark/react-aria-menubutton))
  - The styles associated with the exported elements have changed slightly and may need to be repositioned in your applications.

## v1.0.5 (2019-05-15)

- Adjusted font size of the user's name ([#129](https://github.com/ndustrialio/nd-react-common/pull/129))

## v1.0.4 (2019-05-14)

### Changed

- Removed required prop validation from `avatarSrc` and `userName` ([#128](https://github.com/ndustrialio/nd-react-common/pull/128))

## v1.0.2 (2019-05-10)

### Changed

- Updated the import path of the triangle down icon ([#127](https://github.com/ndustrialio/nd-react-common/pull/127))

## v1.0.1 (2019-05-09)

### Changed

- Updated styles and docs ([#126](https://github.com/ndustrialio/nd-react-common/pull/126))

## v1.0.0 (2019-05-07)

### Changed

- Default export to named export ([#118](https://github.com/ndustrialio/nd-react-common/pull/118))

### Added

- UserDropdown component ([#117](https://github.com/ndustrialio/nd-react-common/pull/117))
