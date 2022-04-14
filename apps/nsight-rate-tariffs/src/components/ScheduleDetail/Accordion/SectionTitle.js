import { rem } from 'polished';
import styled, { css } from 'styled-components';

import Arrow from './Arrow';

const OpenIndicator = styled(Arrow)`
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

const SectionTitle = styled.p`
  color: ${({ theme }) => theme.colors.button};
  display: inline-block;
  font-size: ${rem('12px')};
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: 1;
  margin: 0;
  text-transform: uppercase;

  @media screen and (min-width: 1024px) {
    background-color: #fff;
    color: ${({ theme }) => theme.colors.text};
    padding: 0 12px;
    position: relative;
    z-index: 10;
  }
`;

const SectionTitleContainer = styled.div`
  align-items: center;
  background-color: #f5f6f5;
  border-bottom: 1px solid #e6e6e6;
  border-top: 1px solid #e6e6e6;
  cursor: pointer;
  display: flex;
  padding: 12px;

  ${OpenIndicator} {
    margin-right: 12px;
  }

  @media screen and (min-width: 1024px) {
    background-color: #fff;
    border: 0;
    justify-content: ${({ hasRule }) => (hasRule ? 'center' : 'flex-start')};
    padding-bottom: 18px;
    padding-left: ${({ hasRule }) => (hasRule ? '12px' : '0')};
    padding-right: ${({ hasRule }) => (hasRule ? '12px' : '0')};
    padding-top: 18px;
    pointer-events: none;
    position: relative;

    ${({ hasRule }) =>
      hasRule &&
      css`
        &::before {
          background-color: #d8d8d8;
          content: '';
          height: 1px;
          left: 12px;
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
        }
      `}
  }
`;

export { OpenIndicator, SectionTitle, SectionTitleContainer };
