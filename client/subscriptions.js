Deps.autorun(function() {
  Subs_Games = Meteor.subscribe("myGames", Meteor.userId());
});