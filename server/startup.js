Meteor.startup(function() {

  UserSession.set('server_var', 123, this.userId);  
});


