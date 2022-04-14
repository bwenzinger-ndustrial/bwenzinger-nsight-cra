import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  className: PropTypes.string,
  currentUserId: PropTypes.string,
  subscribeUserToEvent: PropTypes.func,
  unsubscribeUserFromEvent: PropTypes.func
};

const DeviceStatusCircle = styled.span`
  background-color: ${(props) => {
    if (props.status === 'Healthy' || props.status === 'Active') {
      return props.theme.colors.success;
    } else {
      return props.theme.colors.failure;
    }
  }};
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
  border-radius: 50%;
  height: 8px;
  width: 8px;
  min-width: 8px;
`;

const DeviceStatusTableGroupRenderer = (params) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {params.data.hierarchy.length === 1 && (
        // For the groups show the value and the count
        <>
          <DeviceStatusCircle
            status={params.node.allLeafChildren[0].data.status}
          />
          {`${params.value} (${params.node.allLeafChildren.length - 1} meters)`}
        </>
      )}
      {params.data.hierarchy.length > 1 && (
        // for the leaf nodes show the value
        <>
          <DeviceStatusCircle status={params.data.status} />
          {params.value}
        </>
      )}
    </div>
  );
};

DeviceStatusTableGroupRenderer.propTypes = propTypes;

export default DeviceStatusTableGroupRenderer;
