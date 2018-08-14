import React from 'react'
import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'

import { Links } from '../api/links'
import { LinksListItem } from '.'

class LinksList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { links: [] }
  }

  componentDidMount() {
    console.log('componentDidMount LinksList')
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links')
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch()
      this.setState({ links })
    })
  }

  componentWillUnMount() {
    console.log('componentWillUnMount LinksList')
    this.linksTracker.stop()
  }

  renderLinksListItems = () => {
    // <p> add url here </p>
    return this.state.links.map(link => {
      const shortUrl = Meteor.absoluteUrl(link._id)
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
    })
  }

  render() {
    return (
      <div>
        <p>Links List</p>
        <div>{this.renderLinksListItems()}</div>
      </div>
    )
  }
}

export default LinksList
