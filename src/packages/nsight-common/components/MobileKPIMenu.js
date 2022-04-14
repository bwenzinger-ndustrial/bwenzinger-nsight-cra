import React from 'react';
import { useSelector } from 'react-redux';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SecondaryButton } from '@ndustrial/nd-button-react';
import { Gear } from '@ndustrial/nd-icons-svg';
import KPIMenu from '@ndustrial/nsight-common/components/KPIMenu';
import { getFacilityConfigs } from '@ndustrial/nsight-common/selectors/kpi/getKpiConfig';

const GearIcon = styled(({ isOptionsMenuOpen, ...rest }) => <Gear {...rest} />)`
  border-radius: 50%;
  background-color: ${(prop) =>
    prop.isOptionsMenuOpen ? '#0b588a' : '#ffffff'};
  padding: 0;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    padding: 5px;
  }
`;

const DividerLine = styled.div`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  background-color: #e6e6e6;
  width: 1px;
`;

const KPIText = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 300;
  font-size: ${rem('12px')};
  padding-left: 5px;
`;

const StyledGearMenuWrapper = styled.div`
  display: inline-flex;
  background-color: ${(prop) => (prop.isOptionsMenuOpen ? '#FBFBFB' : 'none')};
  border-top: ${(prop) =>
    prop.isOptionsMenuOpen ? '2px solid #0B588A' : 'none'};
`;

const MobileKPISelector = styled.div`
  align-items: center;
  border-bottom: 1px solid #d8d8d8;
  display: inline-flex;
  flex: 1;
`;

const DisplayWrapper = styled.div`
  display: ${(prop) => (prop.isOptionsMenuOpen ? 'flex' : 'none')};

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    display: flex;
  }
`;

const MobileKPIWrapper = styled.div`
  display: none;
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  background-color: #f5f6f5;
  width: 100%;
  padding: 0;
  align-items: center;
  position: relative;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    display: inline-flex;
  }

  ${KPIText} {
    margin: 0 15px 0 10px;
  }

  ${StyledGearMenuWrapper} {
    margin: -5px 0;
    padding: 10px 10px 10px 0;
  }

  ${DividerLine} {
    margin: -10px 0;
  }
`;

const StyledButton = styled(({ isOptionsMenuOpen, ...rest }) => (
  <SecondaryButton {...rest} />
))`
  cursor: pointer;
  background: transparent;
  border: 0;
  margin-left: 10px;
  border-radius: 50%;
  background-color: ${(prop) =>
    prop.isOptionsMenuOpen ? '#0b588a' : 'transparent'};

  :hover svg,
  svg {
    stroke: ${(props) => (props.isOptionsMenuOpen ? '#ffffff' : '#0B588A')};
  }
`;

const StyledKpiMenu = styled(KPIMenu)`
  flex: 1;
  margin: 10px 10px 10px 0;
`;

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  handleMenuChange: PropTypes.func.isRequired,
  isOptionsMenuOpen: PropTypes.bool.isRequired
};

function MobileKPIMenu({
  children,
  className,
  handleMenuChange,
  isOptionsMenuOpen
}) {
  const allKpiConfigs = useSelector(getFacilityConfigs);

  return (
    <React.Fragment>
      <MobileKPIWrapper
        className={className}
        isOptionsMenuOpen={isOptionsMenuOpen}
      >
        {allKpiConfigs && (
          <MobileKPISelector>
            <KPIText>KPI:</KPIText>
            <StyledKpiMenu allKpiConfigs={allKpiConfigs} />
          </MobileKPISelector>
        )}

        <StyledGearMenuWrapper isOptionsMenuOpen={isOptionsMenuOpen}>
          <DividerLine />
          <StyledButton
            data-testid="gear-button"
            isOptionsMenuOpen={isOptionsMenuOpen}
            onClick={handleMenuChange}
          >
            <GearIcon isOptionsMenuOpen={isOptionsMenuOpen} />
          </StyledButton>
        </StyledGearMenuWrapper>
      </MobileKPIWrapper>
      <DisplayWrapper
        data-testid="mobile-dropdown"
        isOptionsMenuOpen={isOptionsMenuOpen}
      >
        {children}
      </DisplayWrapper>
    </React.Fragment>
  );
}

MobileKPIMenu.propTypes = propTypes;

export default MobileKPIMenu;
