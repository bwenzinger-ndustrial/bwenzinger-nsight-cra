import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import faker from 'faker';

import Accordion from './index';

describe('nsight-rate-tariffs/components/ScheduleDetail/Accordion', function() {
  let baseProps;

  beforeEach(function() {
    baseProps = {
      children: <div />,
      title: faker.hacker.adjective()
    };
  });

  context('toggleOpenState', function() {
    it('closes the accordion content when it was previously open', function() {
      const accordion = shallow(<Accordion {...baseProps} />, {
        disableLifecycleMethods: true
      });

      accordion.instance().toggleOpenState();

      expect(accordion.state('isOpen')).to.be.false();
    });

    it('opens the accordion content when it was previously closed', function() {
      const accordion = shallow(<Accordion {...baseProps} />, {
        disableLifecycleMethods: true
      });

      accordion.setState({ isOpen: false });
      accordion.instance().toggleOpenState();

      expect(accordion.state('isOpen')).to.be.true();
    });
  });
});
