import React from 'react';
import PropTypes from 'prop-types';

import { FlashMessage } from '@ndustrial/nd-flash-message-react';
import { WarningTriangle } from '@ndustrial/nd-icons-svg';
import { QueryLink } from '@ndustrial/nsight-common/components';

const AlarmIcon = (props) => {
  return (
    <WarningTriangle {...props} stroke={props.stroke} fill="transparent" />
  );
};

AlarmIcon.propTypes = {
  stroke: PropTypes.string
};

const NoContractFlash = () => {
  return (
    <FlashMessage icon={(props) => <AlarmIcon {...props} />} type="failure">
      There is no utility contract currently uploaded. For the best experience,
      we recommend going to{' '}
      <QueryLink to="/utility-contract-upload">
        Utility Contract Upload
      </QueryLink>{' '}
      before proceeding.
    </FlashMessage>
  );
};

export default NoContractFlash;
