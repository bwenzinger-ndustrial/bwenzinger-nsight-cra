import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import faker from 'faker';
import sinon from 'sinon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';
import { fixtures, mountWithTheme } from '@ndustrial/nsight-test-utils';

import { LegacyAngularAdapter } from './LegacyAngularAdapter';

describe('nsight-common/containers/LegacyAngularAdapter', function() {
  let baseProps;

  beforeEach(function() {
    baseProps = {
      legacyPath: faker.lorem.word(),
      selectedFacility: fixtures.build('facility'),
      selectedOrganization: fixtures.build('organization')
    };
  });

  afterEach(function() {
    sinon.restore();
  });

  describe('shouldComponentUpdate', function() {
    let legacyAngularAdapter;

    beforeEach(function() {
      legacyAngularAdapter = shallow(<LegacyAngularAdapter {...baseProps} />, {
        disableLifecycleMethods: true
      });
    });

    context('when the selected facility ID updates', function() {
      let shouldUpdate;

      beforeEach(function() {
        shouldUpdate = legacyAngularAdapter.instance().shouldComponentUpdate({
          ...baseProps,
          selectedFacility: fixtures.build('facility')
        });
      });

      it('returns true', function() {
        expect(shouldUpdate).to.be.true();
      });
    });

    context('when there was not previously a selected facility', function() {
      let shouldUpdate;

      beforeEach(function() {
        legacyAngularAdapter.setProps({ selectedFacility: undefined });

        shouldUpdate = legacyAngularAdapter.instance().shouldComponentUpdate({
          ...baseProps,
          selectedFacility: fixtures.build('facility')
        });
      });

      it('returns true', function() {
        expect(shouldUpdate).to.be.true();
      });
    });

    context('when another prop updates', function() {
      let shouldUpdate;

      beforeEach(function() {
        shouldUpdate = legacyAngularAdapter.instance().shouldComponentUpdate({
          ...baseProps,
          [faker.lorem.word()]: faker.hacker.adjective()
        });
      });

      it('returns false', function() {
        expect(shouldUpdate).to.be.false();
      });
    });

    context('when there has never been a selected facility', function() {
      let shouldUpdate;

      beforeEach(function() {
        legacyAngularAdapter.setProps({ selectedFacility: undefined });

        shouldUpdate = legacyAngularAdapter.instance().shouldComponentUpdate({
          ...baseProps,
          selectedFacility: undefined
        });
      });

      it('returns false', function() {
        expect(shouldUpdate).to.be.false();
      });
    });

    context('when there is no longer a selected facility', function() {
      let shouldUpdate;

      beforeEach(function() {
        shouldUpdate = legacyAngularAdapter.instance().shouldComponentUpdate({
          ...baseProps,
          selectedFacility: undefined
        });
      });

      it('returns true', function() {
        expect(shouldUpdate).to.be.true();
      });
    });
  });

  describe('componentDidMount', function() {
    let legacyAngularAdapter;

    beforeEach(function() {
      sinon.stub(window, 'addEventListener');

      legacyAngularAdapter = shallow(<LegacyAngularAdapter {...baseProps} />, {
        disableLifecycleMethods: true
      });

      legacyAngularAdapter.instance().componentDidMount();
    });

    it('sets up the event listener for post messages', function() {
      expect(window.addEventListener).to.be.calledWith(
        'message',
        legacyAngularAdapter.instance().onMessageReceived
      );
    });
  });

  describe('componentWillUnmount', function() {
    let legacyAngularAdapter;

    beforeEach(function() {
      sinon.stub(window, 'removeEventListener');

      legacyAngularAdapter = shallow(<LegacyAngularAdapter {...baseProps} />, {
        disableLifecycleMethods: true
      });

      legacyAngularAdapter.instance().componentWillUnmount();
    });

    it('removes the event listener for post messages', function() {
      expect(window.removeEventListener).to.be.calledWith(
        'message',
        legacyAngularAdapter.instance().onMessageReceived
      );
    });
  });

  describe('onMessageReceived', function() {
    context('when receiving a request for a Contxt access token', function() {
      beforeEach(function() {
        sinon.stub(LegacyAngularAdapter.prototype, 'sendTokenToChild');

        const legacyAngularAdapter = shallow(
          <LegacyAngularAdapter {...baseProps} />,
          { disableLifecycleMethods: true }
        );

        legacyAngularAdapter.instance().onMessageReceived({
          origin: window.nd.legacyNSightBaseUrl,
          data: {
            contxt: {
              operation: 'GET_CONTXT_ACCESS_TOKEN'
            }
          }
        });
      });

      it('sends a token to the child iframe', function() {
        expect(
          LegacyAngularAdapter.prototype.sendTokenToChild
        ).to.be.calledOnce();
      });
    });

    context('when receiving any other request', function() {
      beforeEach(function() {
        sinon.stub(LegacyAngularAdapter.prototype, 'sendTokenToChild');

        const legacyAngularAdapter = shallow(
          <LegacyAngularAdapter {...baseProps} />,
          { disableLifecycleMethods: true }
        );

        legacyAngularAdapter.instance().onMessageReceived({
          origin: window.nd.legacyNSightBaseUrl,
          data: {
            contxt: {
              operation: faker.hacker.adjective()
            }
          }
        });
      });

      it('does not send a token to the child iframe', function() {
        expect(
          LegacyAngularAdapter.prototype.sendTokenToChild
        ).to.not.be.called();
      });
    });

    context('when the origin does not match the nSight base URL', function() {
      beforeEach(function() {
        sinon.stub(LegacyAngularAdapter.prototype, 'sendTokenToChild');

        const legacyAngularAdapter = shallow(
          <LegacyAngularAdapter {...baseProps} />,
          { disableLifecycleMethods: true }
        );

        legacyAngularAdapter.instance().onMessageReceived({
          origin: faker.internet.url(),
          data: {
            contxt: {
              operation: 'GET_CONTXT_ACCESS_TOKEN'
            }
          }
        });
      });

      it('does not send a token to the child iframe', function() {
        expect(
          LegacyAngularAdapter.prototype.sendTokenToChild
        ).to.not.be.called();
      });
    });

    context(
      'when the message does not include the contxt namespace',
      function() {
        beforeEach(function() {
          sinon.stub(LegacyAngularAdapter.prototype, 'sendTokenToChild');

          const legacyAngularAdapter = shallow(
            <LegacyAngularAdapter {...baseProps} />,
            { disableLifecycleMethods: true }
          );

          legacyAngularAdapter.instance().onMessageReceived({
            origin: window.nd.legacyNSightBaseUrl,
            data: {}
          });
        });

        it('does not send a token to the child iframe', function() {
          expect(
            LegacyAngularAdapter.prototype.sendTokenToChild
          ).to.not.be.called();
        });
      }
    );
  });

  describe('sendTokenToChild', function() {
    let expectedAccessToken;
    let expectedExpiresAt;
    let legacyAngularAdapter;
    let originalSessionInfo;

    beforeEach(function() {
      expectedAccessToken = faker.internet.password();
      expectedExpiresAt = faker.date.future().toISOString();
      originalSessionInfo = contxtSdk.auth._sessionInfo;

      contxtSdk.auth._sessionInfo = {
        accessToken: expectedAccessToken,
        expiresAt: expectedExpiresAt
      };

      legacyAngularAdapter = mountWithTheme(
        <LegacyAngularAdapter {...baseProps} />,
        { disableLifecycleMethods: true }
      );

      legacyAngularAdapter.instance().iframeRef.current = {
        contentWindow: {
          postMessage: sinon.stub()
        }
      };

      legacyAngularAdapter.instance().sendTokenToChild();
    });

    afterEach(function() {
      contxtSdk.auth._sessionInfo = originalSessionInfo;
    });

    it('sends the access token information as a message', function() {
      expect(
        legacyAngularAdapter.instance().iframeRef.current.contentWindow
          .postMessage
      ).to.be.calledWith({
        contxt: {
          operation: 'SET_CONTXT_ACCESS_TOKEN',
          payload: {
            accessToken: expectedAccessToken,
            expiresAt: expectedExpiresAt
          }
        }
      });
    });
  });

  describe('getUrl', function() {
    let url;

    beforeEach(function() {
      sinon.stub(window, 'addEventListener');

      const legacyAngularAdapter = shallow(
        <LegacyAngularAdapter {...baseProps} />,
        { disableLifecycleMethods: true }
      );

      url = legacyAngularAdapter.instance().getUrl();
    });

    it('returns the URL for the legacy nSight section', function() {
      expect(url).to.equal(
        `${window.nd.legacyNSightBaseUrl}/organizations/${baseProps.selectedOrganization.legacyOrganizationId}/portfolio/facilities/${baseProps.selectedFacility.id}/${baseProps.legacyPath}?embed=true`
      );
    });
  });
});
