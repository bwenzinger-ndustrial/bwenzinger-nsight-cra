const { env } = process;

const stagingArray = env.CONTXT_SDK_STAGING_OVERRIDES
  ? env.CONTXT_SDK_STAGING_OVERRIDES.split(',')
  : undefined;
const prodArray = env.CONTXT_SDK_PRODUCTION_OVERRIDES
  ? env.CONTXT_SDK_PRODUCTION_OVERRIDES.split(',')
  : undefined;

module.exports = (NODE_ENV) => ({
  env: env.ENV || 'development',
  contxtSdkStagingOverrides: stagingArray,
  contxtSdkProductionOverrides: prodArray,
  clientId:
    NODE_ENV === 'test'
      ? ''
      : env.CLIENT_ID || 's2Lxf5JQyUSveAPXaceg7Xck6naH7CjA',
  disableFacilityFilter: env.DISABLE_FACILITY_FILTER === 'true',
  legacyNSightBaseUrl: env.LEGACY_NSIGHT_BASE_URL || 'http://localhost:1337',
  analytics: {
    ga: env.ANALYTICS_GA_ID || '',
    hotjar: env.ANALYTICS_HOTJAR_ID || '',
    pendo: env.ANALYTICS_PENDO_ID || ''
  },
  // TODO:
  // Replace these client ID's with ones meant for your application.
  // These are shown in contxt.
  application: {
    clientId:
      NODE_ENV === 'test'
        ? ''
        : env.CLIENT_ID || 's2Lxf5JQyUSveAPXaceg7Xck6naH7CjA',
    id: env.ENV === 'test' ? '' : env.CONTXT_APPLICATION_ID || 57
  },
  dd: {
    service: 'nsight',
    log: {
      clientToken: 'pub69ed034ed34b059dba46f7d8731fa661'
    },
    rum: {
      applicationId: '846d1b2d-ff89-47b4-9210-1f3aa8c60ad0',
      clientToken: 'pube6b04e0e44ce98aee218beded94a4ff9'
    }
  },
  agGrid: {
    licenseKey:
      env.AG_GRID_LICENSE ||
      'CompanyName=ndustrial.io,LicensedApplication=nsight,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=10,LicensedProductionInstancesCount=1,AssetReference=AG-016416,ExpiryDate=11_June_2022_[v2]_MTY1NDkwMjAwMDAwMA==be695942c83f6575a6cbe98ee39606ac'
  }
});
