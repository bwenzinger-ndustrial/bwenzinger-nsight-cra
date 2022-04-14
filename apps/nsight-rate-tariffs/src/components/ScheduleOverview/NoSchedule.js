import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CalendarIcon from '../../assets/Icons/Calendar.png';
import Instructions from './Instructions';

const propTypes = {
  className: PropTypes.string
};

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #f3f6f9;
  height: 418px;
`;

const NoScheduleImage = styled.img`
  max-width: 100%;
`;

function NoSchedule({ className }) {
  return (
    <Container className={className}>
      <NoScheduleImage src={CalendarIcon} />
      <Instructions />
    </Container>
  );
}

NoSchedule.propTypes = propTypes;

export default NoSchedule;
