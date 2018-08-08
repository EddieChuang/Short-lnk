import React from 'react'
import { Links } from '../api'

class LinksList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { links: [] }
  }

  componentDidMount() {
    console.log('componentDidMount LinksList')
    this.linksTracker = Tracker.autorun(() => {
      const links = Links.find().fetch()
      this.setState({ links })
    })
  }

  componentWillUnMount() {
    console.log('componentWillUnMount LinksList')
    this.linksTracker.stop()
  }

  renderLinksListItems = () => {
    // <p> add url here </p>
    return this.state.links.map(link => <p key={link._id}>{link.url}</p>)
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
