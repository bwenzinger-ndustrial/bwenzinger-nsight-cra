import { rem } from 'polished';
import styled from 'styled-components';

import { FormGroup } from '@ndustrial/nd-inputs-react';

const commonSpacing = '10px';

const ContractPropertyText = styled.span``;
const ContractPropertyLabel = styled.label`
  font-size: ${rem('12px')};

  ${ContractPropertyText} {
    margin-right: 10px;
  }
`;

const ContractProperty = styled.div`
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

const ContractSection = styled.div`
  ${ContractProperty} {
    margin-right: 10px;
  }

  ${ContractProperty}:last-child {
    margin-right: 0;
  }
`;

const ContractFormColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ContractFormRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;

  @media screen and (min-width: 682px) and (max-width: 767px) {
    flex-wrap: nowrap;
  }

  ${FormGroup},
  ${ContractProperty} {
    margin-bottom: 24px;
    margin-right: ${commonSpacing};
  }
`;

const ContractLayout = styled.div`
  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0;
  }

  ${ContractFormColumn} {
    margin-right: 10px;
  }

  ${ContractFormColumn}:last-child {
    margin-right: 0;
  }

  ${ContractSection} {
    margin-bottom: 16px;
  }

  ${ContractFormRow}:last-child {
    margin-bottom: -24px;
  }
`;

const ContractFormBackground = styled.div`
  background-color: rgba(10, 88, 138, 0.1);
  flex-direction: row;
  padding: 15px ${commonSpacing};
  border: 1px solid ${({ theme }) => theme.colors.primary};
`;

export { ContractFormBackground };
export { ContractFormColumn };
export { ContractFormRow };
export { ContractLayout };
export { ContractProperty };
export { ContractPropertyLabel };
export { ContractPropertyText };
export { ContractSection };
