Router.before(function () { Alerts.removeSeen(); });

Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: '404',
  loadingTemplate: 'loading',
  yieldTemplates: {
    header: {
      to: 'header'
    },
    footer: {
      to: 'footer'
    }
  }
});

Router.map(function() {
  
  this.route('home', {
    controller: 'LoginController',
    path: '/'
  });

  this.route('dashboard', {
    controller: 'LoginController',
    path: '/dashboard'
  });  
});