Meteor.startup(function() {
  
  Accounts.ui.config({
    passwordSignupFields: 'EMAIL_ONLY',
    requestPermissions: {
      facebook: ['user_likes', 'publish_actions', 'email'],
      google: ['email']
    }
  });
  
  return AccountsEntry.config({
    homeRoute: '/sign-in',
    dashboardRoute: '/',
    //logo: 'images/logo.png',
    showSignupCode: false
  });
  
});