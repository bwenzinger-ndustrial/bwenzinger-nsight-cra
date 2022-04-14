const fs = require('fs');
const escapeRegExp = require('lodash/escapeRegExp');
const path = require('path');

const baseDir = path.resolve('.');
const internalModulesRegExp = new RegExp(
  `^${escapeRegExp(baseDir)}${escapeRegExp(path.sep)}(apps|packages)`,
  'i'
);
const internalModules = fs
  .readdirSync(path.join(baseDir, 'apps'))
  .concat(fs.readdirSync(path.join(baseDir, 'packages')));

const modulesRegExpParts = {
  appParts: `(?:${path.sep}.*)?`,
  baseDir: escapeRegExp(baseDir),
  internalModuleDirs:
    '(?!' +
    internalModules
      .map((module) => escapeRegExp(`@ndustrial${path.sep}${module}`))
      .join('|') +
    ')',
  modulesDir: `${path.sep}${escapeRegExp('node_modules')}${path.sep}`
};

const modulesRegExp = new RegExp(
  '^' +
    modulesRegExpParts.baseDir +
    modulesRegExpParts.appParts +
    modulesRegExpParts.modulesDir +
    modulesRegExpParts.internalModuleDirs,
  'i'
);

require('@babel/register')({
  ignore: [modulesRegExp],
  only: [internalModulesRegExp],
  rootMode: 'upward'
});
