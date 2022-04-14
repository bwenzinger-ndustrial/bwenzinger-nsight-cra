'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory
  .define('event')
  .attrs({
    id: () => faker.random.uuid(),
    eventId: () => faker.random.uuid(),
    date: () => faker.date.recent(40).toISOString(),
    triggerStartAt: () => `${faker.date.past().toISOString()}`,
    triggerEndAt: () => `${faker.date.past().toISOString()}`,
    data: () => ({
      feed_key: faker.hacker.noun(),
      field_groupings: [],
      feed_type: 'eguage'
    }),
    isPublic: () => null,
    createdAt: `${faker.date.past().toISOString()}`,
    updatedAt: `${faker.date.past().toISOString()}`,
    deletedAt: () => null
  })
  .after((event, options) => {
    // If building an event object that comes from the server, transform
    // it to have snake case and capital letters in the right spots
    if (options.fromServer) {
      event.event_id = event.eventId;
      delete event.eventId;

      event.trigger_start_at = event.triggerStartAt;
      delete event.triggerStartAt;

      event.trigger_end_at = event.triggerEndAt;
      delete event.triggerEndAt;

      event.is_public = event.isPublic;
      delete event.isPublic;

      event.created_at = event.createdAt;
      delete event.createdAt;

      event.updated_at = event.updatedAt;
      delete event.updatedAt;

      event.deleted_at = event.deletedAt;
      delete event.deletedAt;
    }
  });
