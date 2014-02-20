if (Meteor.isServer) {
  
  Meteor.methods({
    newGame: function() {
      allocateGame(this.userId);
    },
    finishGame: function(_id) {
      GameCollection.update({_id: _id}, {$set: {active: false, finished: true}});
    }
  })
  
  Meteor._onLogin  = function (userId) { 
    allocateGame(userId);
    console.log(userId + "just logged in.") 
  }
  
  Meteor._onLogout = function (userId) { 
    leaveGames(userId);
    console.log(userId + "just logged out.") 
  }
  
  allocateGame = function(userId) {
    var findGame = GameCollection.findOne({players: {$size: 1}});
    
    if (!findGame) {
      console.log("creating a new game, none available");
      GameCollection.update({players: userId}, {$set: {current: false}}, {multi: true});
      GameCollection.insert({players: [userId], active: false, finished: false, current: true});
    } else {
      console.log("connecting with an existing waiting player");
      GameCollection.update({_id: findGame._id}, {$set: {active: true}, $push: {players: userId}});
    }
  };
  
  leaveGames = function(userId) {
    console.log("leaving all unfinished games");
    
    GameCollection.remove({$and: [{players: userId, players: {$size: 1}}]});
    
    var games = GameCollection.find({$and: [{players: userId, active: true}]});
  
    games.forEach(function(game) {
      GameCollection.update({_id: game._id}, {$set: {active: false, finished: true}});          
    })
  };
  
  Meteor.publish('myGames', function() {
   
    if (!this.userId) {
        console.log('MyGames Un-Publish');
        //return [];
        this.ready();
    } else {
      console.log('MyGames Publish: U-'+this.userId);
      return GameCollection.find({players: this.userId});
    }
  
  });
  
}