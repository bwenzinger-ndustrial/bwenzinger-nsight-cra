import React from 'react';
import { Route } from 'react-router-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import faker from 'faker';
import sinon from 'sinon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';

import { ProtectedRoute } from './ProtectedRoute';

describe('nsight-dashboard/components/Authentication/ProtectedRoute', function() {
  beforeEach(function() {
    this.sandbox = sinon.createSandbox();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  context('when the user is authenticated', function() {
    let expectedProps;
    let protectedRoute;

    beforeEach(function() {
      expectedProps = {
        Component: <div />,
        location: {
          pathname: faker.internet.url(),
          search: `${faker.hacker.adjective()}=${faker.lorem.word()}`
        },
        path: faker.internet.url()
      };

      this.sandbox.stub(contxtSdk.auth, 'isAuthenticated').returns(true);

      protectedRoute = shallow(<ProtectedRoute {...expectedProps} />);
    });

    it('renders a <Route />', function() {
      const route = protectedRoute.find(Route);

      expect(route).to.have.lengthOf(1);
      expect(route.props()).to.deep.equal(expectedProps);
    });
  });

  context('when the user is not authenticated', function() {
    let props;
    let protectedRoute;

    beforeEach(function() {
      props = {
        Component: <div />,
        location: {
          pathname: faker.internet.url(),
          search: `${faker.hacker.adjective()}=${faker.lorem.word()}`
        },
        path: faker.internet.url()
      };

      this.sandbox.stub(contxtSdk.auth, 'isAuthenticated').returns(false);
      this.sandbox.stub(contxtSdk.auth, 'logIn');

      protectedRoute = shallow(<ProtectedRoute {...props} />);
    });

    it('stores the redirect pathname in local storage', function() {
      expect(localStorage.getItem('redirect_pathname')).to.equal(
        `${props.location.pathname}${props.location.search}`
      );
    });

    it('starts the log in process', function() {
      expect(contxtSdk.auth.logIn).to.be.calledOnce();
    });

    it('renders nothing', function() {
      expect(protectedRoute.type()).to.be.null();
    });
  });
});
