import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { QueryLink } from '@ndustrial/nsight-common/components';

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.string,
      id: PropTypes.number,
      icon: PropTypes.string,
      isSelected: PropTypes.bool,
      label: PropTypes.string,
      subText: PropTypes.string,
      url: PropTypes.string
    })
  ),
  selectedContractId: PropTypes.string
};

const groupingColors = {
  active: '#8ec640',
  expired: '#e3687c',
  expiringSoon: '#ffd166'
};

const ContractListTitle = styled.div`
  font-size: 1rem;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    width: 350px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ContractListSubtext = styled.div`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #717171;
  font-size: 0.7rem;
  font-style: italic;
  font-weight: 400;
  padding-top: 5px;
`;

const ContractListItemLink = styled(QueryLink)`
  align-items: center;
  border: 1px solid #f2f2f2;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  font-weight: 400;
  outline: none;
  padding: 10px 15px;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  white-space: nowrap;

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.primary};
    /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
    color: #fff;

    ${ContractListSubtext} {
      /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
      color: #fff;
    }
  }
`;

const ActiveContractListItemLink = styled(ContractListItemLink)`
  background: ${({ theme }) => theme.colors.primary};
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;

  ${ContractListSubtext} {
    /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
    color: #fff;
  }
`;

const ContractListStatus = styled.i`
  background: #c2c2c2;
  border-radius: 50%;
  font-size: 0.5rem;
  height: 12px;
  margin-right: 6px;
  text-align: center;
  width: 12px;

  ${({ group }) =>
    groupingColors[group] ? `background: ${groupingColors[group]}` : ''}
`;

const ContractListTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function ContractListItem(props) {
  const { data } = props;

  return (
    <div>
      {data.map((item) => {
        const Link = item.isSelected
          ? ActiveContractListItemLink
          : ContractListItemLink;
        return (
          <Link key={item.id} to={`${item.url}`}>
            <ContractListStatus group={item.group}></ContractListStatus>
            <ContractListTextContainer>
              <ContractListTitle>{item.label}</ContractListTitle>
              {item.subText && (
                <ContractListSubtext>{item.subText}</ContractListSubtext>
              )}
            </ContractListTextContainer>
          </Link>
        );
      })}
    </div>
  );
}

ContractListItem.propTypes = propTypes;

export default ContractListItem;
