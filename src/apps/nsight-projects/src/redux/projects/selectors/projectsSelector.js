import moment from 'moment';
import { createSelector } from 'reselect';

import { getFacilities } from '@ndustrial/nsight-common/selectors';

const projectsSelector = createSelector(
  (state) => state.projects.values,
  getFacilities,
  (projects, facilities) => {
    if (projects) {
      return projects.map((project) => ({
        ...project,
        updated_at: moment(project.updated_at),
        implementationDate: project.implementationDate
          ? moment(project.implementationDate)
          : null,
        approvalDate: project.approvalDate
          ? moment(project.approvalDate)
          : null,
        trackingPeriodStart: project.trackingPeriodStart
          ? moment(project.trackingPeriodStart)
          : null,
        trackingPeriodEnd: project.trackingPeriodEnd
          ? moment(project.trackingPeriodEnd)
          : null,
        facilityName: facilities.find((x) => x.id === project.facility_id)?.name
      }));
    }

    return null;
  }
);

export { projectsSelector };
