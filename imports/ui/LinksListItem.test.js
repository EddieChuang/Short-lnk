import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'
import { validUrls } from '../fixtures/fixtures'
import { Links } from '../api/links'

if (Meteor.isClient) {
  describe('LinksListItem', function() {
    let link
    beforeEach(() => {
      Meteor.call('links.insert', validUrls[0], (err, res) => {})
      link = Links.find({}).fetch()[0]
    })
    describe('set visibility', function() {
      it('should hidden LinksListItem', function() {
        const shortUrl = Meteor.absoluteUrl(link._id)
        const wrapper = mount(<LinksListItem shortUrl={shortUrl} {...link} />)
        wrapper.ref('setVis').simulate('click')

        expect(wrapper.ref('setVis').text()).toBe('Unhidden')
      })
    })
    describe('copy', function() {
      it('should copy url to clipboard', function() {
        const shortUrl = Meteor.absoluteUrl(link._id)
        const wrapper = mount(<LinksListItem shortUrl={shortUrl} {...link} />)
        wrapper.ref('copy').simulate('click')
        expect(wrapper.ref('copy').text()).toBe('Copied')
      })
    })
  })
}
