/**
 * Sorts by a key, with any `null` values always appearing last in the array.
 *
 * @param {Object[]} arr The array to sort
 * @param {String} key The key used to sort the array
 * @param {String} [direction='asc'] The sort direction. Can be: `asc` or `desc`
 */
function sortByWithNull(arr, key, direction) {
  return arr.sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (valueA === valueB) {
      return 0;
    } else if (valueA === null) {
      return 1;
    } else if (valueB === null) {
      return -1;
    } else if (direction === 'desc') {
      return valueA < valueB ? 1 : -1;
    } else {
      return valueA < valueB ? -1 : 1;
    }
  });
}

export { sortByWithNull };
