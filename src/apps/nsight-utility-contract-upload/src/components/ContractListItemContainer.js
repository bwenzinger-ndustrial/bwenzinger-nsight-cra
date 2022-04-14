import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ChevronRight as UnstlyedChevronRight } from '@ndustrial/nd-icons-svg';

import ContractListItem from './ContractListItem';

const ChevronRight = styled(UnstlyedChevronRight)`
  font-size: 12px;
`;

const ShowGroup = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

const ContractListGroup = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  flex: 1;
  font-size: 0.75rem;
`;

const ContractListGroupNumber = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;
  font-size: 0.625rem;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
`;

const ContractListGroupContainer = styled.div`
  align-items: baseline;
  background: #e8e8e8;
  border: 1px solid #d7d7d7;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: flex;
  padding: 3px 10px;
  transition: $default-transition;
  white-space: nowrap;

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.primary};
    /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
    color: #fff;

    ${ChevronRight} {
      stroke: #fff;
    }

    ${ContractListGroupNumber} {
      background: #fff;
      color: ${({ theme }) => theme.colors.primary};
    }

    ${ContractListGroup} {
      /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
      color: #fff;
    }
  }
`;

const ArrowIconWrapper = styled.span`
  font-size: 0.5rem;
  line-height: 1;
  margin-right: 10px;
  ${(props) => (props.isOpen ? 'transform:  rotate(90deg);' : '')};
`;

class ContractListItemContainer extends Component {
  static propTypes = {
    data: PropTypes.array,
    group: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = { isOpen: true };
  }

  toggleSubList = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { data, group } = this.props;

    return (
      <div>
        <ContractListGroupContainer onClick={this.toggleSubList}>
          <ArrowIconWrapper isOpen={this.state.isOpen}>
            <ChevronRight />
          </ArrowIconWrapper>
          <ContractListGroup>{group}</ContractListGroup>
          <ContractListGroupNumber>
            {data ? data.length : 0}
          </ContractListGroupNumber>
        </ContractListGroupContainer>
        <ShowGroup isOpen={this.state.isOpen}>
          {data && <ContractListItem data={data} />}
        </ShowGroup>
      </div>
    );
  }
}

export default ContractListItemContainer;
