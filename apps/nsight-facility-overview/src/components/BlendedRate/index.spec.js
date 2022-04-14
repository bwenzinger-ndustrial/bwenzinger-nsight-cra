import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { expect } from 'chai';
import sinon from 'sinon';

import { fixtures } from '@ndustrial/nsight-test-utils';
import mountWithTheme from '@ndustrial/nsight-test-utils/mountWithTheme';

import BlendedRate from './index';

describe('nsight-facility-overview/components/BlendedRate', function() {
  let baseProps;
  let blendedRateComponent;

  beforeEach(function() {
    baseProps = {
      blendedRate: {
        isLoading: false
      },
      blendedRateAverage: {
        curr: 0,
        prev: 0
      },
      selectedFacility: fixtures.build('facility'),
      getBlendedRateData: sinon.stub()
    };
  });

  afterEach(function() {
    sinon.restore();
  });

  context('on mount', function() {
    beforeEach(function() {
      blendedRateComponent = mountWithTheme(
        <MemoryRouter>
          <BlendedRate {...baseProps} />
        </MemoryRouter>
      );
    });

    afterEach(function() {
      blendedRateComponent.unmount();
    });

    it('calls get blended rate data with facility id', function() {
      expect(baseProps.getBlendedRateData).to.be.calledOnce();
      expect(baseProps.getBlendedRateData).to.be.calledWith(
        baseProps.selectedFacility.id
      );
    });
  });
});
