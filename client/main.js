import { Meteor } from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Signup, Link, NotFound, Login } from '../imports/ui'
import { Tracker } from 'meteor/tracker'
import history from './history'

const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/links']
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    history.replace('/links')
  }
}
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    history.replace('/')
  }
}
const routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} onEnter={onEnterPublicPage} />
      <Route
        exact
        path="/signup"
        component={Signup}
        onEnter={onEnterPublicPage}
      />
      <Route
        exact
        path="/links"
        component={Link}
        onEnter={onEnterPrivatePage}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
)

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId()
  const pathname = window.location.pathname
  const isUnanthenticatedPage = unauthenticatedPages.includes(pathname)
  const isAuthenticatedPage = authenticatedPages.includes(pathname)

  if (isUnauthenticatedPage && isAuthenticated) {
    history.push('/links')
  } else {
    history.push('/')
  }
})

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'))
})
