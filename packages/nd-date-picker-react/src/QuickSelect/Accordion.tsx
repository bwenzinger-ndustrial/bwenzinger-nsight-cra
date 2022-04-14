import styled from 'styled-components';

import Arrow from './Arrow';

const Title = styled.p`
  margin: 0;
`;

export interface AccordionTitleContainerProps {
  isOpen: boolean;
}

const TitleContainer = styled.div<AccordionTitleContainerProps>`
  align-items: center;
  display: flex;
  cursor: pointer;
  margin-bottom: ${({ isOpen }) => (isOpen ? '12px' : 0)};

  @media only screen and (min-width: 768px) {
    display: none;
  }

  ${Arrow} {
    margin-right: 4px;
  }
`;

const Label = styled.label`
  color: #606060;
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 1.33;
`;

export interface AccordionOptionsContainerProps {
  isOpen: boolean;
}

const OptionsContainer = styled.div<AccordionOptionsContainerProps>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;

  @media only screen and (min-width: 768px) {
    display: flex;
  }
`;

export {
  Label,
  Arrow as OpenIndicator,
  OptionsContainer,
  Title,
  TitleContainer
};
