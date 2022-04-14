import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { RATE_COLORS } from '../../../../constants';
import { CellContent } from './Cell';
import ExpandArrow from './ExpandArrow';

const propTypes = {
  isExpanded: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  row: PropTypes.shape({
    period: PropTypes.string.isRequired
  }).isRequired,
  subRows: PropTypes.arrayOf(
    PropTypes.shape({
      _original: PropTypes.shape({
        existsInSeason: PropTypes.bool.isRequired
      }).isRequired
    })
  ).isRequired
};

const Container = styled(CellContent)`
  color: ${({ theme }) => theme.colors.primary};
  cursor: ${({ existsInSeason }) => (existsInSeason ? 'pointer' : 'default')};
  font-weight: 700;
  letter-spacing: 0;
  opacity: ${({ existsInSeason }) => (existsInSeason ? 1 : 0.5)};
  text-transform: uppercase;
`;

const Content = styled.span``;

const ExpandContainer = styled.div`
  align-items: center;
  display: flex;
  position: relative;

  ${ExpandArrow},
  ${Content} {
    background-color: #fff;
    position: relative;
  }

  ${Content} {
    padding-left: 10px;
    padding-right: 12px;
  }

  &::before {
    background-color: ${({ color }) => color};
    bottom: 2px;
    content: '';
    left: 8px;
    position: absolute;
    right: 0;
    top: 2px;
  }
`;

function PeriodHeader({ isExpanded, row, subRows }) {
  const existsInSeason = subRows[0]._original.existsInSeason;

  return (
    <Container
      onClick={(event) => {
        if (!existsInSeason) {
          event.stopPropagation();
        }
      }}
      existsInSeason={existsInSeason}
    >
      <ExpandContainer
        // The index that is supposed to be returned is coming back undefined so this is a hack to get the index
        color={RATE_COLORS[parseInt(row.period.split(' ')[1] - 1)]}
      >
        <ExpandArrow stroke="#0b588a" isExpanded={!!isExpanded} />
        <Content>{row.period}</Content>
      </ExpandContainer>
    </Container>
  );
}

PeriodHeader.propTypes = propTypes;

export { PeriodHeader };
