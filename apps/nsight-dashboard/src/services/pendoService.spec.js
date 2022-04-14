import { expect } from 'chai';
import sinon from 'sinon';

import { fixtures } from '@ndustrial/nsight-test-utils';

import { initializePendo } from './pendoService';

describe('nsight-dashboard/services/pendoService', function() {
  let windowPendo;
  let user;
  let pendo;

  beforeEach(function() {
    user = fixtures.build('userProfile');

    pendo = {
      initialize: sinon.stub()
    };

    windowPendo = window.pendo;
  });

  afterEach(function() {
    window.pendo = windowPendo;

    sinon.restore();
  });

  describe('initializePendo', function() {
    context('when the pendo object is on the window', function() {
      beforeEach(function() {
        window.pendo = pendo;
      });

      context('when user object exists', function() {
        it('calls initialize Pendo', function() {
          initializePendo(user);
          expect(pendo.initialize).to.be.calledOnce();
          expect(pendo.initialize).to.be.calledWith({
            visitor: {
              id: user.sub,
              full_name: user.name
            },
            account: {
              id: user.sub
            }
          });
        });
      });

      context('when no user exists', function() {
        it('it does not call initialize Pendo', function() {
          initializePendo({});
          expect(pendo.initialize).to.not.be.called();
        });
      });
    });

    context('when the pendo object does not exist on the window', function() {
      context('when user object exists', function() {
        it('it does not call initialize Pendo', function() {
          initializePendo(user);
          expect(pendo.initialize).to.be.not.be.called();
        });
      });

      context('when user object does not exist', function() {
        it('it does not call initialize Pendo', function() {
          initializePendo({});
          expect(pendo.initialize).to.be.not.be.called();
        });
      });
    });
  });
});
