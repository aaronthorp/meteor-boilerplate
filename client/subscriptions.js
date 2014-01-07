Deps.autorun(function() {

  Subs_Clients = Meteor.subscribe("clients", Meteor.userId());

});