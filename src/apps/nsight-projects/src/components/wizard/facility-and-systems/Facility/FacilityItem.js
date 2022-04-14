import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { whiten } from '@ndustrial/nsight-common/utils/colors';

import { ListItem } from './styled/ListItem';

const propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  shouldShowSelected: PropTypes.bool,
  isSelected: PropTypes.bool,
  onSelectFacility: PropTypes.func.isRequired,
  isFocused: PropTypes.bool,
  children: PropTypes.node
};

const Item = styled(ListItem)`
  background-color: ${({
    isSelected,
    isFocused,
    theme: {
      colors: { primary }
    }
  }) => {
    if (isSelected) {
      return whiten(primary, 0.8);
    } else if (isFocused) {
      return whiten(primary, 0.9);
    }
    return 'transparent';
  }};

  &:hover {
    background-color: ${({
      theme: {
        colors: { primary }
      }
    }) => whiten(primary, 0.9)};
  }
`;

function FacilityItem(props) {
  const {
    className,
    isFocused = false,
    shouldShowSelected = true,
    isSelected = false,
    onSelectFacility,
    children
  } = props;

  return (
    <Item
      className={className}
      isSelected={shouldShowSelected && isSelected}
      isFocused={isFocused}
      onClick={onSelectFacility}
    >
      {children}
    </Item>
  );
}

FacilityItem.propTypes = propTypes;

export default FacilityItem;
