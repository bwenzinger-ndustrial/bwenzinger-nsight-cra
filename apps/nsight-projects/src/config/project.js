import FacilityAndSystemSelect from '../components/wizard/facility-and-systems/FacilityAndSystemSelect';
import OverviewScreen from '../components/wizard/OverviewScreen';
import ProjectFileUpload from '../components/wizard/ProjectFileUpload';
import ProjectProjections from '../components/wizard/ProjectProjections';

/* eslint-enable */
/**
 * Define the project steps here
 */
export default {
  steps: [
    {
      label: 'Basic Info',
      StepComponent: OverviewScreen
    },
    {
      label: 'Files',
      StepComponent: ProjectFileUpload
    },
    {
      label: 'Facility',
      StepComponent: FacilityAndSystemSelect
    },
    {
      label: 'Projections',
      StepComponent: ProjectProjections
    }
  ]
};
