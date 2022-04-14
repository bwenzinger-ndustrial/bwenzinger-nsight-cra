import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Checkbox } from '@ndustrial/nd-inputs-react';

const propTypes = {
  className: PropTypes.string,
  currentUserId: PropTypes.string.isRequired,
  subscribeUserToEvent: PropTypes.func.isRequired,
  unsubscribeUserFromEvent: PropTypes.func.isRequired
};

const StyledCheckbox = styled(Checkbox)`
  margin: auto;
`;

const DeviceStatusTableCheckboxCellRenderer = (params) => {
  return (
    <div style={{ width: '100%', height: '40px', display: 'flex' }}>
      {/* only show the checkbox for the groups  */}
      {params.data.hierarchy.length === 1 && (
        <StyledCheckbox
          checked={params.value}
          onChange={(e) => {
            params.value && params.value === true
              ? params.unsubscribeUserFromEvent(
                  params.currentUserId,
                  params.data.userEventSubscriptionId,
                  params.data.eventId
                )
              : params.subscribeUserToEvent(
                  params.currentUserId,
                  params.data.eventId
                );
          }}
        />
      )}
    </div>
  );
};

DeviceStatusTableCheckboxCellRenderer.propTypes = propTypes;

export default DeviceStatusTableCheckboxCellRenderer;
