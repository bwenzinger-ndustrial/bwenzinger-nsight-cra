import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Rect from '@reach/rect';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button, Wrapper } from '@ndustrial/nd-menu-button-react';
import { blacken } from '@ndustrial/nsight-common/utils/colors';

import { isSelectedGroup } from '../../services/routeService';
import Icon from './Icon';
import MenuList from './MenuList';

const StyledWrapper = styled(Wrapper)`
  flex-grow: 1;
  flex-shrink: 0;
  position: static;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    flex-grow: 0;
  }

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    flex-grow: 0;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
`;

const StyledMenuButton = styled(Button)`
  align-items: center;
  background-color: ${(props) =>
    props && props.$isSelected ? props.theme.colors.button : 'transparent'};
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  min-height: 40px;
  min-width: 70px;
  padding: 10px;
  white-space: nowrap;

  :hover {
    cursor: pointer;
  }

  :hover,
  &[aria-expanded='true'] {
    background-color: ${({ theme }) => blacken(theme.colors.primary, 0.3)};
  }

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    flex-direction: row;
    flex-grow: 0;
    min-width: 150px;
    padding: 0 20px;
  }
`;

const MenuButtonLabel = styled.span`
  font-size: 0.5rem;
  text-transform: uppercase;
  margin-top: 0.5rem;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    font-size: 0.875rem;
    text-transform: none;
    margin-left: 0.875rem;
    margin-top: 0;
  }
`;

const StyledIcon = styled(Icon)`
  background-color: ${({ theme }) => blacken(theme.colors.primary, 0.3)};
  border-radius: 50%;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    height: 20px;
    width: 20px;
  }

  /* stylelint-disable selector-no-qualifying-type */
  ${StyledMenuButton}:hover &,
  ${StyledMenuButton}:focus &,
  ${StyledMenuButton}[aria-expanded='true'] & {
    background-color: ${({ theme }) => blacken(theme.colors.primary, 0.4)};
  }
  /* stylelint-enable selector-no-qualifying-type */
`;

class NavBarItem extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    iconUrl: PropTypes.string,
    label: PropTypes.string.isRequired,
    grouping: PropTypes.object,
    location: PropTypes.object
  };

  constructor(props) {
    super(props);
    const isSelected = isSelectedGroup(
      props.grouping.applicationModules,
      props.location.pathname
    );

    this.state = {
      buttonRect: null,
      isOpen: false,
      menuRect: null,
      isSelectedGroup: isSelected
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      const isSelected = isSelectedGroup(
        this.props.grouping.applicationModules,
        this.props.location.pathname
      );
      this.setState({
        ...this.state,
        isSelectedGroup: isSelected
      });
    }
  }

  render() {
    return (
      <StyledWrapper
        className={this.props.className}
        data-expanded={this.state.isOpen}
        onMenuToggle={(isOpen) => this.setState({ isOpen })}
      >
        <Rect onChange={(buttonRect) => this.setState({ buttonRect })}>
          {({ ref }) => (
            <ButtonContainer ref={ref}>
              <StyledMenuButton
                tag="div"
                $isSelected={this.state.isSelectedGroup}
              >
                <StyledIcon src={this.props.iconUrl} />
                <MenuButtonLabel>{this.props.label}</MenuButtonLabel>
              </StyledMenuButton>
            </ButtonContainer>
          )}
        </Rect>
        <MenuList
          buttonRect={this.state.buttonRect}
          handleMenuRectChange={(menuRect) => this.setState({ menuRect })}
          menuRect={this.state.menuRect}
        >
          {this.props.children}
        </MenuList>
      </StyledWrapper>
    );
  }
}

const StyledNavBarItem = styled(withRouter(NavBarItem))``;

export {
  StyledMenuButton as NavBarItemButton,
  StyledWrapper as NavBarItemWrapper
};
export default StyledNavBarItem;
