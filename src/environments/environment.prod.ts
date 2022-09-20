export const environment = {
  production: true,
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
