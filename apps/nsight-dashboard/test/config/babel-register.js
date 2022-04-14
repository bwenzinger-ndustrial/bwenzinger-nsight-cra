const fs = require('fs');
const escapeRegExp = require('lodash/escapeRegExp');
const path = require('path');

const appsBase = path.resolve('..');
const apps = fs.readdirSync(appsBase);
const appsRegExp = new RegExp(`^${escapeRegExp(appsBase)}`, 'i');

const modulesBase = path.resolve(`..${path.sep}..`);
const modulesRegExpParts = {
  appModuleDirs:
    '(?!' +
    apps.map((app) => escapeRegExp(`@ndustrial${path.sep}${app}`)).join('|') +
    ')',
  appParts: `(?:${path.sep}.*)?`,
  baseDir: escapeRegExp(modulesBase),
  modulesDir: `${path.sep}${escapeRegExp('node_modules')}${path.sep}`
};

// Builds a RegExp that is true for:
// - /path/to/nsight-react/apps/nsight-dashboard/index.js
// - /path/to/nsight-react/apps/nsight-example/node_modules/@ndustrial/nsight-dashboard/index.js
//
// But false for:
// - /path/to/nsight-react/node_modules/test-pkg/index.js
// - /path/to/nsight-react/apps/nsight-example/node_modules/test-pkg/index.js
//
// This allows for nSight 2.0 files to be transpiled, but all regular node
// modules to not be run through Babel.
//
// The resulting RegExp looks like:
// ^\/path\/to\/nsight-react(?:\/.*)?\/node_modules\/(?!@ndustrial\/nsight-dashboard|@ndustrial\/nsight-example)
const modulesRegExp = new RegExp(
  '^' +
    modulesRegExpParts.baseDir +
    modulesRegExpParts.appParts +
    modulesRegExpParts.modulesDir +
    modulesRegExpParts.appModuleDirs,
  'i'
);

require('@babel/register')({
  ignore: [modulesRegExp],
  only: [appsRegExp],
  rootMode: 'upward'
});
