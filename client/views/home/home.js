 Template.home.game = function() {
    return GameCollection.findOne({current: true});
  };
  
  Template.home.events({
    "click #newGame": function() {
      Meteor.call('newGame');
    },
    "click #finishGame": function() {
      var game = GameCollection.findOne({current: true});
      Meteor.call('finishGame', game._id);
    }
  });