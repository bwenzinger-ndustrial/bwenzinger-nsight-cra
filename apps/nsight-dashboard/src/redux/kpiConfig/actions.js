import actionTypes from './actionTypes';

const reduceLayout = (config) => {
  return config.rows.reduce((result, row) => {
    const rowConfig = row.columns.map((column) => {
      if (Array.isArray(column)) {
        return column.map((siblingConfig) => {
          return {
            ...siblingConfig.config,
            id: siblingConfig.id,
            slug: siblingConfig.slug
          };
        });
      } else {
        return {
          ...column.config,
          id: column.id,
          slug: column.slug
        };
      }
    });
    return [...result, ...rowConfig];
  }, []);
};

function loadKpiConfigs() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOAD_KPI_CONFIG_START
    });

    // TODO: This is faking a request that retrieves an org config, and all facilities,
    //  may need to break up if request is too slow.  Check after implementation and potentially
    //  move to facility-overview/portfolio-dashboard package
    let pageConfigs = {};
    const { kpiConfigBySlug } = window.nd;

    if (kpiConfigBySlug) {
      pageConfigs = Object.keys(kpiConfigBySlug).reduce((memo, pageName) => {
        return {
          ...memo,
          [pageName]: Object.keys(kpiConfigBySlug[pageName]).reduce(
            (memo, slug) => {
              return {
                ...memo,
                [slug]: reduceLayout(kpiConfigBySlug[pageName][slug])
              };
            },
            {}
          )
        };
      }, {});
    }

    return Promise.resolve(pageConfigs)
      .then((pageConfigs) => {
        dispatch({
          type: actionTypes.LOAD_KPI_CONFIG_SUCCESS,
          payload: {
            pageConfigs
          }
        });
      })
      .catch(() => {
        dispatch({
          type: actionTypes.LOAD_KPI_CONFIG_FAILURE
        });
      });
  };
}

export { loadKpiConfigs };
