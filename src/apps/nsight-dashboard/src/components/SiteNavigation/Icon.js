import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Grid } from '@ndustrial/nd-icons-svg';

const StyledImg = styled.img`
  height: 60%;
  width: 60%;
`;

const IconContainer = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const propTypes = {
  className: PropTypes.string,
  src: PropTypes.string
};

const defaultProps = {
  className: '',
  src: ''
};

function checkURL(url) {
  return url.match(/\.(jpeg|jpg|gif|png|svg)$/) !== null;
}

function Icon(props) {
  return (
    <IconContainer className={props.className}>
      {props.src && checkURL(props.src) ? (
        <StyledImg src={props.src} />
      ) : (
        <Grid height="60%" width="60%" stroke="#fff" />
      )}
    </IconContainer>
  );
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
