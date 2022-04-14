import React, { forwardRef, useEffect } from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Search } from '@ndustrial/nd-icons-svg';
import { InputText } from '@ndustrial/nd-inputs-react';
import { blacken, whiten } from '@ndustrial/nsight-common/utils/colors';

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.string
};

const Input = styled(InputText)`
  background-color: ${({ theme }) => blacken(theme.colors.primary, 0.2)};
  border-color: ${({ theme }) =>
    whiten(blacken(theme.colors.primary, 0.2), 0.4)};
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;
  font-size: ${rem('14px')};
  padding-right: 30px;

  :focus {
    border-color: ${({ theme }) =>
      whiten(blacken(theme.colors.primary, 0.2), 0.8)};
  }

  ::placeholder {
    color: ${({ theme }) => whiten(blacken(theme.colors.primary, 0.2), 0.5)};
  }
`;

const SearchIcon = styled(Search)`
  cursor: pointer;
  stroke: ${({ theme, value }) =>
    value ? '#fff' : whiten(blacken(theme.colors.primary, 0.2), 0.4)};
  pointer-events: ${({ theme, value }) => (value ? 'auto' : 'none')};
  height: 14px;
  width: 14px;
`;

const Container = styled.div`
  position: relative;

  ${SearchIcon} {
    position: absolute;
    right: 10px;
    transform: translateY(-50%);
    top: 50%;
  }
`;

const SearchBox = forwardRef((props, ref) => {
  const { className, value, ...rest } = props;

  useEffect(() => {
    ref.current.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container className={className}>
      <Input ref={ref} value={value} {...rest} />
      <SearchIcon />
    </Container>
  );
});

SearchBox.propTypes = propTypes;
SearchBox.displayName = 'SearchBox';

export default SearchBox;
