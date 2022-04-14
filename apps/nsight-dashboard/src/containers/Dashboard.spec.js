import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { Dashboard } from './Dashboard';

describe('nsight-dashboard/containers/Dashboard', function() {
  let baseProps;

  beforeEach(function() {
    this.sandbox = sinon.createSandbox();

    baseProps = {
      actions: {
        organizations: {
          loadOrganizations: this.sandbox.stub()
        },
        user: {
          loadUserInfo: this.sandbox.stub()
        }
      },
      modules: []
    };
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  context('componentDidMount', function() {
    it('loads the user info when it has not already been loaded', function() {
      const dashboard = shallow(
        <Dashboard {...baseProps}>{() => ''}</Dashboard>,
        {
          disableLifecycleMethods: true
        }
      );
      dashboard.instance().componentDidMount();

      expect(baseProps.actions.user.loadUserInfo).to.be.calledOnce();
    });

    it('does not load the user info if it has already been loaded', function() {
      const dashboard = shallow(
        <Dashboard {...baseProps} hasInitiallyLoaded>
          {() => ''}
        </Dashboard>,
        {
          disableLifecycleMethods: true
        }
      );
      dashboard.instance().componentDidMount();

      expect(baseProps.actions.user.loadUserInfo).to.not.be.called();
    });

    it('loads the organizations when it has not already been loaded', function() {
      const dashboard = shallow(
        <Dashboard {...baseProps}>{() => ''}</Dashboard>,
        {
          disableLifecycleMethods: true
        }
      );
      dashboard.instance().componentDidMount();

      expect(
        baseProps.actions.organizations.loadOrganizations
      ).to.be.calledOnce();
    });

    it('does not load the organizations if it has already been loaded', function() {
      const dashboard = shallow(
        <Dashboard {...baseProps} hasInitiallyLoaded>
          {() => ''}
        </Dashboard>,
        {
          disableLifecycleMethods: true
        }
      );
      dashboard.instance().componentDidMount();

      expect(
        baseProps.actions.organizations.loadOrganizations
      ).to.not.be.called();
    });
  });
});
