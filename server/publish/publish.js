Meteor.publish('games', function() {
 
  if (!this.userId) {
      console.log('Games Un-Publish');
      //return [];
      this.ready();
  } else {
    console.log('Games Publish: U-'+this.userId);
    return ClientCollection.find({'player._id': this.userId});
  }

});