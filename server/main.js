import { Meteor } from 'meteor/meteor'
import { webApp } from 'meteor/webapp'
import '../imports/api/users'
import '../imports/api/links'
import '../imports/startup/simple-schema-configuration'

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    res.statusCode = 404 // status code
    res.setHeader('my-custom-header', 'Andrew was here!') // header
    res.write('<h1>This is my middleware at work!</h1>') // body
    res.end()
    next()
  })
})
