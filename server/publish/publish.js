Meteor.publish('clients', function() {
 
  if (!this.userId) {
      console.log('Clients Un-Publish');
      //return [];
      this.ready();
  } else {
    console.log('Clients Publish: U-'+this.userId);
    return ClientCollection.find({'user': this.userId});
  }

});