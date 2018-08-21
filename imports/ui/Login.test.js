import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import { Login } from './Login'

if (Meteor.isClient) {
  describe('Login', function() {
    it('should show error message', function() {
      const error = 'This is not working'
      const wrapper = mount(<Login loginWithPassword={() => {}} />)

      wrapper.setState({ error })
      expect(wrapper.find('p').text()).toBe(error)

      wrapper.setState({ error: '' })
      expect(wrapper.find('p').length).toBe(0)
    })
    it('should call loginWithPassword with the form data', function() {
      const email = 'chiamin@test.com'
      const password = 'chiaminchuang'
      const spy = expect.createSpy()
      const wrapper = moung(<Login loginWithPassword={spy} />)

      wrapper.ref('email').node.value = email
      wrapper.ref('password').node.value = password
      wrapper.find('form').simulate('submit')

      expect(spy.calls[0].arguments[0]).toEqual({ email })
      expect(spy.calls[0].arguments[1]).toEqual(password)
    })

    it('should call loginWithPassword callback error', function() {
      const spy = expect.createSpy()
      const wrapper = moung(<Login loginWithPassword={spy} />)

      wrapper.find('form').simulate('submit')

      spy.calls[0].arguments[2]({})
      expect(wrapper.state('error')).toNotBe('')

      spy.calls[0].arguments[2]({})
      expect(wrapper.state('error')).toBe('')
    })
  })
}
