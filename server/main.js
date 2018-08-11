import { Meteor } from 'meteor/meteor'
import { webApp } from 'meteor/webapp'
import '../imports/api/users'
import '../imports/api/links'
import '../imports/startup/simple-schema-configuration'

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1)
    const link = Links.findOne({ _id })
    if (link) {
      res.statusCode = 302
      res.setHeader('Location', 'http://www.google.com')
      res.end()
    } else {
      next()
    }
  })
})
