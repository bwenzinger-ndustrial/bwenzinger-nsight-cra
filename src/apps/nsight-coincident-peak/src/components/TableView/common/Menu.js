import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DotsVertical as UnstyledDotsVertical } from '@ndustrial/nd-icons-svg';
import {
  Button as UnstyledButton,
  Menu as UnstyledMenu,
  MenuItem,
  Wrapper
} from '@ndustrial/nd-menu-button-react';

const propTypes = {
  className: PropTypes.string,
  exportData: PropTypes.func.isRequired
};

const Button = styled(UnstyledButton)`
  display: inline-flex;

  &:hover {
    cursor: pointer;
  }
`;

const DotsVertical = styled(UnstyledDotsVertical)`
  font-size: 1.5rem;
  stroke: ${({ theme }) => theme.colors.gray};
`;

const NdMenu = styled(UnstyledMenu)`
  right: 0;
  top: calc(100% + 1px);
  width: 150px;
`;

function Menu({ className, exportData }) {
  const handleSelection = useCallback(
    (value) => {
      switch (value) {
        case 'exportData':
          return exportData();
      }
    },
    [exportData]
  );

  return (
    <Wrapper className={className} onSelection={handleSelection}>
      <Button>
        <DotsVertical />
      </Button>
      <NdMenu>
        <MenuItem value="exportData">Download as CSV</MenuItem>
      </NdMenu>
    </Wrapper>
  );
}

Menu.propTypes = propTypes;

export default Menu;
