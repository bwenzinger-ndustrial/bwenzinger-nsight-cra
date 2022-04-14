import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FlashMessage } from '@ndustrial/nd-flash-message-react';
import { WarningTriangle } from '@ndustrial/nd-icons-svg';

const AlarmIcon = (props) => {
  return (
    <WarningTriangle {...props} stroke={props.stroke} fill="transparent" />
  );
};

AlarmIcon.propTypes = {
  stroke: PropTypes.string
};

const ExpiredContractFlash = () => {
  return (
    <FlashMessage
      dismissible
      icon={(props) => <AlarmIcon {...props} />}
      type="failure"
    >
      Your most recent utility contract has expired. Go to{' '}
      <Link to="/utility-contract-upload">Utility Contract Upload</Link> or
      contact <a href="mailto:support@ndustrial.io">support@ndustrial.io</a>
    </FlashMessage>
  );
};

export default ExpiredContractFlash;
