import { contxtSdk } from '@ndustrial/nsight-common/utils';

import EmsModule from './EmsModule';

// These should be synced with our configs in config/env
export const CONTXT_COMMON_MODULES = {
  EMS: {
    name: 'commonEms',
    clientId: contxtSdk.config.audiences.ems.clientId,
    host: contxtSdk.config.audiences.ems.host,
    module: EmsModule
  }
};

const isValidCommonModule = (module) =>
  Object.values(CONTXT_COMMON_MODULES).some(
    (item) => item.name === module.name
  );

/**
 Since contxt prevents us from creating modules under the same namespace,
 and these common modules will never change, but will need to be loaded from
 different apps, we can just track what has already been loaded with a simple
 map.  No need to umount anything, and no need to catch the error that contxt
 throws.

 There was also an attempt to namespace the mount function by passing it a namespace
 parameter.  However, this requires that we track the namespaces as they are
 created so we know which one is active.  This is because, if we create a namespace,
 we need to use it to call the ems module in actions/kpiCardAction.js, for example.
**/
const mountedModules = {};

export const mountCommonContxtModules = (modules = []) => {
  modules.forEach((commonModule) => {
    if (isValidCommonModule(commonModule)) {
      const { clientId, host, module, name } = commonModule;

      if (mountedModules[name]) return;

      contxtSdk.mountDynamicModule(name, {
        clientId,
        host,
        module
      });

      mountedModules[name] = true;
    }
  });
};
