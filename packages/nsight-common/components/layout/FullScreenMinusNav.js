import PropTypes from 'prop-types';
import styled from 'styled-components';

import { layoutConstants } from '../../constants';

const {
  NAV_BAR_HEIGHT_MOBILE,
  NAV_BAR_HEIGHT_DESKTOP,
  DEFAULT_HEADER_HEIGHT
} = layoutConstants;

const Content = styled.div`
  ${({ reduceHeightValue }) => {
    return `
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - ${NAV_BAR_HEIGHT_MOBILE +
        DEFAULT_HEADER_HEIGHT}px - ${reduceHeightValue}px);
      overflow: auto;
    
      @media screen and (min-width: 897px) and (orientation: landscape),
        screen and (min-width: 768px) and (orientation: portrait) {
        min-height: auto;
        height: calc(100vh - ${NAV_BAR_HEIGHT_DESKTOP +
          DEFAULT_HEADER_HEIGHT}px - ${reduceHeightValue}px);
      }
    `;
  }}

  

  ${({ noMargin }) =>
    noMargin &&
    `
      margin: 0 !important;
    `}

  ${({ noOverflow }) =>
    noOverflow &&
    `
      overflow: hidden !important;
    `}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    min-height: 100%;
  }

  ${Content} {
    margin-top: ${DEFAULT_HEADER_HEIGHT}px;
    margin-bottom: ${NAV_BAR_HEIGHT_MOBILE}px;

    @media screen and (min-width: 897px) and (orientation: landscape),
      screen and (min-width: 768px) and (orientation: portrait) {
      margin-bottom: 0;
      margin-top: ${DEFAULT_HEADER_HEIGHT + NAV_BAR_HEIGHT_DESKTOP}px;
    }
  }
`;

/**
 * @param {boolean} noMargin - pass in if you don't want to add a nav based margin.  Useful for containers
 * that are no meant to act as full window containers, but still use the full height of the window minus the nav
 * @param {boolean} noOverflow - force overflow on the container to be 'hidden'
 */
Content.propTypes = {
  noMargin: PropTypes.bool,
  noOverflow: PropTypes.bool,
  reduceHeightValue: PropTypes.number
};

Content.defaultProps = {
  reduceHeightValue: 0
};

export default { Container, Content };
