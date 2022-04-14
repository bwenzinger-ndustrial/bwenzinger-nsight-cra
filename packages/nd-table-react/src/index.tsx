import { themeHelper } from '@ndustrial/nd-theme-react';
import ReactTableComponent, { ReactTableDefaults } from 'react-table';
import treeTableHOC from 'react-table/lib/hoc/treeTable';
import selectTableHOC from 'react-table/lib/hoc/selectTable';
// @ts-ignore next-line
import foldableTableHOC from 'react-table/lib/hoc/foldableTable';
// @ts-ignore next-line
import advancedExpandTableHOC from 'react-table/lib/hoc/advancedExpandTable';
// @ts-ignore next-line
import defaultProps from 'react-table/lib/defaultProps';
import styled from 'styled-components';

import 'react-table/react-table.css';

const ReactTable = styled(ReactTableComponent)`
  && {
    background-color: #fff;

    .rt-thead.-header {
      box-shadow: none;
      background-color: #f5f6f5;
      font-size: 1rem;
      font-weight: 700;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);

      .rt-th {
        padding: 10px;
      }

      .rt-tr {
        text-align: left;
      }
    }

    .rt-tbody {
      .-odd .rt-td {
        background-color: ${({ theme }) =>
          themeHelper.whiten(theme.colors.primary, 0.95)};
      }

      .rt-td {
        padding: 15px;
      }
    }

    .-pagination {
      box-shadow: none;

      .-btn {
        background-color: ${({ theme }) => theme.colors.primary};
        border-radius: 0 !important;
        color: #fff !important;
        font-family: ${({ theme }) => theme.fonts.primary};
        font-weight: 400 !important;
        padding: 10px !important;
      }
    }
  }
`;

export {
  ReactTable,
  ReactTableDefaults,
  treeTableHOC,
  selectTableHOC,
  foldableTableHOC,
  advancedExpandTableHOC,
  defaultProps
};
