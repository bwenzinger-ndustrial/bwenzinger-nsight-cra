import { FORM_ERROR } from 'final-form';

function getAllErrorsForForm({ errors = {}, submitErrors = {}, touched = {} }) {
  return Object.keys(errors)
    .reduce(
      (memo, key) => {
        if (touched[key]) {
          memo = [...memo, errors[key]];
        }
        return memo;
      },
      [submitErrors[FORM_ERROR]]
    )
    .filter((error) => error);
}

export default getAllErrorsForForm;
