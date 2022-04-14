const asyncAction = (base) => ({
  [`${base}_START`]: `${base}_START`,
  [`${base}_SUCCESS`]: `${base}_SUCCESS`,
  [`${base}_FAILURE`]: `${base}_FAILURE`
});

export default { asyncAction };
