import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  ChartDot as GraphIcon,
  Spreadsheet as SpreadsheetIcon
} from '@ndustrial/nd-icons-svg';
import { Tab, TabList, Tabs } from '@ndustrial/nd-tabs-react';
import { getSearchString } from '@ndustrial/nsight-common/utils';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

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

const propTypes = {
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

const subPaths = ['/graph', '/table/detail'];

function GraphDataToggle({ history, location, match }) {
  const subPath = location.pathname.replace(match.path, '');
  const index = subPaths.indexOf(subPath);

  function handleChange(index) {
    const searchString = getSearchString({
      removeParams: index !== 1 ? ['visibleDate'] : [],
      searchString: location.search
    });

    history.push(`${match.path}${subPaths[index]}?${searchString}`);
  }

  return (
    <Container>
      <StyledTabs index={index} onChange={handleChange} size="large">
        <TabListEnd>
          <Tab icon={<GraphIcon />}>Graph</Tab>
          <Tab icon={<SpreadsheetIcon />}>Table</Tab>
        </TabListEnd>
      </StyledTabs>
    </Container>
  );
}

GraphDataToggle.propTypes = propTypes;

export default withRouter(GraphDataToggle);
