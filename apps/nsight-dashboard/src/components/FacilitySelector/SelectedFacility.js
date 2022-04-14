import React, { Component } from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Subheader = styled.h3`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;
  font-size: ${rem('12px')};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-style: italic;
  font-weight: 700;
  margin: 0;
`;

const Content = styled.div`
  flex: 1;

  ${Subheader} {
    margin-top: 5px;
  }
`;

const Header = styled.h3`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;
  font-size: ${rem('14px')};
  font-weight: 300;
  line-height: 1;
  margin: 0;

  @media screen and (min-width: 600px) {
    font-size: ${rem('20px')};
  }
`;

class SelectedFacility extends Component {
  static propTypes = {
    className: PropTypes.string,
    facility: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    organization: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  };

  render() {
    const { facility, organization } = this.props;

    return (
      <Content>
        <Header>{facility.name}</Header>
        {organization && <Subheader>{organization.name}</Subheader>}
      </Content>
    );
  }
}

export default SelectedFacility;
