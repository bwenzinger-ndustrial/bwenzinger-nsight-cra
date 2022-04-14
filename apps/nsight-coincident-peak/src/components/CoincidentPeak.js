import React, { Fragment } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Tooltip as UnstyledTooltip } from '@ndustrial/nd-tooltip-react';
import { TooltipIcon } from '@ndustrial/nsight-common/components';
import Card, { Content, Title } from '@ndustrial/nsight-common/components/Card';

import TableView from '../components/TableView';
import Graph from '../containers/Graph';
import BalancingAuthoritySelector from './BalancingAuthoritySelector';
import { CpDateSelector } from './CpDateSelector';
import Header from './Header';

const DatePickerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 8px 16px;
`;

const StyledCard = styled(Card)`
  height: 100%;

  @media screen and (min-width: 960px) {
    max-height: 100%;
  }
`;

const CardContent = styled(Content)`
  flex-direction: column;
  display: flex;
  margin-top: 24px;
`;

const Tooltip = styled(UnstyledTooltip)`
  display: inline-flex;
`;

const StyledCardTitle = styled(Title)`
  display: flex;
  justify-content: center;
  padding-left: calc(1em + 10px);

  ${Tooltip} {
    margin-left: 10px;
  }
`;

const propTypes = {
  cpDates: PropTypes.shape({
    from: momentPropTypes.momentObj,
    to: momentPropTypes.momentObj
  }).isRequired,
  currentRunTime: PropTypes.string,
  isLoading: PropTypes.bool,
  selectedBalancingAuthority: PropTypes.string.isRequired,
  setBalancingAuthority: PropTypes.func,
  setCPDates: PropTypes.func.isRequired
};

function CoincidentPeak(props) {
  const {
    cpDates,
    currentRunTime,
    isLoading,
    selectedBalancingAuthority,
    setBalancingAuthority,
    setCPDates
  } = props;

  const match = useRouteMatch();

  return (
    <Fragment>
      <Header cpDates={cpDates} />
      <StyledCard
        isLoading={isLoading}
        subtitle={
          currentRunTime &&
          `Current Run: ${moment(currentRunTime).format('MMM DD, YYYY h:mm A')}`
        }
        title={
          <StyledCardTitle>
            Coincident Peak ({selectedBalancingAuthority})
            <Tooltip
              content='Peak Probability times are represented by the hour which they end. "8am" is the hour from 7am to 8am.'
              placement="top"
              tagName="span"
            >
              <TooltipIcon />
            </Tooltip>
          </StyledCardTitle>
        }
        renderLeft={() => (
          <BalancingAuthoritySelector
            setBalancingAuthority={setBalancingAuthority}
            selectedBalancingAuthority={selectedBalancingAuthority}
          />
        )}
        renderRight={() => (
          <DatePickerContainer>
            <CpDateSelector
              selectedDate={cpDates.from}
              setCPDates={setCPDates}
            />
          </DatePickerContainer>
        )}
      >
        <CardContent>
          <Switch>
            <Route exact path={`${match.url}/graph`}>
              <Graph />
            </Route>

            <Route path={`${match.url}/table`}>
              <TableView />
            </Route>
          </Switch>
        </CardContent>
      </StyledCard>
    </Fragment>
  );
}

CoincidentPeak.propTypes = propTypes;

export default CoincidentPeak;
