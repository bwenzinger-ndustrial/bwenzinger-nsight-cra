import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FlexContainer = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  height: ${(props) => props.height}px;
`;

const FullWidthDiv = styled.div`
  flex: 1;
  white-space: nowrap;
`;

const LightBlueLine = styled.line`
  stroke: #88aad2;
  stroke-width: 2px;
`;

// eslint-disable-next-line react/prop-types
function SideArrows({ itemCount, rowHeight }) {
  const height = itemCount * rowHeight;

  const lines = [];
  for (let i = 0; i < itemCount; i += 1) {
    const dashPosition = i * rowHeight + rowHeight / 2;
    lines.push(
      <LightBlueLine
        key={i}
        x1="20"
        x2="30"
        y1={dashPosition}
        y2={dashPosition}
      />
    );
  }

  return (
    <svg height={height} width="40">
      <LightBlueLine x1="20" y1="0" x2="20" y2={height - rowHeight / 2} />
      {lines}
    </svg>
  );
}

function TreeItem({ className, component, children, itemHeight }) {
  const childCount = React.Children.count(children);
  return (
    <div className={className}>
      <FlexContainer height={itemHeight}>{component}</FlexContainer>
      {childCount > 0 && (
        <FlexContainer>
          <SideArrows itemCount={childCount} rowHeight={itemHeight} />
          <FullWidthDiv height={itemHeight}>{children}</FullWidthDiv>
        </FlexContainer>
      )}
    </div>
  );
}

TreeItem.defaultProps = {
  itemHeight: 40
};

TreeItem.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node,
  component: PropTypes.node.isRequired,
  itemHeight: PropTypes.number
};

export default styled(TreeItem)``;
