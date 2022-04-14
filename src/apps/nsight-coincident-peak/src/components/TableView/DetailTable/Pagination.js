import React from 'react';
import { Link as UnstyledLink, useLocation } from 'react-router-dom';
import moment from 'moment';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { ArrowLeftCircle, ArrowRightCircle } from '@ndustrial/nd-icons-svg';
import { getSearchString } from '@ndustrial/nsight-common/utils';

const propTypes = {
  availableDates: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  visibleDate: PropTypes.string
};

const DATE_FORMAT = 'YYYY-MM-DD';
const FRIENDLY_DATE_FORMAT = 'dddd, MMMM D, YYYY';

const arrowStyles = css`
  font-size: ${rem('20px')};
`;

const LeftArrow = styled(ArrowLeftCircle)`
  ${arrowStyles}
`;

const RightArrow = styled(ArrowRightCircle)`
  ${arrowStyles}
`;

const Link = styled(UnstyledLink)`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  font-size: ${rem('16px')};
  letter-spacing: 0.44px;
  line-height: 1.5;
  position: absolute;

  ${({ position }) => {
    if (position === 'left') {
      return { left: 0 };
    }
  }};

  ${({ position }) => {
    if (position === 'right') {
      return { right: 0 };
    }
  }};

  ${LeftArrow} {
    margin-right: 4px;
  }

  ${RightArrow} {
    margin-left: 4px;
  }
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  width: 100%;
`;

function Pagination({ availableDates, className, visibleDate }) {
  const { search } = useLocation();

  const selectedIndex = availableDates.indexOf(visibleDate);
  const previousDate = availableDates[selectedIndex - 1];
  const nextDate = availableDates[selectedIndex + 1];

  const previousDateUrl = previousDate && {
    search: `?${getSearchString({
      addParams: {
        visibleDate: previousDate
      },
      searchString: search
    })}`
  };
  const nextDateUrl = nextDate && {
    search: `?${getSearchString({
      addParams: {
        visibleDate: nextDate
      },
      searchString: search
    })}`
  };

  return (
    <Container className={className}>
      {previousDate ? (
        <Link position="left" to={previousDateUrl}>
          <LeftArrow />
          {moment(previousDate, DATE_FORMAT).format(FRIENDLY_DATE_FORMAT)}
        </Link>
      ) : null}

      {nextDate ? (
        <Link position="right" to={nextDateUrl}>
          {moment(nextDate, DATE_FORMAT).format(FRIENDLY_DATE_FORMAT)}
          <RightArrow />
        </Link>
      ) : null}
    </Container>
  );
}

Pagination.propTypes = propTypes;

export default Pagination;
