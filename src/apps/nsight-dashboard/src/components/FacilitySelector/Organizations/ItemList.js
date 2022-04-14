import React, { Fragment } from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ChevronRight } from '@ndustrial/nd-icons-svg';
import { QueryLink } from '@ndustrial/nsight-common/components';

import MenuItem from '../MenuItem';

const propTypes = {
  organizations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string
    })
  )
};

const ArrowIcon = styled(ChevronRight)`
  stroke: #fff;
  height: 10px;
  width: 10px;
`;

const Organization = styled(MenuItem)`
  position: relative;

  ${ArrowIcon} {
    position: absolute;
    right: 10px;
    transform: translateY(-50%);
    top: 50%;
  }
`;

const OrganizationsMessage = styled.div`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;
  font-size: ${rem('12px')};
  font-weight: 700;
  line-height: 1.2;
  padding: 10px;
`;

const OrganizationLink = styled(QueryLink)`
  text-decoration: none;
`;

function ItemList({ organizations = [] }) {
  if (!organizations.length) {
    return (
      <OrganizationsMessage>No organizations available</OrganizationsMessage>
    );
  }

  return (
    <Fragment>
      {organizations.map(({ name, slug }) => {
        return (
          <OrganizationLink key={slug} addParams={{ organization: slug }}>
            <Organization name={name} value={{ slug, type: 'organization' }}>
              {name}
              <ArrowIcon />
            </Organization>
          </OrganizationLink>
        );
      })}
    </Fragment>
  );
}

ItemList.propTypes = propTypes;

export default ItemList;
