@ClientCollection = new Meteor.Collection("clients",
  transform: (document) ->
    new Client(document)
)
 
class @Client extends Document
  # Other fields:
  #   body
  # add custom fields here
    
  @Meta
    collection: ClientCollection
    fields:
      # We can reference other document
      owner: @ReferenceField Meteor.users, ['profile.firstName']