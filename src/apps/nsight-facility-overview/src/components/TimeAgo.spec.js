import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import TimeAgo, { TIME_AGO_INTERVAL } from './TimeAgo';

describe('nsight-facility-overview/components/TimeAgo', function() {
  let baseProps;
  let timeAgo;

  beforeEach(function() {
    this.clock = sinon.useFakeTimers();
    baseProps = {
      date: Date.now()
    };
    timeAgo = mount(<TimeAgo {...baseProps} />);
  });

  afterEach(function() {
    timeAgo.unmount();
  });

  context('on mount', function() {
    it('shows human readable time ago', function() {
      expect(timeAgo.find('time').text()).to.equal('a few seconds ago');
    });

    it(`updates every ${TIME_AGO_INTERVAL / 1000} seconds`, function() {
      this.clock.tick(TIME_AGO_INTERVAL);
      expect(timeAgo.find('time').text()).to.equal('a few seconds ago');
      this.clock.tick(TIME_AGO_INTERVAL);
      expect(timeAgo.find('time').text()).to.equal('a minute ago');
      this.clock.tick(TIME_AGO_INTERVAL);
      expect(timeAgo.find('time').text()).to.equal('2 minutes ago');
    });
  });
});
