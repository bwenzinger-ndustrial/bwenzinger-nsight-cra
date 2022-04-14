import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FlashMessage as UnstyledFlashMessage } from '@ndustrial/nd-flash-message-react';
import { WarningTriangle } from '@ndustrial/nd-icons-svg';
import { QueryLink } from '@ndustrial/nsight-common/components';

const FlashMessage = styled(UnstyledFlashMessage)`
  font-size: ${rem('10px')};
`;

const AlarmIcon = (props) => {
  return (
    <WarningTriangle {...props} stroke={props.stroke} fill="transparent" />
  );
};

AlarmIcon.propTypes = {
  stroke: PropTypes.string
};

const NoContractFileFlash = (props) => {
  return (
    <FlashMessage
      dismissible
      icon={(props) => <AlarmIcon {...props} />}
      type="failure"
      {...props}
    >
      You currently have no utility contract uploaded. Go to{' '}
      <QueryLink to="/utility-contract-upload">
        Utility Contract Upload
      </QueryLink>
    </FlashMessage>
  );
};

export default NoContractFileFlash;
