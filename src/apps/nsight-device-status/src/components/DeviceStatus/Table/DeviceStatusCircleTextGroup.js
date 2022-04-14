import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  status: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string
};

const defaultProps = {
  type: ''
};

const DeviceStatusName = styled.span``;

const DeviceStatusCircle = styled.span`
  background-color: ${(props) => {
    if (props.status === 'Healthy' || props.status === 'Active') {
      return props.theme.colors.success;
    } else {
      return props.theme.colors.failure;
    }
  }};
  border-radius: 50%;
  height: 8px;
  width: 8px;
`;

const DeviceStatusText = styled.div`
  align-items: center;
  display: flex;
  padding: 2px;

  ${DeviceStatusCircle} {
    margin-right: 5px;
  }

  ${DeviceStatusName} {
    white-space: pre-wrap !important; /* stylelint-disable-line declaration-no-important */

    @media screen and (min-width: 897px) {
      white-space: nowrap;
    }
  }
`;

function DeviceStatusCircleTextGroup({ status, text, type }) {
  return (
    <DeviceStatusText>
      <DeviceStatusCircle status={status} />
      <DeviceStatusName>{text}</DeviceStatusName>
    </DeviceStatusText>
  );
}

DeviceStatusCircleTextGroup.propTypes = propTypes;
DeviceStatusCircleTextGroup.defaultProps = defaultProps;

export default DeviceStatusCircleTextGroup;
