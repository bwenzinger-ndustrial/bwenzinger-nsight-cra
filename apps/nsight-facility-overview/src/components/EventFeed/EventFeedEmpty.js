import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Event as EventIcon } from '@ndustrial/nd-icons-svg';

import Text from '../Text';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Box = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 50%;
`;

const propTypes = {
  className: PropTypes.string
};

function EventFeedEmpty({ className }) {
  return (
    <Container className={className}>
      <Box>
        <EventIcon height="98px" width="98px" stroke="#A7A7A7" />
        <Text as="p" align="center" weight={300}>
          There are currently no events to report for this facility
        </Text>
        <Text as="p" align="center" weight={300}>
          For help or questions contact:{' '}
          <a href="mailto:support@ndustrial.io">support@ndustrial.io</a>
        </Text>
      </Box>
    </Container>
  );
}

EventFeedEmpty.propTypes = propTypes;

export default EventFeedEmpty;
