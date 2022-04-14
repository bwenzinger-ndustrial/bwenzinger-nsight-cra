import jwt from 'jsonwebtoken';
import { flatten, includes } from 'lodash';

import { contxtSdk } from './nSightContxtSdk';

// Can pass audience and scope to look up. Will decode token and build array of permissions
// Can also pass the third variable which is an array of scopes.
function checkForUserScope(audience, scope, userScopes) {
  if (!userScopes) {
    return contxtSdk.auth
      .getCurrentApiToken(audience)
      .then((token) => {
        if (token) {
          const userPermissions = [];
          const decodedToken = jwt.decode(token);

          Object.keys(decodedToken.permissions).forEach((key) => {
            userPermissions.push(decodedToken.permissions[key]);
          });

          const flatArray = flatten(userPermissions);

          return includes(flatArray, scope);
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.error('Unable to get user token: ', err); // eslint-disable-line no-console

        return false;
      });
  } else {
    return includes(userScopes, scope);
  }
}

export default checkForUserScope;
