import { Meteor } from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import { Signup, Link } from '../imports/ui'

Meteor.startup(() => {
  ReactDOM.render(<Signup />, document.getElementById('app'))
})
