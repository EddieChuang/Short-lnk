import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import { PrivateHeader } from './PrivateHeader'

if (Meteor.isClient) {
  describe('PrivateHeader', function() {
    it('should set button text to logout', function() {
      const wrapper = mount(<PrivateHeader title="Test title" />)
      const buttonText = wrapper.find('button').text()
      expect(buttonText).toBe('Lougout')
    })
    it('should use title prop as h1 text', function() {
      const title = 'Test title'
      const wrapper = mount(<PrivateHeader title={title} />)
      const h1Text = wrapper.find('h1').text()

      expect(h1Text).toBe(title)
    })
    it('should call the function', function() {
      const spy = expect.createSpy()
      const wrapper = mount(<PrivateHeader title={title} handleLogout={spy} />)
      wrapper.find('button').simulate('click')
      expect(spy).toHaveBeenCalled()
    })
  })
}
