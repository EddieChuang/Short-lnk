import { Meteor } from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import { Signup, Link, NotFound, Login } from '../imports/ui'

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/links" component={Link} />

    <Route path="*" component={NotFound} />
  </Router>
)

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'))
})
