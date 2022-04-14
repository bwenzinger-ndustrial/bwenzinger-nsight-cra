'use strict';

const faker = require('faker');
const factory = require('rosie').Factory;
const moment = require('moment');

factory
  .define('contract')
  .option('fromServer', false)
  .attrs({
    id: () => faker.random.number(),
    name: () => faker.system.commonFileName(),
    facilityId: () => faker.random.number(),
    createdBy: () => faker.random.uuid(),
    status: () => faker.random.arrayElement(['active', 'inactive']),
    startDate: () => moment(faker.date.recent()).format('YYYY-MM-DD'),
    endDate: () => moment(faker.date.future()).format('YYYY-MM-DD'),
    utilityContractReminders: [],
    rateNarrative: () => faker.random.words(),
    users: () => [],
    fileId: () => factory.build('file').id
  })
  .after((contract, options) => {
    // If building a contract object that comes from the server, transform it to
    // have camel case and capital letters in the right spots
    if (options.fromServer) {
      contract.created_by = contract.createdBy;
      delete contract.createdBy;

      contract.end_date = contract.endDate;
      delete contract.endDate;

      contract.facility_id = contract.facilityId;
      delete contract.facilityId;

      contract.file_id = contract.fileId;
      delete contract.fileId;

      contract.rate_narrative = contract.rateNarrative;
      delete contract.rateNarrative;

      contract.start_date = contract.startDate;
      delete contract.startDate;

      contract.utility_contract_reminders = contract.utilityContractReminders;
      delete contract.utilityContractReminders;
    }
  });
