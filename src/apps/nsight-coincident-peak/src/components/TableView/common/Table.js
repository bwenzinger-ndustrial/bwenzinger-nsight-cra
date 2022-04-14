import { rem } from 'polished';
import styled from 'styled-components';

import { ReactTable as UnstyledReactTable } from '@ndustrial/nd-table-react';

import '@ndustrial/nd-table-react/lib/index.css';

const TableCell = styled.div`
  font-size: ${rem('14px')};
  letter-spacing: 0.25px;
  line-height: 1.43;
  padding: 12px;
  text-align: center;

  ${({ hasBorder }) => {
    if (hasBorder) {
      return {
        borderRight: '1px solid #ebebeb'
      };
    }
  }}
`;

const TableHeader = styled.div`
  align-items: center;
  display: flex;
  font-size: ${rem('14px')};
  font-weight: 500;
  height: 100%;
  justify-content: center;
  letter-spacing: 0.1px;
  line-height: 1.43;
  padding: 12px;
  text-align: center;
  white-space: normal;

  ${({ hasBorder }) => {
    if (hasBorder) {
      return {
        borderRight: '1px solid #ebebeb'
      };
    }
  }}
`;

const ReactTable = styled(UnstyledReactTable)`
  && {
    /* stylelint-disable-next-line selector-class-pattern */
    .rt-thead.-header {
      border-bottom: 2px solid #ebebeb;

      .rt-th {
        border-right: 0;
        overflow: visible;
        padding: 0;

        > div {
          height: 100%;
        }
      }
    }

    .rt-tbody {
      .rt-tr-group {
        border-bottom-color: #ebebeb;
      }

      .rt-td {
        border-right: 0;
        padding: 0;
      }

      /* stylelint-disable-next-line selector-class-pattern */
      .-odd {
        .rt-td {
          background-color: #fff;
        }
      }
    }
  }
`;

export { ReactTable, TableCell, TableHeader };
