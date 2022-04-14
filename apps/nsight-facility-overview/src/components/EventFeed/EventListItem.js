import styled from 'styled-components';

import ListItem from '../ListItem';

const EventListItem = styled(ListItem)`
  position: relative;
  background-color: #fff;
  min-height: 65px;

  border: 1px solid #d8d8d8;

  ::before {
    content: '';
    width: 4px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: ${({ color, theme }) => theme.colors[color]};
    margin: -1px;
  }
`;

export default EventListItem;
