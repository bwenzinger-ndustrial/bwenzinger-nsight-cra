import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { QueryLink } from '@ndustrial/nsight-common/components';

const propTypes = {
  primaryStart: PropTypes.string.isRequired,
  primaryEnd: PropTypes.string.isRequired,
  comparisonStart: PropTypes.string.isRequired,
  kpiConfig: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  data: PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string.isRequired,
    realTimeEnabled: PropTypes.bool.isRequired
  }),
  node: PropTypes.object
};

const CellText = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  width: 100%;
`;

const KPIBreakdownGridLinkCell = (props) => {
  const { primaryStart, primaryEnd, comparisonStart, kpiConfig, value } = props;

  const countText = props.node.allLeafChildren
    ? `(${props.node.allLeafChildren.length})`
    : '';

  if (!props.data) {
    if (value) return `${value} ${countText}`;
    else return `Unlabeled Group ${countText}`;
  }

  const { slug, name, realTimeEnabled } = props.data;

  let metric;
  if (realTimeEnabled) {
    metric = kpiConfig.daily.key.replace('organization', 'facility');
  } else {
    metric = kpiConfig.monthly.key.replace('organization', 'facility');
  }

  return slug ? (
    <CellText
      as={QueryLink}
      removeParams={['comparisonStart', 'primaryStart', 'primaryEnd']}
      addParams={{
        facility: slug,
        metric,
        primaryStart,
        primaryEnd,
        comparisonStart
      }}
      to="/facility-dashboard/detail"
    >
      {name}
    </CellText>
  ) : (
    { name }
  );
};

KPIBreakdownGridLinkCell.propTypes = propTypes;
export default KPIBreakdownGridLinkCell;
