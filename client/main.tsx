import { Meteor } from 'meteor/meteor'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Signup, Link, NotFound, Login } from '../imports/ui'
import { Tracker } from 'meteor/tracker'

const unauthenticatedPages: Array<string> = ['/', '/signup']
const authenticatedPages: Array<string> = ['/links']

const routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/links" component={Link} />

      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
)

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId
  const pathname = window.location.pathname
  const isUnanthenticatedPage = unauthenticatedPages.includes(pathname)
  console.log('isUnanthenticatedPage', isUnanthenticatedPage)
})

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'))
})
