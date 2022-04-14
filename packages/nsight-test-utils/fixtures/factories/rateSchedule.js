'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory
  .define('rateSchedule')
  .option('fromServer', false)
  .sequence('id')
  .attrs({
    description: () => faker.lorem.words(),
    createdAt: () => faker.date.past().toISOString(),
    effectiveEndDate: () => `${faker.date.future().toISOString()}`,
    effectiveStartDate: () => `${faker.date.recent().toISOString()}`,
    facilityId: () => factory.build('facility').id,
    isPublished: () => true,
    isRtpRate: () => false,
    label: () =>
      `${faker.company.companyName()} - ${faker.commerce.productName()}`,
    openeiId: () => faker.internet.password(),
    organizationName: () => factory.build('organization').name,
    rateScheduleTypeId: () => faker.random.number(),
    sector: () =>
      faker.random.arrayElement(['Commercial', 'Industrial', 'Residential']),
    source: () => faker.internet.url(),
    supercedesRateScheduleId: () => null,
    updatedAt: () => faker.date.recent().toISOString(),
    uri: () => faker.internet.url(),
    utilityContractId: null,
    utilityProviderId: () => factory.build('utilityProvider').id
  })
  .after((rateSchedule, options) => {
    // If building a rate schedule object that comes from the server, transform
    // it to have snake case and capital letters in the right spots
    if (options.fromServer) {
      rateSchedule.effective_end_date = rateSchedule.effectiveEndDate;
      delete rateSchedule.effectiveEndDate;

      rateSchedule.effective_start_date = rateSchedule.effectiveStartDate;
      delete rateSchedule.effectiveStartDate;

      rateSchedule.facility_id = rateSchedule.facilityId;
      delete rateSchedule.facilityId;

      rateSchedule.is_published = rateSchedule.isPublished;
      delete rateSchedule.isPublished;

      rateSchedule.is_rtp_rate = rateSchedule.isRtpRate;
      delete rateSchedule.isRtpRate;

      rateSchedule.openei_id = rateSchedule.openeiId;
      delete rateSchedule.openeiId;

      rateSchedule.rate_schedule_type_id = rateSchedule.rateScheduleTypeId;
      delete rateSchedule.rateScheduleTypeId;

      rateSchedule.supersedes_rate_schedule_id =
        rateSchedule.supercedesRateScheduleId;
      delete rateSchedule.supercedesRateScheduleId;

      rateSchedule.utility_provider_id = rateSchedule.utilityProviderId;
      delete rateSchedule.utilityProviderId;
    }
  });
