import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';

import Callback from './Callback';

describe('nsight-dashboard/components/Authentication/Callback', function() {
  beforeEach(function() {
    this.sandbox = sinon.createSandbox();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  context('componentDidMount', function() {
    beforeEach(function() {
      this.sandbox.stub(contxtSdk.auth, 'handleAuthentication');

      const callback = shallow(<Callback />, {
        disableLifecycleMethods: true
      });
      callback.instance().componentDidMount();
    });

    it("parses and handles the user's authentication information", function() {
      expect(contxtSdk.auth.handleAuthentication).to.be.calledOnce();
    });
  });
});
