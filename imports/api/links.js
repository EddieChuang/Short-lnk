import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const Links = new Mongo.Collection('links')

if (Meteor.isServer) {
  Meteor.publish('links', function() {
    return Links.find({ userId: this.userId })
  })
}

Meteor.methods({
  greetUder(name) {
    if (!name) {
      throw new Meteor.Error('invalid-arguments', 'Name is requried')
    }
    return `Hello ${name}`
  }
})
