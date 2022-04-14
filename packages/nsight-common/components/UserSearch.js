import React, { useEffect, useMemo, useRef, useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Search } from '@ndustrial/nd-icons-svg';
import { InputTextField } from '@ndustrial/nd-inputs-react';
import { whiten } from '@ndustrial/nsight-common/utils/colors';

import useListKeyboardListeners from '../hooks/useListKeyboardListeners';

const propTypes = {
  onUserSelected: PropTypes.func.isRequired,
  className: PropTypes.string,
  users: PropTypes.array,
  isFocused: PropTypes.bool,
  excludedIds: PropTypes.array
};

const SearchBox = styled(InputTextField)`
  input {
    height: 41px;
    transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
`;

const SearchBoxIcon = styled(Search)`
  height: 15px;
  width: 15px;
`;

const UserList = styled.ul`
  min-height: 330px;
  left: 0;
  margin: 0 0 10px;
  overflow-y: scroll;
  padding: 0;
  top: 48px;
  width: 100%;
  z-index: 10;
`;

const User = styled.li`
  font-size: 0.75rem;
  display: flex;
  font-weight: 700;
  align-items: baseline;

  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  white-space: nowrap;
  padding: 10px 15px;
  user-select: none;
  cursor: pointer;
  outline: 0;

  background-color: ${({
    isFocused,
    theme: {
      colors: { primary }
    }
  }) => {
    if (isFocused) {
      return whiten(primary, 0.8);
    }
    return 'transparent';
  }};
  &:hover {
    background-color: ${({
      theme: {
        colors: { primary }
      }
    }) => whiten(primary, 0.9)};
  }
`;

// isFocused prop provides a way to default the cursor inside the search box
function UserSearch({
  onUserSelected,
  users,
  className,
  isFocused,
  excludedIds
}) {
  const userSearchRef = useRef();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [_isFocused, _setIsFocused] = useState(isFocused === true);

  const selectedIndex = useListKeyboardListeners(
    userSearchRef,
    filteredUsers,
    (user) => {
      userSearchRef.current.value = '';
      onUserSelected(user);
    }
  );

  useEffect(() => {
    setFilteredUsers(sortAndFilterExcludedUsers(users));
  }, [users, excludedIds]); // eslint-disable-line react-hooks/exhaustive-deps

  function sortAndFilterExcludedUsers(users) {
    const tempExcludedIds = excludedIds || [];
    return users
      ? users
          .filter((x) => !tempExcludedIds.includes(x.id))
          .sort((userA, userB) => {
            if (userA.lastName > userB.lastName) return 1;
            if (userA.lastName < userB.lastName) return -1;
            return 0;
          })
      : [];
  }

  const filterUsers = useMemo(
    () =>
      _.debounce(
        (event) => {
          if (!event || !event.target.value.length) {
            return setFilteredUsers(sortAndFilterExcludedUsers(users));
          }

          // Split the search input box into multiple terms based on spaces in the text box
          const searchTerms = event.target.value.split(' ');

          const filteredUsers = searchTerms.reduce((memo, searchTerm) => {
            if (!searchTerm) {
              return memo;
            }

            return memo.filter((user) => {
              return (
                user.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) >
                  -1 ||
                user.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) >
                  -1
              );
            });
          }, users);

          setFilteredUsers(sortAndFilterExcludedUsers(filteredUsers));
        },
        300,
        { trailing: true }
      ),
    [users, excludedIds] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <div className={className}>
      <SearchBox
        id="searchbox3"
        autocomplete="off"
        onChange={(e) => {
          e.persist();
          filterUsers(e);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        ref={userSearchRef}
        placeholder="Search users"
        endIcon={<SearchBoxIcon />}
        onFocus={(e) => {
          _setIsFocused(true);
        }}
        onBlur={(e) => {
          _setIsFocused(false);
        }}
        autoFocus={_isFocused}
      />

      {_isFocused && filteredUsers && filteredUsers.length > 0 && (
        <UserList>
          {filteredUsers.map((item, idx) => (
            <User
              key={item.id + '_' + idx}
              onMouseDown={() => {
                onUserSelected(item);
              }}
              isFocused={
                (selectedIndex > filteredUsers.length
                  ? filteredUsers.length
                  : selectedIndex) === idx
              }
            >
              {item.lastName + ', ' + item.firstName + ' (' + item.email + ')'}
            </User>
          ))}
        </UserList>
      )}
    </div>
  );
}

UserSearch.propTypes = propTypes;

export default UserSearch;
