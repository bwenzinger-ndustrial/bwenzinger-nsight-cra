import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Search } from '@ndustrial/nd-icons-svg';
import { InputText } from '@ndustrial/nd-inputs-react';

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.string
};

const Input = styled(InputText)`
  background-color: #fbfbfb;
  border-color: #f1f1f1;
  font-size: 0.9rem;
  flex: 1;
  display: inline-flex;

  ::placeholder {
    color: #808080;
  }
`;

const SearchIcon = styled(Search)`
  cursor: pointer;
  stroke: ${({ theme }) => theme.colors.primary};
  height: 14px;
  width: 14px;
`;

const Container = styled.div`
  position: relative;
  display: inline-block;
  justify-content: space-between;
  width: 100%;
`;

function SearchBox(props) {
  const { className, value, ...rest } = props;

  return (
    <Container className={className}>
      <Input value={value} {...rest} type="text" endIcon={<SearchIcon />} />
    </Container>
  );
}

SearchBox.propTypes = propTypes;

export default SearchBox;
