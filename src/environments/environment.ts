// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  cognito: {
    userPoolId: 'us-east-2_AuHYUpLm0',
    userPoolWebClientId: '22f0cqo0omaob2e484njohbe4i',
    authUsersGroup: 'cal-auth-users',
    identityPoolId: 'us-east-2:34061696-aee9-4199-8295-e9cdfe565472',
    region: 'us-east-2',
  },
  region: 'us-east-2',
  dynamoDb: {
    tableName: 'calendar-app-events',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
