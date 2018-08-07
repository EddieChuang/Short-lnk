import { Meteor } from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import { Signup, Link, NotFound, Login } from '../ui'
import history from '../history/history'

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

export const onAuthChange = isAuthenticated => {
  const pathname = window.location.pathname
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname)
  const isAuthenticatedPage = authenticatedPages.includes(pathname)

  if (isUnauthenticatedPage && isAuthenticated) {
    history.push('/links')
  } else {
    history.push('/')
  }
}
export const routes = (
  <Router history={history}>
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
  </Router>
)
