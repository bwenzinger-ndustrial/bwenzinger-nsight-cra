import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { fixtures } from '@ndustrial/nsight-test-utils';

import Header from './Header';

describe('nsight-dashboard/components/Header', function() {
  let baseProps;

  beforeEach(function() {
    baseProps = {
      actions: {
        user: {
          logOutUser: sinon.stub()
        }
      },
      location: { search: '' },
      user: fixtures.build('userProfile')
    };
  });

  afterEach(function() {
    sinon.restore();
  });

  context('handleSelection', function() {
    let header;

    beforeEach(function() {
      header = shallow(<Header {...baseProps} />, {
        disableLifecycleMethods: true
      });
    });

    context('logOut', function() {
      beforeEach(function() {
        header.instance().handleSelection('logOut');
      });

      it('logs the user out', function() {
        expect(baseProps.actions.user.logOutUser).to.be.calledOnce();
      });
    });
  });
});
