import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import DetailTable from '../../containers/DetailTable';

// TODO: fix card so that this margin comes from the card -- it current collapses/doesn't fit the content
const Container = styled.div`
  margin-bottom: 14px;
`;

function TableView() {
  const match = useRouteMatch();

  return (
    <Container>
      <Switch>
        <Route exact path={`${match.url}/detail`}>
          <DetailTable />
        </Route>
      </Switch>
    </Container>
  );
}

export default TableView;
