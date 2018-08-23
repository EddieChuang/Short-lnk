import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import { Links } from '../api/links'
import { validUrls, invalidUrls } from '../fixtures/fixtures'

if (Meteor.isClient) {
  describe('AddLink', function() {
    describe('modal', function() {
      it('should open && close add link modal', function() {
        const wrapper = mount(<AddLink />)

        wrapper.ref('open').simulate('click')
        expect(wrapper.state('isOpen')).toBe(true)

        wrapper.ref('url').node.value = 'url'
        expect(wrapper.state('url')).toBe('url')

        wrapper.handleModalClose()
        expect(wrapper.state('isOpen')).toBe(false)
        expect(wrapper.state('url')).toBe('')
      })
    })
    describe('add new link', function() {
      beforeEach(() => {
        Links.remove({})
      })
      it('should add valid link', function() {
        const wrapper = mount(<AddLink />)
        wrapper.ref('url').node.value = validUrls[0]
        wrapper.ref('form').simulate('submit')
        const links = Links.find({}).fetch()

        expect(links.length).toBe(1)
      })
      it('should add invalid link', function() {
        const wrapper = mount(<AddLink />)
        wrapper.ref('url').node.value = invalidUrls[0]
        wrapper.ref('form').simulate('submit')
        const links = Links.find({}).fetch()

        expect(links.length).toBe(1)
      })
    })
  })
}
