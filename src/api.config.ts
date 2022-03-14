export const apiConfig = {
  auth: {
    login: '/login',
    register: '/web/register',
    logout: '/logout',
    resetPassword: '/reset-password',
    forgotPassword: '/reset-password-request',
  },
  webAdmin: {
    userTeam: '/web-admin/trainers',
    addTeamUser: '/web-admin/add-user',
    transferLicenseConditions: '/web-admin/transfer-license/conditions',
    transferLicense: '/web-admin/transfer-license',
    userSubscriptions: '/user/subscriptions',
    getDashboardData: '/web-admin/dashboard',
    user: '/web-admin/user',
    progressData: '/progress-data',
  },
};
