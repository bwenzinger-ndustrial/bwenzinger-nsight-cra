require('dotenv').config();

const path = require('path');
const env = process.env.NODE_ENV || 'development';

// ENV is set in our manifest/deployment.yml files so it will always have a value in non-local
// environments.  Locally, you don't have to set it if you don't want, and it will be overwritten
// by NODE_ENV, which we always set in our start and test scripts, or above while setting the env var
const buildEnv = process.env.ENV || env;

module.exports = {
  ...require('./env')(env),
  kpiConfigBySlug: {
    ...require(path.join(__dirname, 'kpiConfig', 'default')),
    ...require(path.join(__dirname, 'kpiConfig', buildEnv))
  }
};
