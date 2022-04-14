import { getContxtSdk } from '@ndustrial/contxt-sdk-wrapper/';

export const contxtSdk = getContxtSdk(
  window.nd.env,
  window.nd.clientId,
  window.nd.contxtSdkStagingOverrides, // these can be locally changed for testing
  window.nd.contxtSdkProductionOverrides // these can be locally changed for testing
  // example module override for local testing:
  // {
  //   nionic: {
  //     clientIdEnv: 'staging', // specifies which environment to use the client ID from
  //     host: 'http://localhost:6000',
  //     module: EmptyService
  //   }
  // }
);
