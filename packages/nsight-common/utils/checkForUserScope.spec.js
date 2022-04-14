import { expect } from 'chai';
import faker from 'faker';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';

import checkForUserScope from './checkForUserScope';

describe('checkForUserScope', function() {
  let apiToken;

  beforeEach(function() {
    this.sandbox = sinon.createSandbox();

    const data = {
      id: 1337,
      permissions: {
        hasCorrectScope: ['scope1', 'correct_scope', 'scope2'],
        hasSomeScope: ['scope3', 'scope4']
      }
    };

    apiToken = jwt.sign(data, 'my secret token');
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  context('contxtService returns a token for the user', function() {
    let expectedAudienceName;

    beforeEach(function() {
      expectedAudienceName = faker.hacker.noun();

      this.sandbox
        .stub(contxtSdk.auth, 'getCurrentApiToken')
        .resolves(apiToken);
    });

    it('gets the current API token for the requested API', function() {
      checkForUserScope(expectedAudienceName, 'correct_scope').then(() => {
        expect(contxtSdk.auth.getCurrentApiToken).to.be.calledWith(
          expectedAudienceName
        );
      });
    });

    it('returns a fulfilled promise', function() {
      return expect(
        checkForUserScope(expectedAudienceName, 'correct_scope')
      ).to.be.fulfilled();
    });

    it('returns true when the user has the correct scope', function() {
      return expect(
        checkForUserScope(expectedAudienceName, 'correct_scope')
      ).to.eventually.be.true();
    });

    it('returns false when the user does not have the correct scope', function() {
      return expect(
        checkForUserScope(expectedAudienceName, 'incorrect_scope')
      ).to.eventually.be.false();
    });
  });

  context('contxtService does not return a token for the user', function() {
    let audienceName;

    beforeEach(function() {
      audienceName = faker.hacker.noun();

      this.sandbox.stub(contxtSdk.auth, 'getCurrentApiToken').resolves();
    });

    afterEach(function() {
      this.sandbox.restore();
    });

    it('returns a fulfilled promise', function() {
      return expect(checkForUserScope(audienceName, 'scope')).to.be.fulfilled();
    });

    it('returns false when contxtService does not return a token', function() {
      return expect(
        checkForUserScope(audienceName, 'scope')
      ).to.eventually.be.false();
    });
  });

  context('user does not pass a scope to the function', function() {
    let audienceName;

    beforeEach(function() {
      audienceName = faker.hacker.noun();

      this.sandbox
        .stub(contxtSdk.auth, 'getCurrentApiToken')
        .resolves(apiToken);
    });

    afterEach(function() {
      this.sandbox.restore();
    });

    it('returns a fulfilled promise', function() {
      return expect(checkForUserScope(audienceName)).to.be.fulfilled();
    });

    it('returns false when the user does not pass scope to the function', function() {
      return expect(checkForUserScope(audienceName)).to.eventually.be.false();
    });
  });

  context('contxt service errors when fetching api token', function() {
    let audienceName;
    let expectedError;

    beforeEach(function() {
      audienceName = faker.hacker.noun();
      expectedError = new Error(faker.hacker.phrase());

      this.sandbox
        .stub(contxtSdk.auth, 'getCurrentApiToken')
        .rejects(expectedError);
      this.sandbox.stub(console, 'error');
    });

    afterEach(function() {
      this.sandbox.restore();
    });

    it('logs the error to the console', function() {
      return checkForUserScope(audienceName, 'correct_scope').then(() => {
        // eslint-disable-next-line no-console
        expect(console.error).to.be.calledWith(
          'Unable to get user token: ',
          expectedError
        );
      });
    });

    it('returns a fulfilled promise', function() {
      return expect(
        checkForUserScope(audienceName, 'correct_scope')
      ).to.be.fulfilled();
    });

    it('returns false when contxtService getCurrentApiToken call fails', function() {
      return expect(
        checkForUserScope(audienceName, 'correct_scope')
      ).to.eventually.be.false();
    });
  });
});
