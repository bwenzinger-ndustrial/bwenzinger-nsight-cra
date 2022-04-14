import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Close } from '@ndustrial/nd-icons-svg';

import IconButton from '../IconButton';

const propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  onCloseClick: PropTypes.func
};

const StyledLabel = styled.div`
  font-size: 1.3em;
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
`;

const StyledCloseIcon = styled(Close)`
  height: 40px;
  width: 40px;
  flex: 0;

  g {
    stroke-width: 1;
  }
`;

const StyledIconButton = styled(IconButton)`
  position: relative;
  bottom: -10px;
  right: -10px;
`;

const StyledDiv = styled.div`
  display: flex;
  height: 50px;
  border-bottom: 1px solid #a9a9a9;
  align-items: flex-end;
  position: relative;
  padding-bottom: 8px;
`;

const ModalHeader = ({ className, title, onCloseClick }) => {
  return (
    <StyledDiv className={className}>
      <StyledLabel>{title}</StyledLabel>
      <StyledIconButton onClick={onCloseClick}>
        <StyledCloseIcon />
      </StyledIconButton>
    </StyledDiv>
  );
};

ModalHeader.propTypes = propTypes;

export default ModalHeader;
