import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { QueryLink } from '@ndustrial/nsight-common/components';

import MenuItem from '../MenuItem';
import Buildings from './Buildings';

const propTypes = {
  id: PropTypes.number.isRequired,
  level: PropTypes.number,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool
};

const Item = styled(MenuItem)`
  background-color: ${({ theme, $isHighlighted }) =>
    $isHighlighted ? theme.colors.primary : 'transparent'};

  ${Buildings} {
    margin-right: 10px;
  }
`;

const FacilityLink = styled(QueryLink)`
  text-decoration: none;
`;

function FacilityItem(props) {
  const { id, level, name, slug, isHighlighted } = props;

  return (
    <FacilityLink
      key={id}
      addParams={{ facility: slug }}
      to="/facility-dashboard"
    >
      <Item
        level={level}
        name={name}
        value={{ slug: slug, type: 'facility' }}
        $isHighlighted={isHighlighted}
      >
        <Buildings />
        {name}
      </Item>
    </FacilityLink>
  );
}

FacilityItem.propTypes = propTypes;

export default FacilityItem;
