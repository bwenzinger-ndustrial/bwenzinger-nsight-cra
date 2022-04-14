import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UnstyledBackground from './Background';
import UnstyledInstructions from './Instructions';

const propTypes = {
  requiredType: PropTypes.string.isRequired
};

const defaultProps = {
  requiredType: 'facility'
};

const Background = styled(UnstyledBackground)``;
const Instructions = styled(UnstyledInstructions)``;

const Container = styled.div`
  background-color: #f3f6f9;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
`;

function MissingSelection({ requiredType }) {
  return (
    <Container>
      <Instructions requiredType={requiredType} />
      <Background requiredType={requiredType} />
    </Container>
  );
}

MissingSelection.propTypes = propTypes;
MissingSelection.defaultProps = defaultProps;

export default MissingSelection;
