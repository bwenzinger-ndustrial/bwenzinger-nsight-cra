import React from 'react';
import Rect from '@reach/rect';
import styled from 'styled-components';

import { MenuItem } from '@ndustrial/nd-menu-button-react';
import { blacken, whiten } from '@ndustrial/nsight-common/utils/colors';

const Container = styled.div`
  border: 1px solid ${({ theme }) =>
    whiten(blacken(theme.colors.primary, 0.2), 0.4)};
  max-height: calc(100vh - 10px - ${({ top = 0 }) => top}px);
  overflow-y: scroll;

  /* Including MenuItem multiple times for specificity reasons */
  ${MenuItem}${MenuItem}:not(:last-child) {
    border-color: ${({ theme }) =>
      whiten(blacken(theme.colors.primary, 0.2), 0.4)};
  }
`;

function MenuItemContainer(props, ref) {
  return (
    <Rect>
      {({ rect, ref }) => (
        <Container {...props} ref={ref} top={rect && rect.top} />
      )}
    </Rect>
  );
}

export default MenuItemContainer;
