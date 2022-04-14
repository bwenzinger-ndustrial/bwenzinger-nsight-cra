'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');
const _ = require('lodash');

factory
  .define('eventUser')
  .attrs({
    createdAt: () => faker.date.past().toISOString(),
    email: () => faker.internet.email(),
    firstName: () => faker.name.firstName(),
    id: () => `auth0|${faker.random.number()}`,
    isMachineUser: () => faker.random.boolean(),
    lastName: () => faker.name.lastName(),
    userMobileNumbers: () => [],
    updatedAt: () => faker.date.recent().toISOString()
  })
  .attr('IOSDevice', ['id'], (id) => {
    return _.times(
      faker.random.number({
        min: 0,
        max: 5
      }),
      () => {
        return factory.build('iosDevice', {
          userId: id
        });
      }
    );
  })
  .attr('userEventSubscription', ['id'], (id) => {
    return _.times(
      faker.random.number({
        min: 0,
        max: 5
      }),
      () => {
        return factory.build('userEventSubscription', {
          userId: id
        });
      }
    );
  })
  .attr(
    'userMobileNumber',
    ['id', 'firstName', 'lastName'],
    (id, firstName, lastName) => {
      return _.times(
        faker.random.number({
          min: 0,
          max: 5
        }),
        () => {
          return factory.build('userMobileNumber', {
            name: firstName + ' ' + lastName,
            userId: id
          });
        }
      );
    }
  );
