/**
 * JSDOM setup : https://airbnb.io/enzyme/docs/guides/jsdom.html
 *
 * `window` is required for testing. Even when not being utilized in this application, `contxt-sdk` uses `window` when initializing `auth0WebAuth`.
 */

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  pretendToBeVisual: true,
  url: 'https://example.org/'
});
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target)
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};

copyProps(window, global);
