import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  OpenIndicator,
  SectionTitle,
  SectionTitleContainer
} from './SectionTitle';

const Content = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  padding: 14px;

  ${SectionTitleContainer} {
    margin-bottom: 8px;
  }
`;

class Accordion extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    hasRule: PropTypes.bool,
    title: PropTypes.string.isRequired
  };

  state = {
    isOpen: true
  };

  toggleOpenState = () => {
    this.setState((prevState) => {
      return { isOpen: !prevState.isOpen };
    });
  };

  render() {
    return (
      <div className={this.props.className}>
        <SectionTitleContainer
          hasRule={this.props.hasRule}
          onClick={this.toggleOpenState}
        >
          <OpenIndicator isOpen={this.state.isOpen} />
          <SectionTitle>{this.props.title}</SectionTitle>
        </SectionTitleContainer>

        <Content isOpen={this.state.isOpen}>{this.props.children}</Content>
      </div>
    );
  }
}

export default Accordion;
