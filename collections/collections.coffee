@GameCollection = new Meteor.Collection("games",
  transform: (document) ->
    new Game(document)
)
 
class @Game extends Document
  # Other fields:
  #   body
  # add custom fields here
    
  @Meta
    collection: GameCollection
