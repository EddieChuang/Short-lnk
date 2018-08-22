import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Random } from 'meteor/random'
import expect from 'expect'
import { Links } from './links'
import { resetDatabase } from 'meteor/xolvio:cleaner'

if (Meteor.isServer) {
  describe('links', function() {
    const userId = Random.id()

    /********** insert describe **********/
    describe('insert', function() {
      const insert = Meteor.server.method_handlers['links.insert']
      beforeEach(() => resetDatabase())
      it('should insert valid link', function() {
        const url = 'https://www.meteor.com/tutorials/react/testing'
        const _id = insert.apply({ userId }, [url])
        expect(Links.findOne({ _id, userId })).toExist()
      })
      it('should not insert invalid link', function() {
        const url = 'meteor.com/tutorials/react/testing'
        const _id = insert.apply({ userId }, [url])
        expect(Links.findOne({ _id })).toNotExist()
      })
      it('should not insert link if not authenticated', function() {
        expect(() => {
          insert()
        }).toThrow()
      })
      afterEach(() => {
        Links.remove({})
      })
    })
    /********** end of 'insert' describe **********/

    /********** setVisibility describe **********/
    describe('setVisibility', function() {
      const setVisibility = Meteor.server.method_handlers['links.setVisibility']
      let _id
      beforeEach(() => {
        resetDatabase()

        const url = 'https://www.meteor.com'
        _id = Links.insert({ userId, url })
      })
      it('should set visibility to true', function() {
        const visible = true
        setVisibility.apply({ userId }, [_id, visible])
        expect(Links.findOne({ _id }).fetch()[0].visible).toBe(true)
      })
      it('should set visibility to false', function() {
        const visible = false
        setVisibility.apply({ userId }, [_id, visible])
        expect(Links.findOne({ _id }).fetch()[0].visible).toBe(false)
      })
    })
    /********** end of 'setVisibility' describe **********/

    /********** trackVisit describe **********/
    describe('trackVisit', function() {
      const trackVisit = Meteor.server.method_handlers['links.trackVisit']
      let _id
      beforeEach(() => {
        resetDatabase()

        const url = 'http://www.deeplearningbook.org/'
        _id = Links.insert({ userId, url })
      })
      it('should increment visitedCount by 1', function() {
        const old = Links.findOne({ _id }).fetch()[0].visitedCount
        trackVisit.apply({ userId }, [_id])
        expect(Links.findOne({ _id }).fetch()[0].visitedCount).toBe(old + 1)
      })
    })
    /********** end of trackVisit describe **********/

    /********** publish links describe **********/
    describe('publish.links', function() {
      const publishLinks = Meteor.server.public_handlers['links']
      let _id
      beforeEach(() => {
        resetDatabase()

        const url = 'http://www.deeplearningbook.org/'
        _id = Links.insert({ userId, url })
      })
      it('should return user links', function() {
        const links = publishLinks.apply({ userId }).fetch()

        expect(links.length).toBe(1)
        expect(links[0]).toEqual(Links.findOne({ _id }))
      })
      it('should not return user links', function() {
        const links = publishLinks.apply({ userId: 'nouser' }).fetch()

        expect(links.length).toBe(0)
      })
    })
    /********** end of publish links describe **********/
  })
  /********** end of 'link' describe **********/
}
