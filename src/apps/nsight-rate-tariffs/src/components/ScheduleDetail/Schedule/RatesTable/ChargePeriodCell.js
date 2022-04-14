import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// TODO: Change to reference @ndustrial/nd-icons-svg when we update to 3.0 for icons
import ArrowDownRightIcon from './ArrowDownRightIcon';
import { CellContent } from './Cell';

const propTypes = {
  nestingPath: PropTypes.arrayOf(PropTypes.number).isRequired,
  value: PropTypes.node
};

const ArrowDownRight = styled(ArrowDownRightIcon)`
  font-size: ${rem('10px')};
`;

const Content = styled(CellContent)`
  align-items: center;
  display: flex;

  ${ArrowDownRight} {
    margin-left: ${10 + 8}px;
    margin-right: 10px;
  }
`;

function ChargePeriodCell({ nestingPath, value }) {
  const periodIndex = nestingPath[1];

  return (
    <Content isEven={periodIndex % 2 === 0}>
      <ArrowDownRight stroke="#0b588a" />
      <span>{value}</span>
    </Content>
  );
}

ChargePeriodCell.propTypes = propTypes;

export { ChargePeriodCell };
