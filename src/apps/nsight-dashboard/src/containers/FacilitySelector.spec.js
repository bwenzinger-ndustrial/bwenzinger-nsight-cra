import React from 'react';
import { expect } from 'chai';
import faker from 'faker';
import qs from 'qs';
import sinon from 'sinon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';
import { fixtures, mountWithTheme } from '@ndustrial/nsight-test-utils';

import { FacilitySelector } from './FacilitySelector';

describe('nsight-dashboard/containers/FacilitySelector', function() {
  let baseProps;
  let facilitySelector;
  let mockOrganization;

  const queryParamMocks = {
    facility: 'mock_facility',
    organization: 'mock_organization'
  };

  beforeEach(function() {
    mockOrganization = fixtures.build('organization');

    baseProps = {
      actions: {
        applications: {
          loadGroupings: sinon.stub(),
          resetDefaultApplicationRoute: sinon.stub(),
          resetGroupings: sinon.stub(),
          setDefaultApplicationRoute: sinon.stub()
        },
        changeRoute: sinon.stub(),
        facilities: {
          loadFacilities: sinon.stub(),
          resetFacilities: sinon.stub(),
          setSelectedFacilitySlug: sinon.stub()
        },
        organizations: {
          setSelectedOrganizationSlug: sinon.stub()
        }
      },
      facilities: [],
      applicationGroupings: [],
      helpers: {
        getDefaultApplicationRoute: sinon.stub()
      },
      history: {
        location: {
          pathname: ''
        },
        push: sinon.stub(),
        replace: sinon.stub()
      },
      location: {
        search: qs.stringify(queryParamMocks)
      },
      organizations: [],
      selectedOrganization: null
    };

    sinon.stub(contxtSdk.coordinator, 'setOrganizationId');
  });

  afterEach(function() {
    sinon.restore();
  });

  context('on mount', function() {
    context(
      'when there is an organization or facility slug in the URL',
      function() {
        beforeEach(function() {
          mountWithTheme(<FacilitySelector {...baseProps} />);
        });

        it('should call setSelectedOrganizationSlug', function() {
          expect(
            baseProps.actions.organizations.setSelectedOrganizationSlug
          ).to.have.been.calledOnceWith(queryParamMocks.organization);
        });

        it('should call setSelectedFacilitySlug', function() {
          expect(
            baseProps.actions.facilities.setSelectedFacilitySlug
          ).to.have.been.calledOnceWith(queryParamMocks.facility);
        });
      }
    );

    context(
      'when there is a selected organization, but there is no slug in the URL',
      function() {
        let expectedOrganization;
        let previousSearch;
        let props;

        beforeEach(function() {
          expectedOrganization = fixtures.build('organization', {
            slug: 'test-organization'
          });
          previousSearch = 'date=2020-09-21';
          props = {
            ...baseProps,
            location: {
              search: previousSearch
            },
            organizations: [expectedOrganization],
            selectedOrganization: expectedOrganization
          };

          mountWithTheme(<FacilitySelector {...props} />);
        });

        it('sets the organization slug in the URL and keeps existing search string information', function() {
          expect(props.history.replace).to.be.calledOnceWith({
            search: `${previousSearch}&organization=${expectedOrganization.slug}`
          });
        });
      }
    );
  });

  context('on location change', function() {
    context('setting the selectedOrganizationSlug', function() {
      context(
        'when the organization param changes to a truthy value',
        function() {
          beforeEach(function() {
            facilitySelector = mountWithTheme(
              <FacilitySelector {...baseProps} />
            );

            sinon.reset();

            facilitySelector.setProps({
              location: {
                search: qs.stringify({
                  ...queryParamMocks,
                  organization: 'new_mock_organization'
                })
              }
            });
          });

          it('calls setSelectedOrganizationSlug', function() {
            expect(
              baseProps.actions.organizations.setSelectedOrganizationSlug
            ).to.have.been.calledOnceWith('new_mock_organization');
          });

          it('does not set the setOrganizationId to null', function() {
            expect(
              contxtSdk.coordinator.setOrganizationId
            ).to.have.not.been.called();
          });

          it('does not attempt to re-set the organization param with the value from the store', function() {
            expect(baseProps.history.replace).to.not.be.called();
          });

          it('does not reset the default application route', function() {
            expect(
              baseProps.actions.applications.resetDefaultApplicationRoute
            ).to.have.not.been.called();
          });

          it('does not reset the application groupings', function() {
            expect(
              baseProps.actions.applications.resetGroupings
            ).to.have.not.been.called();
          });

          it('does not resets the facilities', function() {
            expect(
              baseProps.actions.facilities.resetFacilities
            ).to.have.not.been.called();
          });
        }
      );

      context(
        'when the organization param changes to a falsey value',
        function() {
          beforeEach(function() {
            facilitySelector = mountWithTheme(
              <FacilitySelector
                {...baseProps}
                selectedOrganization={fixtures.build('organization', {
                  slug: queryParamMocks.organization
                })}
              />
            );

            sinon.reset();

            facilitySelector.setProps({
              location: {
                search: qs.stringify({
                  ...queryParamMocks,
                  organization: undefined
                })
              }
            });
          });

          it('calls setSelectedOrganizationSlug', function() {
            expect(
              baseProps.actions.organizations.setSelectedOrganizationSlug
            ).to.have.been.calledOnceWith(undefined);
          });

          it('sets the setOrganizationId to null', function() {
            expect(
              contxtSdk.coordinator.setOrganizationId
            ).to.have.been.calledOnceWith(null);
          });

          it('does not attempt to re-set the organization param with the value from the store', function() {
            expect(baseProps.history.replace).to.not.be.called();
          });

          it('resets the default application route', function() {
            expect(
              baseProps.actions.applications.resetDefaultApplicationRoute
            ).to.have.been.calledOnce();
          });

          it('resets the application groupings', function() {
            expect(
              baseProps.actions.applications.resetGroupings
            ).to.have.been.calledOnce();
          });

          it('resets the facilities', function() {
            expect(
              baseProps.actions.facilities.resetFacilities
            ).to.have.been.calledOnce();
          });
        }
      );

      context('when the organization param does not change', function() {
        beforeEach(function() {
          sinon.reset();

          facilitySelector.setProps({
            location: {
              search: qs.stringify(queryParamMocks)
            }
          });
        });

        it('does not call setSelectedOrganizationSlug when organization param does not change', function() {
          expect(
            baseProps.actions.organizations.setSelectedOrganizationSlug
          ).to.have.not.been.called();
        });

        it('does not set the setOrganizationId to null', function() {
          expect(
            contxtSdk.coordinator.setOrganizationId
          ).to.have.not.been.called();
        });

        it('does not attempt to re-set the organization param with the value from the store', function() {
          expect(baseProps.history.replace).to.not.be.called();
        });

        it('does not reset the default application route', function() {
          expect(
            baseProps.actions.applications.resetDefaultApplicationRoute
          ).to.have.not.been.called();
        });

        it('does not reset the application groupings', function() {
          expect(
            baseProps.actions.applications.resetGroupings
          ).to.have.not.been.called();
        });

        it('resets the facilities', function() {
          expect(
            baseProps.actions.facilities.resetFacilities
          ).to.have.not.been.called();
        });
      });
    });

    context('setting the selectedFacilitySlug', function() {
      context('when the facility param changes', function() {
        beforeEach(function() {
          facilitySelector = mountWithTheme(
            <FacilitySelector {...baseProps} />
          );

          sinon.reset();

          facilitySelector.setProps({
            location: {
              search: qs.stringify({
                ...queryParamMocks,
                facility: 'new_mock_facility'
              })
            }
          });
        });

        it('calls setSelectedFacilitySlug', function() {
          expect(
            baseProps.actions.facilities.setSelectedFacilitySlug
          ).to.have.been.calledOnceWith('new_mock_facility');
        });
      });

      context('when the facility param does not change', function() {
        beforeEach(function() {
          sinon.reset();

          facilitySelector.setProps({
            location: { search: qs.stringify(queryParamMocks) }
          });
        });

        it('does not call setSelectedFacilitySlug', function() {
          expect(
            baseProps.actions.facilities.setSelectedFacilitySlug
          ).to.have.not.been.called();
        });
      });
    });
  });

  context('on selectedOrganization change', function() {
    beforeEach(function() {
      facilitySelector = mountWithTheme(<FacilitySelector {...baseProps} />);
    });

    context('when there is a selected organization', function() {
      beforeEach(function() {
        sinon.reset();

        facilitySelector.setProps({ selectedOrganization: mockOrganization });
      });

      it('sets the organization ID in contxt-sdk', function() {
        expect(
          contxtSdk.coordinator.setOrganizationId
        ).to.have.been.calledOnceWith(mockOrganization.id);
      });

      it('does not attempt to re-set the organization param with the value from the store', function() {
        expect(baseProps.history.replace).to.not.be.called();
      });

      it('calls loadGroupings with the application ID', function() {
        expect(
          baseProps.actions.applications.loadGroupings
        ).to.have.been.calledOnceWith(window.nd.application.id);
      });

      it('calls loadFacilities with correct args when the selectedOrganization changes', function() {
        expect(
          baseProps.actions.facilities.loadFacilities
        ).to.have.been.calledOnceWith(mockOrganization.id);
      });
    });

    context('when there is no selected organization', function() {
      beforeEach(function() {
        facilitySelector.setProps({ selectedOrganization: mockOrganization });

        sinon.reset();

        facilitySelector.setProps({ selectedOrganization: null });
      });

      it('does not set the organization ID in contxt-sdk', function() {
        expect(
          contxtSdk.coordinator.setOrganizationId
        ).to.have.not.been.called();
      });

      it('does not call loadGroupings with the application ID', function() {
        expect(
          baseProps.actions.applications.loadGroupings
        ).to.have.not.been.called();
      });

      it('does not call loadFacilities with correct args when the selectedOrganization changes', function() {
        expect(
          baseProps.actions.facilities.loadFacilities
        ).to.have.not.been.called();
      });
    });
  });

  context('on application grouping change', function() {
    beforeEach(function() {
      facilitySelector = mountWithTheme(<FacilitySelector {...baseProps} />);
    });

    context('when there are application groupings', function() {
      let expectedApplicationGroupings;
      let expectedApplicationRoute;
      let expectedOrganization;
      let props;

      beforeEach(function() {
        expectedApplicationGroupings = fixtures.buildList(
          'applicationGrouping',
          faker.random.number({ min: 1, max: 10 })
        );
        expectedApplicationRoute = fixtures.build('applicationModule').slug;
        expectedOrganization = fixtures.build('organization');

        props = {
          applicationGroupings: expectedApplicationGroupings,
          helpers: {
            ...baseProps,
            getDefaultApplicationRoute: sinon
              .stub()
              .returns(expectedApplicationRoute)
          },
          selectedOrganization: expectedOrganization
        };

        facilitySelector.setProps(props);
      });

      it('gets the default application route', function() {
        expect(props.helpers.getDefaultApplicationRoute).to.be.calledWith(
          expectedApplicationGroupings,
          expectedOrganization.slug
        );
      });

      it('sets the default application route', function() {
        expect(
          baseProps.actions.applications.setDefaultApplicationRoute
        ).to.be.calledWith(expectedApplicationRoute);
      });
    });

    context('when there are no application groupings', function() {
      it('does not get the default application route', function() {
        expect(baseProps.helpers.getDefaultApplicationRoute).to.not.be.called();
      });

      it('does not set the default application route', function() {
        expect(
          baseProps.actions.applications.setDefaultApplicationRoute
        ).to.not.be.called();
      });
    });
  });
});
