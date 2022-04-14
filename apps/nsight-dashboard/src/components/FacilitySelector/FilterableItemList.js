import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useListKeyboardListeners from '@ndustrial/nsight-common/hooks/useListKeyboardListeners';

import UnstyledMenuItemContainer from './MenuItemContainer';
import SearchBox from './SearchBox';

const MenuItemContainer = styled(UnstyledMenuItemContainer)``;
const TitleContainer = styled.div``;

const Container = styled.div`
  ${MenuItemContainer},
  ${TitleContainer} {
    margin-top: 10px;
  }
`;

const propTypes = {
  items: PropTypes.array,
  renderItems: PropTypes.func.isRequired,
  renderTitle: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  enableKeyboardControls: PropTypes.bool,
  onEnterKey: PropTypes.func
};

function FilterableItemList({
  items,
  renderItems,
  renderTitle,
  searchPlaceholder,
  enableKeyboardControls,
  onEnterKey
}) {
  const [filterValue, setFilterValue] = useState('');

  const searchRef = useRef();

  const filteredItems = useMemo(() => {
    return items.filter(({ name }) => {
      return name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1;
    });
  }, [items, filterValue]);

  const selectedIndex = useListKeyboardListeners(
    searchRef,
    filteredItems,
    (item) => {
      if (enableKeyboardControls) {
        searchRef.current.value = '';
        onEnterKey(item);
      }
    }
  );

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <Container>
      <SearchBox
        ref={searchRef}
        placeholder={searchPlaceholder}
        onChange={handleFilterValueChange}
        value={filterValue}
      />

      {renderTitle && renderTitle()}

      <MenuItemContainer>
        {renderItems({
          filteredData: filteredItems,
          filterValue: filterValue,
          highlightedIndex: enableKeyboardControls ? selectedIndex : -1
        })}
      </MenuItemContainer>
    </Container>
  );
}

FilterableItemList.propTypes = propTypes;

export { TitleContainer };
export default FilterableItemList;
