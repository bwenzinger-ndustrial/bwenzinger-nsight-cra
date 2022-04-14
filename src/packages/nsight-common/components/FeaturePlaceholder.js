import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  CircleOutline as UnstyledCircleOutlineIcon,
  Key as UnstyledKeyIcon
} from '@ndustrial/nd-icons-svg';

import Card, { Content, Header } from './Card';

const PlaceholderImage = styled.img`
  position: relative;
  left: 0;
  top: 0;
  right: 100%;
  bottom: 100%;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  z-index: 1;
`;

const CircleOutlineIcon = styled(UnstyledCircleOutlineIcon)`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  stroke: #2764ae;
  font-size: 48px;
`;

const KeyIcon = styled(UnstyledKeyIcon)`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  stroke: #4b9d1c;
  font-size: 24px;
`;

const StyledCard = styled(Card)`
  padding: 0;
  overflow: hidden;

  ${Header} {
    margin-bottom: 0;
    margin-top: 0;
    height: 0;
  }
  ${Content} {
    margin-top: 0;
  }
`;

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 100%;
  bottom: 100%;
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const IconContainer = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
`;

const TextBlock = styled.p`
  padding-left: 18px;
  padding-right: 18px;
  text-align: center;
  line-height: 24px;

  @media screen and (min-width: 768px) {
    padding-left: 48px;
    padding-right: 48px;
  }
`;

const BoldTextBlock = styled(TextBlock)`
  font-weight: 500;
`;

const ItalicTextBlock = styled(TextBlock)`
  font-style: italic;
`;

const propTypes = {
  placeholder: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subtext: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

const FeaturePlaceholder = (props) => {
  const { placeholder, text, subtext } = props;

  return (
    <StyledCard>
      <PlaceholderImage src={placeholder} />
      <Container>
        <IconContainer>
          <Container>
            <CircleOutlineIcon />
          </Container>
          <Container>
            <KeyIcon />
          </Container>
        </IconContainer>
        <BoldTextBlock>{text}</BoldTextBlock>
        <ItalicTextBlock>{subtext}</ItalicTextBlock>
      </Container>
    </StyledCard>
  );
};

FeaturePlaceholder.propTypes = propTypes;

export default FeaturePlaceholder;
