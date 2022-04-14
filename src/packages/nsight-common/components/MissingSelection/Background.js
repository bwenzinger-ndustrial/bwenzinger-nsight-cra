import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NoFacilityBackgroundIcon from '../../assets/claw.svg';

const propTypes = {
  requiredType: PropTypes.string.isRequired
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const NoFacilityText = styled.h1`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #a7a6a6;
  font-size: ${rem('24px')};
  font-weight: 300;
  line-height: ${rem('28px')};
  text-align: center;
`;

const NoFacilityImage = styled.img`
  max-height: 300px;
  max-width: 100%;
  max-height: 300px;
`;

function Background({ requiredType }) {
  const selectionText = {
    facility: 'Facility',
    organization: 'Organization'
  }[requiredType];

  return (
    <Container>
      <NoFacilityText>
        Which {selectionText} Are <br /> You Looking For?
      </NoFacilityText>
      <NoFacilityImage src={NoFacilityBackgroundIcon} />
    </Container>
  );
}

Background.propTypes = propTypes;

export default Background;
