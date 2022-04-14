import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  hasBorder: PropTypes.bool
};

const fieldTopMargin = 15;

const FieldSectionWrapper = styled.div`
  margin-top: ${fieldTopMargin}px;

  border: ${({ $hasBorder }) => ($hasBorder ? '1px solid #e6e6e6' : '')};
  padding: ${({ $hasBorder }) => ($hasBorder ? '15px' : '')};
`;

const FieldSubSection = styled.div`
  display: flex;
`;

function FieldSection({ className, children, hasBorder }) {
  return (
    <FieldSectionWrapper $hasBorder={hasBorder} className={className}>
      {React.Children.map(children, (child) => (
        <FieldSubSection>{child}</FieldSubSection>
      ))}
    </FieldSectionWrapper>
  );
}

FieldSection.propTypes = propTypes;

export default FieldSection;
