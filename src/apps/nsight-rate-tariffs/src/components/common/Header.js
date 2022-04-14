import { rem } from 'polished';
import styled from 'styled-components';

const HeaderText = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('20px')};
  font-weight: 300;
  line-height: 1.167;
  margin: 0;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    font-size: ${rem('24px')};
  }
`;

const Header = styled.div`
  border-bottom: 1px solid #d8d8d8;
  padding: 15px 10px;
`;

export { Header, HeaderText };
