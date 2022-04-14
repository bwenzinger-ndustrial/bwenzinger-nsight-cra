import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Dashboard as DashboardIcon,
  List as ListIcon
} from '@ndustrial/nd-icons-svg';
import { Tab, TabList, Tabs } from '@ndustrial/nd-tabs-react';
import { getSearchString } from '@ndustrial/nsight-common/utils';

const TabListEnd = styled(TabList)`
  justify-content: flex-end;
  padding-right: 5px;

  &&& {
    height: 70px;
  }
`;

const StyledTabs = styled(Tabs)`
  flex: 1;
  &&& {
    height: 70px;
  }
`;

const subPaths = ['', '/detail'];

function DashboardDetailTabs({ history, location, match }) {
  const subPath = location.pathname.replace(match.path, '');
  const index = subPaths.indexOf(subPath);

  function handleChange(index) {
    let searchString = getSearchString({ searchString: location.search });
    // if going back to dashboard, clear all url params except organization and facility
    if (index === 0) {
      searchString = getSearchString({
        searchString: location.search,
        addParams: null,
        removeParams: [
          'metric',
          'primaryStart',
          'primaryEnd',
          'comparisonStart',
          'comparisonEnd'
        ]
      });
    }
    history.push(`${match.path}${subPaths[index]}?${searchString}`);
  }

  return (
    <StyledTabs index={index} onChange={handleChange} size="large">
      <TabListEnd>
        <Tab icon={<DashboardIcon />}>Dashboard</Tab>
        <Tab icon={<ListIcon />}>Detail</Tab>
      </TabListEnd>
    </StyledTabs>
  );
}

DashboardDetailTabs.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }),
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  })
};

export default withRouter(DashboardDetailTabs);
