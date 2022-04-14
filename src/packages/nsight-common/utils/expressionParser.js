import { Parser } from 'expr-eval';

const parser = new Parser();

parser.functions.sum = (values) => {
  if (!Array.isArray(values)) {
    return values;
  }

  return values.reduce((total, value) => total + Number(value), 0);
};

/**
 * Expects a moment date which represents the end date of the range set in the
 * portfolio or facility detail view. Returns the day of the month for the
 * end date which will typically be the last day of the month but allows for
 * ranges that end mid month.
 * @param {Moment} end_date Moment date
 * @returns Number [1-31]
 */
parser.functions.daysInMonthToDate = (end_date) => {
  return end_date.date();
};

function evaluate(formula, variables) {
  return parser.evaluate(formula, variables);
}

/**
 * parses a expr-eval format compliant formula
 * @param formula
 * @returns {Expression} Check link below to learn about the Expression object
 * @see {@link https://github.com/silentmatt/expr-eval#expression}
 */
function parse(formula) {
  return parser.parse(formula);
}

export default {
  evaluate,
  parse
};
