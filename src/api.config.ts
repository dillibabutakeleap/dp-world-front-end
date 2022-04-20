export const apiConfig = {
  auth: {
    login: '/login',
    register: '/web/register',
    logout: '/logout',
    resetPassword: '/reset-password',
    forgotPassword: '/reset-password-request',
  },
  trainer: {
    trainer: '/trainer',
    trainees: '/trainees',
  },
  webAdmin: {
    userTeam: '/web-admin/trainers',
    addTeamUser: '/web-admin/add-user',
    addTrainer: '/web-admin/add-trainer',
    transferLicenseConditions: '/web-admin/transfer-license/conditions',
    transferLicense: '/web-admin/transfer-license',
    userSubscriptions: '/user/subscriptions',
    getDashboardData: '/web-admin/dashboard',
    user: '/web-admin/user',
    resetTrainerPassword: '/web-admin/reset-trainer-password',
    progressData: '/progress-data',
  },
  user: {
    user: '/user',
    getUserCourseCompletionCertificate: '/completion-certificate',
  },
};
