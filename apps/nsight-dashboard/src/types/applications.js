import PropTypes from 'prop-types';

export const applicationModule = {
  applicationGroupingId: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  externalLink: PropTypes.string,
  iconUrl: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  slug: PropTypes.string,
  updatedAt: PropTypes.string.isRequired
};

export const applicationModules = PropTypes.arrayOf(
  PropTypes.shape(applicationModule)
);

export const applicationGrouping = {
  applicationModules,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export const applicationGroupings = PropTypes.arrayOf(
  PropTypes.shape(applicationGrouping)
);
