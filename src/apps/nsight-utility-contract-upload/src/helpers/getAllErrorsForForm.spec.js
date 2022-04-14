import { expect } from 'chai';
import faker from 'faker';
import { FORM_ERROR } from 'final-form';
import { times } from 'lodash';

import getAllErrorsForForm from './getAllErrorsForForm';

describe('getAllErrorsForForm', function() {
  let errors;
  let expectedErrors;
  let touched;

  beforeEach(function() {
    const rawErrors = times(
      faker.random.number({ min: 1, max: 10 }),
      (index) => ({
        key: `${index}`,
        errorMsg: faker.hacker.phrase()
      })
    );
    errors = rawErrors.reduce((memo, { key, errorMsg }) => {
      memo[key] = errorMsg;
      return memo;
    }, {});
    touched = rawErrors.reduce((memo, { key }) => {
      memo[key] = true;
      return memo;
    }, {});

    expectedErrors = rawErrors.map(({ errorMsg }) => errorMsg);
  });

  it('returns a list of field errors', function() {
    const allErrors = getAllErrorsForForm({ errors, touched });
    expect(allErrors).to.include(...expectedErrors);
  });

  it('includes the form error if it exists', function() {
    const expectedFormError = faker.lorem.words();
    const allErrors = getAllErrorsForForm({
      errors,
      touched,
      submitErrors: { [FORM_ERROR]: expectedFormError }
    });

    expect(allErrors).to.include(expectedFormError);
  });

  it('does not include any blank/undefined errors', function() {
    const allErrors = getAllErrorsForForm({ errors, touched });

    expect(allErrors).to.not.include(undefined);
  });
});
