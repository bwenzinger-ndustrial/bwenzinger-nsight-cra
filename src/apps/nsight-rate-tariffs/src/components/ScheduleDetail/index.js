import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FullScreenLoadingIndicator } from '@ndustrial/nsight-common/components';

import { HeatmapScale as UnstyledHeatmapScale } from '../common/HeatmapScale';
import Accordion from './Accordion';
import Details from './Details';
import UnstyledHeader from './Header';
import Schedule from './Schedule';
import UtilityContract from './UtilityContract';
import UtilityContractDetails from './UtilityContract/UtilityContractDetails';

const propTypes = {
  contract: PropTypes.shape({
    rateNarrative: PropTypes.string
  }),
  hasLoadedContract: PropTypes.bool.isRequired,
  hasLoadingContractFileError: PropTypes.bool.isRequired,
  hasLoadedSchedule: PropTypes.bool.isRequired,
  selectedSchedule: PropTypes.shape({
    description: PropTypes.string,
    isPublished: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    sector: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
    utilityContractId: PropTypes.number,
    utilityProvider: PropTypes.shape({
      label: PropTypes.string
    })
  })
};

const Header = styled(UnstyledHeader)`
  padding-left: 18px;
  padding-right: 18px;
`;

const HeatmapScale = styled(UnstyledHeatmapScale)``;
const DetailsAccordion = styled(Accordion)``;
const ScheduleAccordion = styled(Accordion)``;
const UtilityContractAccordion = styled(Accordion)``;
const LeftColumn = styled.div``;
const RightColumn = styled.div``;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 1400px;

  ${LeftColumn},
  ${RightColumn} {
    width: 100%;
  }

  ${DetailsAccordion} {
    margin-top: -1px;
  }

  @media screen and (min-width: 1225px) {
    ${LeftColumn} {
      margin-right: 12px;
      width: calc(60% - 6px);
    }

    ${RightColumn} {
      display: flex;
      flex-direction: column;
      width: calc(40% - 6px);
    }

    ${DetailsAccordion} {
      margin-top: 0;
    }
  }
`;

const Container = styled.div`
  ${Header},
  ${HeatmapScale},
  ${ColumnContainer} {
    width: 100%;
  }
`;

function ScheduleDetail({
  contract,
  hasLoadedContract,
  hasLoadingContractFileError,
  hasLoadedSchedule,
  selectedSchedule
}) {
  if (!hasLoadedSchedule && !hasLoadedContract) {
    return (
      <FullScreenLoadingIndicator loadingText="Loading Rate Tariff Schedule" />
    );
  }
  return (
    <Container>
      <Header
        isPublished={selectedSchedule.isPublished}
        label={selectedSchedule.label}
      />
      <Helmet>
        {/* Using extra interpolation to avoid this bug:
            https://github.com/nfl/react-helmet/issues/408 */}
        <title>{`${selectedSchedule.label} - Rate Tariffs`}</title>
      </Helmet>

      <HeatmapScale />

      <ColumnContainer>
        <LeftColumn>
          <DetailsAccordion title="Rate Tariff Schedule Details">
            <Details
              description={selectedSchedule.description || 'Not Available'}
              provider={
                (selectedSchedule.utilityProvider &&
                  selectedSchedule.utilityProvider.label) ||
                'Not Available'
              }
              sector={selectedSchedule.sector || 'Not Available'}
              updatedAt={selectedSchedule.updatedAt}
            />
          </DetailsAccordion>

          <ScheduleAccordion hasRule title="Rate Tariff Schedule">
            <Schedule
              rateNarrative={contract && contract.rateNarrative}
              schedule={selectedSchedule}
            />
          </ScheduleAccordion>
        </LeftColumn>

        <RightColumn>
          {!hasLoadedContract &&
          selectedSchedule &&
          selectedSchedule.utilityContractId &&
          !hasLoadingContractFileError ? (
            <FullScreenLoadingIndicator loadingText="Loading Utility Contract" />
          ) : (
            <Fragment>
              <UtilityContractAccordion title="Utility Contract Details">
                <UtilityContractDetails {...contract} />
              </UtilityContractAccordion>
              <UtilityContractAccordion hasRule title="Utility Contract">
                <UtilityContract
                  contract={contract}
                  hasLoadingContractFileError={hasLoadingContractFileError}
                />
              </UtilityContractAccordion>
            </Fragment>
          )}
        </RightColumn>
      </ColumnContainer>
    </Container>
  );
}

ScheduleDetail.propTypes = propTypes;

export default ScheduleDetail;
