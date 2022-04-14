import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
  allKpiConfigs: PropTypes.arrayOf(
    PropTypes.shape({
      monthly: PropTypes.shape({
        key: PropTypes.string.isRequired,
        formula: PropTypes.string.isRequired
      }),
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  ).isRequired
};

const ContainerDiv = styled.div`
  background-color: #f5f6f5;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    padding: 10px;
  }
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: -5px;
  width: calc(100% + 10px);
`;

const GridItem = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  padding: 5px;
`;

const SelectorWrapper = styled(GridItem)`
  display: none;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    flex-basis: 100%;
    display: block;
  }
`;

const KPIWrapper = styled.div`
  flex: 1 1 0;
  padding: 5px;

  flex-basis: 50%;
  max-width: 50%;

  @media screen and (min-width: 1200px) {
    flex-basis: 25%;
    max-width: 25%;
  }
`;

function DetailHeader({ children, className, allKpiConfigs }) {
  return (
    <ContainerDiv className={className}>
      <GridContainer>
        <SelectorWrapper>
          <GridContainer>
            {allKpiConfigs &&
              allKpiConfigs.map((config) => (
                <KPIWrapper key={config.id}>{children(config)}</KPIWrapper>
              ))}
          </GridContainer>
        </SelectorWrapper>
      </GridContainer>
    </ContainerDiv>
  );
}

DetailHeader.propTypes = propTypes;

export default DetailHeader;
