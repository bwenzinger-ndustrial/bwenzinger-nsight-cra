# nSight Dashboard

This application is responsible for the nSight Dashboard as well as providing navigation and rendering of all other nSight micro front ends.

## Dependencies

- Node 10.15 (This project is set up for NVM so, `nvm use` away)
- Yarn 1.0 (This project uses workspaces which were introduced in 1.0)

## Libraries being used:

- [React Dynamic Modules](https://github.com/Microsoft/redux-dynamic-modules) - make Redux Reducers and middleware easy to modular-ize and add/remove dynamically. This gives us the ability to add/remove redux modules from other applications at one level as they are mounted/unmounted.

- [Styled Components](https://www.styled-components.com/) - allowing styles to be written at the component level in JavaScript.

## Configuration setup

This project contains a `config` folder, with configuration files for various environments, e.g. `staging`, `development`, `production`. The configuration for Auth0 _must_ be set in the configuration files before you can run the application for the first time. If you _do not_ have the need to have different configurations for different environments, you can move the `auth0` definitions to the `all.js` file and remove this configuration from the individual environments.

## Exposing environment-specific configuration variables to the front-end.

You can expose any arbitrary environment-specific variables to front-end by leveraging the javascript files in the `config` folder. Everything defined in these configurations will be exposed on a `window.nd` object in your front-end.

#### **IMPORTANT NOTE**: ALL of these values get injected into the HTML of the page. Do not put any values that should not be exposed to the front-end (such as client secrets).

### Example: Adding a `mapbox` accessToken for different environments

Let's say you want to use a different `mapbox` accessToken for `production` than for other environments. To accomplish this:

Add an accessToken to `config/env/all.js`:

```javascript
// This is the config/env/all.js file
module.exports = {
  mapboxAccessToken: 'some_token'
};
```

Add an accessToken to `config/env/production.js`:

```javascript
// This is the config/env/production.js file
module.exports = {
  mapboxAccessToken: 'some_production_token'
};
```

Now, you can do something fancy with `window.nd.mapboxAccessToken` somewhere in your front-end code.
