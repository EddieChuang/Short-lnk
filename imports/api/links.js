import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'
import shortid from 'shortid'

export const Links = new Mongo.Collection('links')

if (Meteor.isServer) {
  Meteor.publish('links', function() {
    return Links.find({ userId: this.userId })
  })
}

Meteor.methods({
  'links.insert'(url) {
    const userId = this.userId
    if (!userId) {
      throw new Meteor.Error('not-authorized')
    }
    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url })
    return Links.insert({
      _id: shortid.generate(),
      url,
      userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    })
  },
  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      _id: { type: String, min: 1 },
      visible: { type: Boolean }
    }).validate({ _id, visible })

    Links.update({ _id, userId: this.userId }, { $set: { visible } })
  },
  'links.trackVisit'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }
    new SimpleSchema({
      _id: { type: String, min: 1 }
    }).validate({ _id })

    return Links.update(
      { _id },
      {
        $set: {
          lastVisitedAt: new Date().getTime()
        },
        $inc: { visitedCount: 1 }
      }
    )
  }
})
