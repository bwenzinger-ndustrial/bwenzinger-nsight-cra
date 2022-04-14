import React from 'react';
import { Router } from 'react-router-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import faker from 'faker';
import createHistory from 'history/createBrowserHistory';
import sinon from 'sinon';

import { fixtures, mountWithTheme } from '@ndustrial/nsight-test-utils';

import { MODULE_PATHS_WITHOUT_FACILITY } from '../../constants';
import FacilitySelector from './FacilitySelector';

describe('nsight-dashboard/components/FacilitySelector', function() {
  let baseProps;
  let facility;
  let organization;

  beforeEach(function() {
    facility = fixtures.build('facility');
    organization = fixtures.build('organization');

    baseProps = {
      actions: {
        facilities: {
          setSelectedFacilitySlug: sinon.stub()
        },
        organizations: {
          setSelectedOrganizationSlug: sinon.stub()
        },
        changeRoute: sinon.stub()
      },
      history: {
        location: {
          pathname: ''
        }
      },
      organizations: []
    };
  });

  afterEach(function() {
    sinon.restore();
  });

  describe('handleGroupingSelection', function() {
    let facilitySelector;

    beforeEach(function() {
      facilitySelector = shallow(<FacilitySelector {...baseProps} />, {
        disableLifecycleMethods: true
      });
    });

    it('sets an un-open selected grouping to be open', function() {
      const groupingId = fixtures.build('facilityGrouping').id;

      facilitySelector.instance().handleGroupingSelection({ id: groupingId });

      expect(facilitySelector.state('openGroupingIds')).to.include(groupingId);
    });

    it('sets an open selected grouping to be closed', function() {
      const groupingId = fixtures.build('facilityGrouping').id;

      facilitySelector.setState({
        openGroupingIds: [groupingId]
      });
      facilitySelector.instance().handleGroupingSelection({ id: groupingId });

      expect(facilitySelector.state('openGroupingIds')).to.not.include(
        groupingId
      );
    });

    it('leaves other groupings untouched', function() {
      const expectedOpenGroupings = [
        fixtures.build('facilityGrouping').id,
        fixtures.build('facilityGrouping').id,
        fixtures.build('facilityGrouping').id
      ];

      facilitySelector.setState({
        openGroupingIds: expectedOpenGroupings
      });
      facilitySelector
        .instance()
        .handleGroupingSelection({ id: fixtures.build('facilityGrouping').id });

      expect(facilitySelector.state('openGroupingIds')).to.include(
        ...expectedOpenGroupings
      );
    });
  });

  describe('handleMenuToggle', function() {
    let facilitySelector;

    beforeEach(function() {
      facilitySelector = shallow(<FacilitySelector {...baseProps} />, {
        disableLifecycleMethods: true
      });
      facilitySelector.setState({
        openGroupingIds: [
          fixtures.build('facilityGrouping').id,
          fixtures.build('facilityGrouping').id,
          fixtures.build('facilityGrouping').id
        ]
      });

      facilitySelector.instance().handleMenuToggle();
    });

    it('resets the menu grouping accordion state', function() {
      expect(facilitySelector.state('openGroupingIds')).to.deep.equal([]);
    });
  });

  describe('handleSelection', function() {
    let facilitySelector;

    beforeEach(function() {
      sinon.stub(FacilitySelector.prototype, 'handleGroupingSelection');

      facilitySelector = mountWithTheme(<FacilitySelector {...baseProps} />, {
        disableLifecycleMethods: true
      });
    });

    it('invokes the grouping selection method when the selection is a grouping', function() {
      const expectedValue = {
        id: fixtures.build('facilityGrouping').id,
        type: 'grouping'
      };

      facilitySelector.instance().handleSelection(expectedValue);

      expect(
        FacilitySelector.prototype.handleGroupingSelection
      ).to.be.calledWith(expectedValue);
    });

    context('when the selection is an organization', function() {
      let closeMenuSpy;
      let expectedValue;

      beforeEach(function() {
        closeMenuSpy = sinon.stub(FacilitySelector.prototype, 'closeMenu');

        expectedValue = {
          slug: organization.slug,
          type: 'organization'
        };
      });

      it('closes the menu when the path is to a module that does not need a facility', function() {
        const newProps = {
          ...baseProps,
          history: {
            location: {
              pathname: faker.random.arrayElement(MODULE_PATHS_WITHOUT_FACILITY)
            }
          }
        };

        facilitySelector = mountWithTheme(<FacilitySelector {...newProps} />, {
          disableLifecycleMethods: true
        });

        facilitySelector.instance().handleSelection(expectedValue);

        expect(closeMenuSpy).to.be.calledOnce();
      });

      it('does not close the menu when the path does not equal is not a module that does not need a facility', function() {
        facilitySelector = mountWithTheme(<FacilitySelector {...baseProps} />, {
          disableLifecycleMethods: true
        });
        facilitySelector.instance().handleSelection(expectedValue);

        expect(closeMenuSpy).to.be.calledOnce();
      });
    });

    it('invokes the organization selection method when the selection is an organization', function() {
      const expectedValue = {
        slug: organization.slug,
        type: 'organization'
      };

      facilitySelector.instance().handleSelection(expectedValue);

      expect(
        FacilitySelector.prototype.handleGroupingSelection
      ).to.not.be.called();
    });
  });

  context('render', function() {
    it('renders a loading indicator while facilities are loading', function() {
      const wrapper = mountWithTheme(
        <FacilitySelector {...baseProps} isLoadingFacilities />
      );

      // Loader is wrapped with another Loader component
      expect(wrapper.find('Loader').length).to.be.greaterThan(1);
    });

    it('renders a loading indicator while organizations are loading', function() {
      const wrapper = mountWithTheme(
        <FacilitySelector {...baseProps} isLoadingOrganizations />
      );

      // Loader is wrapped with another Loader component
      expect(wrapper.find('Loader').length).to.be.greaterThan(1);
    });

    it('uses a chevron down when the menu is closed', function() {
      const wrapper = mountWithTheme(<FacilitySelector {...baseProps} />);

      expect(wrapper.find('[role="menu"]')).to.have.lengthOf(0);
      expect(wrapper.find('SvgChevronDown')).to.have.lengthOf(1);
      expect(wrapper.find('SvgChevronUp')).to.have.lengthOf(0);
    });

    it('uses a chevron up when the menu is opened', function() {
      const wrapper = mountWithTheme(<FacilitySelector {...baseProps} />);

      wrapper.find('div#facilityButton').simulate('click');

      expect(wrapper.find('[role="menu"]')).to.have.lengthOf(1);
      expect(wrapper.find('SvgChevronDown')).to.have.lengthOf(0);
      expect(wrapper.find('SvgChevronUp')).to.have.lengthOf(1);
    });

    context('with a selected facility', function() {
      it('navigates to the facility dashboard when clicking the facility button', function() {
        const wrapper = mountWithTheme(
          <FacilitySelector
            {...baseProps}
            selectedFacility={facility}
            selectedOrganization={organization}
          />
        );

        wrapper.find('div#facilityButton').simulate('click');

        expect(baseProps.actions.changeRoute).to.be.calledWith({
          pathname: '/facility-dashboard',
          search: `organization=${organization.slug}&facility=${facility.slug}`
        });
      });
    });

    context('without a selected facility', function() {
      it('toggles the facility menu when clicking the facility button', function() {
        const wrapper = mountWithTheme(
          <Router history={createHistory()}>
            <FacilitySelector
              {...baseProps}
              selectedOrganization={organization}
              facilities={[facility]}
              organizations={[organization]}
            />
          </Router>
        );

        expect(wrapper.find('[role="menu"]')).to.have.lengthOf(0);

        wrapper.find('div#facilityButton').simulate('click');

        expect(wrapper.find('[role="menu"]')).to.have.lengthOf(1);
        expect(wrapper.find('Facilities')).to.have.lengthOf(1);

        wrapper.find('div#facilityButton').simulate('click');

        expect(wrapper.find('[role="menu"]')).to.have.lengthOf(0);
      });

      it('has the appropriate placeholder', function() {
        const wrapper = mountWithTheme(
          <FacilitySelector
            {...baseProps}
            selectedOrganization={organization}
            facilities={[facility]}
            organizations={[organization]}
          />
        );

        expect(wrapper.text()).to.contain('Click here to select a facility');
      });
    });

    context('without a selected organization', function() {
      it('toggles the organization menu when clicking the facility button', function() {
        // The fake router is needed because of the links created in the menu
        const wrapper = mountWithTheme(
          <Router history={createHistory()}>
            <FacilitySelector
              {...baseProps}
              facilities={[facility]}
              organizations={[organization, fixtures.build('organization')]}
            />
          </Router>
        );

        expect(wrapper.find('[role="menu"]')).to.have.lengthOf(0);

        wrapper.find('div#facilityButton').simulate('click');

        expect(wrapper.find('[role="menu"]')).to.have.lengthOf(1);
        expect(wrapper.find('Organizations')).to.have.lengthOf(1);

        wrapper.find('div#facilityButton').simulate('click');

        expect(wrapper.find('[role="menu"]')).to.have.lengthOf(0);
      });

      it('has the appropriate placeholder', function() {
        // The fake router is needed because of the links created in the menu
        const wrapper = mountWithTheme(
          <Router history={createHistory()}>
            <FacilitySelector
              {...baseProps}
              facilities={[facility]}
              organizations={[organization, fixtures.build('organization')]}
            />
          </Router>
        );

        expect(wrapper.text()).to.contain(
          'Click here to select an organization'
        );
      });
    });
  });
});
