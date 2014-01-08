// This collection is where the UserSession variables are ultimately stored
UserSessionCollection = new Meteor.Collection('userSessionCollection');

// Anonymous user error
noUserError = function () {
        console.log('You cannot use UserSession methods when there is no user logged in.');
}

// Missing userId error
noUserIdError = function () {
        console.log('You cannot use UserSession methods on the server without a userId.');
}

//=======================
// = UserSession METHODS
//=======================

UserSession = {
  set: function (key, value, userId) {
    // Set a new variable in the user session
    if (Meteor.isServer) {
      if (userId === undefined)
        noUserIdError();
    } else
      userId = Meteor.userId();
                  
    // If the user is logged in, update the variable in the collection

    var existing = UserSessionCollection.findOne({ key: key, userId: userId});
    var sv = { key: key, value: value, userId: userId };
    
    if (existing)
      UserSessionCollection.update({ _id: existing._id }, { $set: sv });
    else 
      UserSessionCollection.insert(sv);

  },
  
  get: function (key, userId) {
    // Get the value of a user session variable
    if (Meteor.isServer) {
      if (userId === undefined)
        noUserIdError();
    } else
      userId = Meteor.userId();

    var existing = UserSessionCollection.findOne({ key: key, userId: userId});

    if (existing) {
      return existing.value;
    }

  },

  delete: function (key, userId) {
    // Delete a user session variable, if it exists
    if (Meteor.isServer) {
      if (userId === undefined)
        noUserIdError();
    } else
      userId = Meteor.userId();

    var existing = UserSessionCollection.findOne({ key: key, userId: userId});

    if (existing) 
      UserSessionCollection.remove(existing._id);

  },
  
  equals: function (key, value, userId) {            
    // Test if a user session variable is equal to a value
    if (Meteor.isServer) {
      if (userId === undefined)
        noUserIdError();
    } else
      userId = Meteor.userId();

    var existing = UserSessionCollection.findOne({ key: key, userId: userId});
    
    if (existing) 
      return existing.value == value; //XXX Should this be ===

  },
  
  list: function (userId) {
    // Get all the user session variables as an object
    if (Meteor.isServer) {
      if (userId === undefined)
        noUserIdError();
    } else
      userId = Meteor.userId();

    var existing = UserSessionCollection.findOne({ userId: userId});

    if (existing) {
      var list = {};
      UserSessionCollection.find({ userId: userId }).forEach(function (sv) {
        list[sv.key] = sv.value;
      });
      return list;
    }
  }

};

if (Meteor.isClient) {
  // Subscribe to the user's session variables on the client
  Meteor.subscribe('userSessionCollection');
}

if (Meteor.isServer) {
 
  // Publish only the current user's session variables to the client
  Meteor.publish('userSessionCollection', function () {
          return UserSessionCollection.find({ userId: this.userId });
  });
  
  // Check that the userId specified owns the documents
  ownsDocument = function (userId, doc) {
          return doc && doc.userId === userId;
  }
  
  // Allow methods for UserSessionCollection (security)
  UserSessionCollection.allow({
          insert: function (userId, doc) {
                  return ownsDocument(userId, doc);
          },
          update: function (userId, doc) {
                  return ownsDocument(userId, doc);
          },
          remove: function (userId, doc) {
                  return ownsDocument(userId, doc);
          }
  }); 
  
}