LoginController = RouteController.extend({
      
      before: function() {

        NProgress.start();

        // Check if user is authenticated, if they are not then redirect to the sign-in form.
        
        if (_.isNull(Meteor.user()) && Router.current().route.name !== 'entrySignIn') {
          console.log("LoginController: Redirect to login!");
          NProgress.done();
          this.stop();
          Router.go('entrySignIn');
        }
        
      },
  
      after: function() {
          //console.log("LoginController After");
          NProgress.done();

      }
});