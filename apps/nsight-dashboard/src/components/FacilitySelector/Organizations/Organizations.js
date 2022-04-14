import React from 'react';
import PropTypes from 'prop-types';

import FilterableItemList from '../FilterableItemList';
import ItemList from './ItemList';

const propTypes = {
  organizations: PropTypes.array
};

function Organizations({ organizations }) {
  return (
    <FilterableItemList
      items={organizations}
      renderItems={({ filteredData }) => (
        <ItemList organizations={filteredData} />
      )}
      searchPlaceholder="Filter Organizations"
    />
  );
}

Organizations.propTypes = propTypes;

export default Organizations;
