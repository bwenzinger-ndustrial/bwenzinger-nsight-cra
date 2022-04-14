import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import faker from 'faker';
import sinon from 'sinon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';

import Rates from './index';
import RatesModule from './services/RatesModule';

describe('nsight-rate-tariffs/RateTariffs', function() {
  let baseProps;

  beforeEach(function() {
    sinon.stub(contxtSdk, 'mountDynamicModule');
    sinon.stub(contxtSdk, 'unmountDynamicModule');

    baseProps = {
      match: {
        path: `/${faker.internet.domainWord()}`
      }
    };
  });

  afterEach(function() {
    sinon.restore();
  });

  describe('constructor', function() {
    beforeEach(function() {
      shallow(<Rates {...baseProps} />, {
        disableLifecycleMethods: true
      });
    });

    it('mounts the Rates module in the SDK', function() {
      expect(contxtSdk.mountDynamicModule).to.be.calledWith('rates', {
        clientId: contxtSdk.config.audiences.rates.clientId,
        host: contxtSdk.config.audiences.rates.host,
        module: RatesModule
      });
    });
  });

  describe('componentWillUnmount', function() {
    beforeEach(function() {
      const index = shallow(<Rates {...baseProps} />, {
        disableLifecycleMethods: true
      });

      index.instance().componentWillUnmount();
    });

    it('unmounts the Rates module from the SDK', function() {
      expect(contxtSdk.unmountDynamicModule).to.be.calledWith('rates');
    });
  });
});
