import styled from 'styled-components';

import { CellContent } from './Cell';

const HeaderCell = styled(CellContent)`
  color: ${({ theme }) => theme.colors.textLight};
  background-color: #f5f5f5;
  font-weight: 700;
  letter-spacing: 0;
`;

export { HeaderCell };
