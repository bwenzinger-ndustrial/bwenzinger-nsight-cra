function formatUnits(units = '') {
  switch (units.toLowerCase()) {
    case 'kw':
      return 'kW';
    case 'kva':
      return 'kVA';
    case 'kvar':
      return 'kVAR';
    default:
      return units;
  }
}

export { formatUnits };
