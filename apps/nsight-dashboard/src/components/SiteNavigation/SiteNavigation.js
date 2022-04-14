import React from 'react';
import PropTypes from 'prop-types';

import types from '../../types';
import MenuItem from './MenuItem';
import ModuleLink from './ModuleLink';
import NavBar from './NavBar';
import NavBarItem from './NavBarItem';
import NavBarItemGroup from './NavBarItemGroup';

const propTypes = {
  actions: PropTypes.shape({
    changeRoute: PropTypes.func
  }),
  applicationGroupings: types.applicationGroupings,
  selectedFacilityId: PropTypes.number
};

function SiteNavigation({ applicationGroupings, actions, selectedFacilityId }) {
  return (
    <NavBar>
      <NavBarItemGroup>
        {applicationGroupings.map((grouping) => {
          const hasNoContent = !grouping.applicationModules.length;
          const hasSelectedFacility = !!selectedFacilityId;
          const hasTopLevelModule = grouping.applicationModules.length === 1;

          const shouldAlwaysRenderMenu = !!grouping.applicationModules.filter(
            function(module) {
              return !module.requiresFacility;
            }
          ).length;

          const topLevelModuleRequiresFacility =
            hasTopLevelModule &&
            grouping.applicationModules[0].requiresFacility;

          if (
            hasNoContent ||
            (!shouldAlwaysRenderMenu && !hasSelectedFacility)
          ) {
            return null;
          }

          if (
            hasTopLevelModule &&
            (!topLevelModuleRequiresFacility || hasSelectedFacility)
          ) {
            return (
              <ModuleLink
                {...grouping.applicationModules[0]}
                changeRoute={actions.changeRoute}
                isTopLevel
                key={grouping.applicationModules[0].id}
                selectedFacilityId={selectedFacilityId}
              />
            );
          }

          return (
            <NavBarItem
              key={grouping.id}
              label={grouping.label}
              iconUrl={grouping.iconUrl}
              grouping={grouping}
            >
              {grouping.applicationModules.map((module) => {
                if (module.requiresFacility && !selectedFacilityId) {
                  return null;
                }
                return (
                  <MenuItem
                    {...module}
                    changeRoute={actions.changeRoute}
                    key={module.id}
                  />
                );
              })}
            </NavBarItem>
          );
        })}
      </NavBarItemGroup>
    </NavBar>
  );
}

SiteNavigation.propTypes = propTypes;

export default SiteNavigation;
