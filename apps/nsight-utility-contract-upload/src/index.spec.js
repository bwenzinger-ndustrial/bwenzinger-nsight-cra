import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import faker from 'faker';
import sinon from 'sinon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';

import ContractUpload from './index';
import EmsModule from './services/EmsModule';

describe('nsight-utility-contract-upload/ContractUpload />', function() {
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
      shallow(<ContractUpload {...baseProps} />, {
        disableLifecycleMethods: true
      });
    });

    it('mounts the EMS module in the SDK', function() {
      expect(contxtSdk.mountDynamicModule).to.be.calledWith('ems', {
        clientId: contxtSdk.config.audiences.ems.clientId,
        host: contxtSdk.config.audiences.ems.host,
        module: EmsModule
      });
    });
  });

  describe('componentWillUnmount', function() {
    beforeEach(function() {
      const index = shallow(<ContractUpload {...baseProps} />, {
        disableLifecycleMethods: true
      });

      index.instance().componentWillUnmount();
    });

    it('unmounts the EMS module from the SDK', function() {
      expect(contxtSdk.unmountDynamicModule).to.be.calledWith('ems');
    });
  });
});
