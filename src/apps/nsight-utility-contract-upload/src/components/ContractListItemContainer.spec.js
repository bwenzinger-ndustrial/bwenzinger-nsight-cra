import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import faker from 'faker';

import { fixtures } from '@ndustrial/nsight-test-utils';

import ContractListItemContainer from './ContractListItemContainer';

describe('nsight-utility-contract-upload/components/ContractListItemContainer', function() {
  let baseProps;
  let wrapper;

  beforeEach(function() {
    baseProps = {
      data: [],
      group: faker.random.word(),
      selectedFacility: fixtures.build('facility'),
      selectedOrg: fixtures.build('organization')
    };

    wrapper = shallow(<ContractListItemContainer {...baseProps} />, {
      disableLifecycleMethods: true
    });
  });

  describe('constructor', function() {
    it('sets up an initial state', function() {
      const { isOpen } = wrapper.state();
      expect(isOpen).to.equal(true);
    });
  });

  describe('toggleSubList', function() {
    it('inverts boolean isOpen state when called', function() {
      wrapper.instance().toggleSubList();
      expect(wrapper.state().isOpen).to.equal(false);
    });
  });
});
