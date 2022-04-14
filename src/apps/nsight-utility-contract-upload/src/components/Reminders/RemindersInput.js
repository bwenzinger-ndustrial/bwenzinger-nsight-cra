import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Chip, ChipIcon, ChipLabel } from '@ndustrial/nd-chip-react';
import { Close, Search } from '@ndustrial/nd-icons-svg';
import { InputTextField } from '@ndustrial/nd-inputs-react';

import { colors } from '../../common/constants.js';
import { SubscribedUsersTooltip } from '../../common/Tooltips';

const propTypes = {
  addReminder: PropTypes.func.isRequired,
  filterUsers: PropTypes.func,
  filteredUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired,
  formMode: PropTypes.string.isRequired,
  label: PropTypes.string,
  reminders: PropTypes.array.isRequired,
  removeReminder: PropTypes.func.isRequired
};

const SearchBox = styled(InputTextField)`
  input {
    font-size: 0.625rem;
    transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
`;

const SearchBoxIcon = styled(Search)`
  height: 15px;
  width: 15px;
  stroke: ${colors.grayDark};
`;

const SelectedReminders = styled.div`
  margin-top: 10px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid ${colors.grayDark};

  ${Chip} {
    font-size: 0.875rem;
    margin: 5px;
  }
`;

const LabelText = styled.span`
  font-size: 0.833rem;
  color: ${colors.grayVeryDark};
  font-style: italic;
`;

const ReminderLabel = styled.div`
  align-items: center;
  display: flex;

  ${LabelText} {
    margin-right: 10px;
  }
`;

const RemindersContainer = styled.div`
  margin: 10px 0;
  position: relative;
`;

const ReminderList = styled.ul`
  height: 330px;
  left: 0;
  margin: 0 0 10px;
  overflow-y: scroll;
  padding: 0;
  position: absolute;
  top: 48px;
  width: 100%;
  z-index: 10;
`;

const ReminderItem = styled.li`
  font-size: 0.625rem;
  display: flex;
  color: ${colors.blueDark};
  font-weight: 700;
  border: 1px solid ${colors.grayDark};
  align-items: baseline;
  background: #fff;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  white-space: nowrap;
  padding: 10px 15px;
  user-select: none;
  cursor: pointer;
  outline: 0;
`;

const NoRemindersText = styled.p`
  font-size: 0.75rem;
  color: ${colors.grayDark};
  font-style: italic;
  line-height: 1.5;
`;

function RemindersInput({
  addReminder,
  filterUsers,
  filteredUsers,
  label,
  reminders,
  removeReminder
}) {
  const remindersInputRef = React.createRef();

  return (
    <RemindersContainer>
      <ReminderLabel>
        <LabelText>{label}</LabelText>
        <SubscribedUsersTooltip />
      </ReminderLabel>

      <SearchBox
        onChange={filterUsers}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        placeholder="Search users"
        type="search"
        ref={remindersInputRef}
        endIcon={<SearchBoxIcon />}
      />

      {filteredUsers.length > 0 && (
        <ReminderList>
          {filteredUsers.map((item, idx) => (
            <ReminderItem
              key={item.id + '_' + idx}
              onClick={() => addReminder(item, remindersInputRef)}
            >
              {item.label}
            </ReminderItem>
          ))}
        </ReminderList>
      )}

      <SelectedReminders>
        {reminders.length > 0 ? (
          reminders.map((item, idx) => (
            <Chip key={item.userId + '_' + idx}>
              <ChipIcon
                onClick={() => {
                  removeReminder(item);
                }}
              >
                <Close />
              </ChipIcon>
              <ChipLabel>{item.label}</ChipLabel>
            </Chip>
          ))
        ) : (
          <NoRemindersText>
            Search for a user above to remind them of upcoming contract
            expirations!
          </NoRemindersText>
        )}
      </SelectedReminders>
    </RemindersContainer>
  );
}

RemindersInput.propTypes = propTypes;

export default RemindersInput;
