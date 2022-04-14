'use strict';

const factory = require('rosie').Factory;

require('./contract');
require('./facility');
require('./facilityInfo');
require('./formattedUser');
require('./file');
require('./organization');
require('./reminder');
require('./queuedFile');
require('./user');

module.exports = factory;
