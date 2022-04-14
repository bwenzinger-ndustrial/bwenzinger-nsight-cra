const getBlendedRateHasData = (state) => {
  const { blendedRate } = state;
  if (blendedRate) {
    return (
      blendedRate.series.curr.length > 0 || blendedRate.series.prev.length > 0
    );
  }
  return false;
};

export default getBlendedRateHasData;
