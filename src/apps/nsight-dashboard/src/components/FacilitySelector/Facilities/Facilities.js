import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ChevronLeft } from '@ndustrial/nd-icons-svg';
import { QueryLink } from '@ndustrial/nsight-common/components';
import { getSearchString } from '@ndustrial/nsight-common/utils';

import FilterableItemList, { TitleContainer } from '../FilterableItemList';
import FacilityList from './FacilityList';
import GroupingList from './GroupingList';

const propTypes = {
  facilities: PropTypes.array,
  facilityGroupings: PropTypes.array,
  openGroupingIds: PropTypes.array,
  organization: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  showOrganization: PropTypes.bool,
  onFacilitySelected: PropTypes.func
};

const defaultProps = {
  facilityGroupings: []
};

const Arrow = styled(ChevronLeft)`
  cursor: pointer;
  stroke: #fff;
`;

const BackLink = styled(QueryLink)`
  line-height: 14px;

  ${Arrow} {
    margin-right: 10px;
  }
`;

const Title = styled.h5`
  align-items: center;
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;
  display: flex;
  font-size: ${rem('16px')};
  font-weight: 300;
  line-height: 1.1875;
  margin: 0;
  margin-bottom: 10px;
`;

function Facilities(props) {
  const {
    facilities,
    facilityGroupings,
    openGroupingIds,
    organization,
    showOrganization,
    onFacilitySelected
  } = props;

  const history = useHistory();
  const location = useLocation();

  function onEnterKey(facility) {
    const search = getSearchString({
      addParams: { facility: facility.slug },
      searchString: location.search
    });
    history.push({
      pathname: `/facility-dashboard`,
      search: search
    });
    if (onFacilitySelected) {
      onFacilitySelected();
    }
  }

  return (
    <FilterableItemList
      items={facilities}
      enableKeyboardControls={true}
      onEnterKey={onEnterKey}
      renderItems={({ filteredData, filterValue, highlightedIndex }) => {
        return filterValue ? (
          <FacilityList
            facilities={filteredData}
            highlightedIndex={highlightedIndex}
          />
        ) : (
          <GroupingList
            groupings={facilityGroupings}
            openGroupingIds={openGroupingIds}
          />
        );
      }}
      renderTitle={() =>
        showOrganization && (
          <TitleContainer>
            <Title>
              <BackLink to="/" preserveParams={false}>
                <Arrow />
              </BackLink>
              {organization.name}
            </Title>
          </TitleContainer>
        )
      }
      searchPlaceholder="Search Facilities"
    />
  );
}

Facilities.propTypes = propTypes;
Facilities.defaultProps = defaultProps;

export default Facilities;
